import secrets
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.auth import (
    authenticate_user,
    create_access_token,
    get_current_user,
    hash_password,
    verify_password,
)
from app.database import get_db
from app.email import EmailNotConfigured, send_verification_email
from app.models import User
from app.schemas import (
    ChangeEmailRequest,
    ChangePasswordRequest,
    ChangeUsernameRequest,
    MessageResponse,
    Token,
    UserCreate,
    UserRead,
    VerifyEmailRequest,
)

router = APIRouter(prefix="/auth", tags=["auth"])

VERIFICATION_TOKEN_TTL = timedelta(hours=24)


def _issue_verification_token(user: User, db: Session) -> str:
    token = secrets.token_urlsafe(32)
    user.verification_token = token
    user.verification_token_expires = datetime.now(timezone.utc) + VERIFICATION_TOKEN_TTL
    db.commit()
    return token


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == user_in.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    if db.query(User).filter(User.email == user_in.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = _issue_verification_token(user, db)
    try:
        send_verification_email(user.email, token)
    except (EmailNotConfigured, OSError) as exc:
        print(f"[auth] Failed to send verification email to {user.email}: {exc}")

    return user


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": str(user.id)})
    return Token(access_token=access_token)


@router.get("/me", response_model=UserRead)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/verify-email", response_model=UserRead)
def verify_email(body: VerifyEmailRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.verification_token == body.token).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid or already-used verification link")

    expires = user.verification_token_expires
    if expires is not None and expires.tzinfo is None:
        expires = expires.replace(tzinfo=timezone.utc)
    if expires is None or expires < datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Verification link has expired")

    user.is_verified = True
    user.verification_token = None
    user.verification_token_expires = None
    db.commit()
    db.refresh(user)
    return user


@router.post("/resend-verification", response_model=MessageResponse)
def resend_verification(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    if current_user.is_verified:
        raise HTTPException(status_code=400, detail="Email is already verified")

    token = _issue_verification_token(current_user, db)
    try:
        send_verification_email(current_user.email, token)
    except EmailNotConfigured as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    except OSError as exc:
        raise HTTPException(status_code=502, detail=f"Failed to send email: {exc}")

    return MessageResponse(message="Verification email sent")


@router.post("/complete-onboarding", response_model=UserRead)
def complete_onboarding(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    current_user.has_onboarded = True
    db.commit()
    db.refresh(current_user)
    return current_user


def _check_current_password(user: User, password: str) -> None:
    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")


@router.post("/change-username", response_model=UserRead)
def change_username(
    body: ChangeUsernameRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    _check_current_password(current_user, body.current_password)

    if body.new_username != current_user.username and db.query(User).filter(
        User.username == body.new_username
    ).first():
        raise HTTPException(status_code=400, detail="Username already taken")

    current_user.username = body.new_username
    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/change-email", response_model=UserRead)
def change_email(
    body: ChangeEmailRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    _check_current_password(current_user, body.current_password)

    if body.new_email != current_user.email and db.query(User).filter(
        User.email == body.new_email
    ).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    current_user.email = body.new_email
    current_user.is_verified = False
    db.commit()

    token = _issue_verification_token(current_user, db)
    try:
        send_verification_email(current_user.email, token)
    except (EmailNotConfigured, OSError) as exc:
        print(f"[auth] Failed to send verification email to {current_user.email}: {exc}")

    db.refresh(current_user)
    return current_user


@router.post("/change-password", response_model=MessageResponse)
def change_password(
    body: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    _check_current_password(current_user, body.current_password)

    current_user.hashed_password = hash_password(body.new_password)
    db.commit()
    return MessageResponse(message="Password updated")
