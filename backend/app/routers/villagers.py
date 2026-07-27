from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models import TrackedVillager, User
from app.schemas import ReorderRequest, VillagerCreate, VillagerRead, VillagerUpdate

router = APIRouter(prefix="/villagers", tags=["villagers"])


def _get_owned_villager(villager_id: int, user: User, db: Session) -> TrackedVillager:
    villager = (
        db.query(TrackedVillager)
        .filter(TrackedVillager.id == villager_id, TrackedVillager.user_id == user.id)
        .first()
    )
    if not villager:
        raise HTTPException(status_code=404, detail="Villager not found")
    return villager


@router.get("", response_model=list[VillagerRead])
def list_villagers(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    return (
        db.query(TrackedVillager)
        .filter(TrackedVillager.user_id == current_user.id)
        .order_by(TrackedVillager.position)
        .all()
    )


@router.post("", response_model=VillagerRead, status_code=status.HTTP_201_CREATED)
def add_villager(
    body: VillagerCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    max_position = (
        db.query(TrackedVillager)
        .filter(TrackedVillager.user_id == current_user.id)
        .count()
    )
    villager = TrackedVillager(
        user_id=current_user.id,
        name=body.name,
        realm=body.realm,
        emoji=body.emoji or "⭐",
        portrait=body.portrait,
        position=max_position,
    )
    db.add(villager)
    db.commit()
    db.refresh(villager)
    return villager


@router.patch("/{villager_id}", response_model=VillagerRead)
def update_villager(
    villager_id: int,
    body: VillagerUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    villager = _get_owned_villager(villager_id, current_user, db)
    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(villager, field, value)
    db.commit()
    db.refresh(villager)
    return villager


@router.delete("/{villager_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_villager(
    villager_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    villager = _get_owned_villager(villager_id, current_user, db)
    db.delete(villager)
    db.commit()


@router.post("/{villager_id}/reorder", response_model=list[VillagerRead])
def reorder_villager(
    villager_id: int,
    body: ReorderRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    villagers = (
        db.query(TrackedVillager)
        .filter(TrackedVillager.user_id == current_user.id)
        .order_by(TrackedVillager.position)
        .all()
    )
    idx = next((i for i, v in enumerate(villagers) if v.id == villager_id), None)
    if idx is None:
        raise HTTPException(status_code=404, detail="Villager not found")

    swap_with = idx - 1 if body.direction == "up" else idx + 1
    if 0 <= swap_with < len(villagers):
        villagers[idx].position, villagers[swap_with].position = (
            villagers[swap_with].position,
            villagers[idx].position,
        )
        db.commit()

    return (
        db.query(TrackedVillager)
        .filter(TrackedVillager.user_id == current_user.id)
        .order_by(TrackedVillager.position)
        .all()
    )


@router.post("/new-day", response_model=list[VillagerRead])
def new_day(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    villagers = (
        db.query(TrackedVillager).filter(TrackedVillager.user_id == current_user.id).all()
    )
    for v in villagers:
        v.gift_1 = ""
        v.gift_2 = ""
        v.gift_3 = ""
        v.gift_1_given = False
        v.gift_2_given = False
        v.gift_3_given = False
        v.scramblecoin = False
        v.discussion = False
        # hangout_role is a standing assignment, not daily state — left as-is.
    db.commit()
    return (
        db.query(TrackedVillager)
        .filter(TrackedVillager.user_id == current_user.id)
        .order_by(TrackedVillager.position)
        .all()
    )


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
def clear_villagers(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    db.query(TrackedVillager).filter(TrackedVillager.user_id == current_user.id).delete()
    db.commit()
