from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    verification_token: Mapped[str | None] = mapped_column(String(255), nullable=True)
    verification_token_expires: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    has_onboarded: Mapped[bool] = mapped_column(Boolean, default=False)


class TrackedVillager(Base):
    __tablename__ = "tracked_villagers"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    name: Mapped[str] = mapped_column(String(100))
    realm: Mapped[str] = mapped_column(String(150), default="")
    emoji: Mapped[str] = mapped_column(String(10), default="⭐")
    portrait: Mapped[str | None] = mapped_column(String(255), nullable=True)
    level: Mapped[int] = mapped_column(Integer, default=1)
    gift_1: Mapped[str] = mapped_column(String(200), default="")
    gift_2: Mapped[str] = mapped_column(String(200), default="")
    gift_3: Mapped[str] = mapped_column(String(200), default="")
    # Per-gift "already handed over" ticks, for giving the three daily
    # favourites one at a time. Daily, so cleared by /new-day.
    gift_1_given: Mapped[bool] = mapped_column(Boolean, default=False)
    gift_2_given: Mapped[bool] = mapped_column(Boolean, default=False)
    gift_3_given: Mapped[bool] = mapped_column(Boolean, default=False)
    # In-game hangout role granting a gathering bonus (Mining, Fishing, …).
    # A standing assignment rather than daily state, so /new-day leaves it.
    hangout_role: Mapped[str] = mapped_column(String(30), default="")
    scramblecoin: Mapped[bool] = mapped_column(Boolean, default=False)
    discussion: Mapped[bool] = mapped_column(Boolean, default=False)
    position: Mapped[int] = mapped_column(Integer, default=0)
    notes: Mapped[str] = mapped_column(Text, default="")


class TrackedTask(Base):
    __tablename__ = "tracked_tasks"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    text: Mapped[str] = mapped_column(String(300))
    category: Mapped[str] = mapped_column(String(20), default="Daily")
    done: Mapped[bool] = mapped_column(Boolean, default=False)


class RecipeProgress(Base):
    """Per-user 'discovered' flag for a recipe in the static catalog
    (frontend/src/data/recipes.json). The catalog itself isn't stored here —
    only a row per recipe a user has actually marked discovered, keyed by name."""

    __tablename__ = "recipe_progress"
    __table_args__ = (UniqueConstraint("user_id", "name", name="uq_recipe_progress_user_name"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    name: Mapped[str] = mapped_column(String(150), index=True)
    discovered: Mapped[bool] = mapped_column(Boolean, default=False)
