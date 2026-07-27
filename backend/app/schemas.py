from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    username: str
    email: EmailStr
    created_at: datetime
    is_verified: bool
    has_onboarded: bool


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class VerifyEmailRequest(BaseModel):
    token: str


class MessageResponse(BaseModel):
    message: str


class ChangeUsernameRequest(BaseModel):
    new_username: str
    current_password: str


class ChangeEmailRequest(BaseModel):
    new_email: EmailStr
    current_password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


class VillagerCreate(BaseModel):
    name: str
    realm: str = ""
    emoji: str = "⭐"
    portrait: str | None = None


class VillagerUpdate(BaseModel):
    level: int | None = None
    gift_1: str | None = None
    gift_2: str | None = None
    gift_3: str | None = None
    gift_1_given: bool | None = None
    gift_2_given: bool | None = None
    gift_3_given: bool | None = None
    hangout_role: str | None = None
    scramblecoin: bool | None = None
    discussion: bool | None = None
    notes: str | None = None


class VillagerRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    realm: str
    emoji: str
    portrait: str | None
    level: int
    gift_1: str
    gift_2: str
    gift_3: str
    gift_1_given: bool
    gift_2_given: bool
    gift_3_given: bool
    hangout_role: str
    scramblecoin: bool
    discussion: bool
    position: int
    notes: str


class ReorderRequest(BaseModel):
    direction: str


class TaskCreate(BaseModel):
    text: str
    category: str = "Daily"


class TaskUpdate(BaseModel):
    text: str | None = None
    category: str | None = None
    done: bool | None = None


class TaskRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    text: str
    category: str
    done: bool


class RecipeProgressUpdate(BaseModel):
    name: str
    discovered: bool


class RecipeProgressRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    name: str
    discovered: bool
