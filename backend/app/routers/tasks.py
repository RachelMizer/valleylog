from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.database import get_db
from app.models import TrackedTask, User
from app.schemas import TaskCreate, TaskRead, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=list[TaskRead])
def list_tasks(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    return (
        db.query(TrackedTask)
        .filter(TrackedTask.user_id == current_user.id)
        .order_by(TrackedTask.id)
        .all()
    )


@router.post("", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def add_task(
    body: TaskCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = TrackedTask(user_id=current_user.id, text=body.text, category=body.category)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@router.patch("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: int,
    body: TaskUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = (
        db.query(TrackedTask)
        .filter(TrackedTask.id == task_id, TrackedTask.user_id == current_user.id)
        .first()
    )
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    for field, value in body.model_dump(exclude_unset=True).items():
        setattr(task, field, value)
    db.commit()
    db.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    task = (
        db.query(TrackedTask)
        .filter(TrackedTask.id == task_id, TrackedTask.user_id == current_user.id)
        .first()
    )
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
