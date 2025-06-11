from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.schemas.user_schema import UserCreate, UserOut, UserUpdate
from app.crud.user_crud import get_user, create_user, update_user, delete_user, get_users
from app.services.auth_service import get_current_active_user, get_current_active_admin

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[UserOut])
async def read_users(current_user=Depends(get_current_active_admin)):
    return await get_users()

@router.get("/{user_id}", response_model=UserOut)
async def read_user(user_id: int, current_user=Depends(get_current_active_user)):
    user = await get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def create_new_user(user: UserCreate, current_user=Depends(get_current_active_admin)):
    return await create_user(user)

@router.put("/{user_id}", response_model=UserOut)
async def update_existing_user(user_id: int, user: UserUpdate, current_user=Depends(get_current_active_admin)):
    db_user = await get_user(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return await update_user(user_id, user)

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_user(user_id: int, current_user=Depends(get_current_active_admin)):
    db_user = await get_user(user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    await delete_user(user_id)

