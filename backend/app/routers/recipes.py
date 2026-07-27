from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models import RecipeProgress, User
from app.schemas import RecipeProgressRead, RecipeProgressUpdate

router = APIRouter(prefix="/recipes", tags=["recipes"])


@router.get("/progress", response_model=list[RecipeProgressRead])
def list_progress(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    return (
        db.query(RecipeProgress)
        .filter(RecipeProgress.user_id == current_user.id)
        .all()
    )


@router.post("/progress", response_model=RecipeProgressRead)
def upsert_progress(
    body: RecipeProgressUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    progress = (
        db.query(RecipeProgress)
        .filter(RecipeProgress.user_id == current_user.id, RecipeProgress.name == body.name)
        .first()
    )
    if not progress:
        progress = RecipeProgress(user_id=current_user.id, name=body.name)
        db.add(progress)

    progress.discovered = body.discovered
    db.commit()
    db.refresh(progress)
    return progress
