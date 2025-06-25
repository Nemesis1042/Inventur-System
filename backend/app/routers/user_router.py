from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserCreate, UserOut, UserUpdate
from app.crud.user_crud import get_user, create_user, update_user, delete_user, get_users
from app.services.auth_service import get_current_active_user, get_current_active_admin
from app.database import get_db

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[UserOut])
async def read_users(
    current_user=Depends(get_current_active_admin),
    db: Session = Depends(get_db),
):
    return get_users(db)

@router.put("/{user_id}", response_model=UserOut)
async def update_existing_user(
    user_id: int,
    user: UserUpdate,
    current_user=Depends(get_current_active_admin),  # Nur Admins dürfen bearbeiten
    db: Session = Depends(get_db),
):
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return update_user(db, user_id, user)


@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def create_new_user(
    user: UserCreate,
    current_user=Depends(get_current_active_admin),
    db: Session = Depends(get_db),
):
    return create_user(db, user)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_user(
    user_id: int,
    current_user=Depends(get_current_active_admin),
    db: Session = Depends(get_db),
):
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    delete_user(db, user_id)
    return None

