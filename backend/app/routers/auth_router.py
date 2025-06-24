from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, constr
from sqlalchemy.orm import Session
from ..services.auth_service import authenticate_user, create_access_token, create_user
from ..database import get_db

router = APIRouter(tags=["auth"])

class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    username: constr(min_length=3)
    password: constr(min_length=3) # change pls
    role: str | None = "MITARBEITER"

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_user(db, data.username, data.password)  # kein await, db rein
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    user = create_user(db, data.username, data.password, data.role)
    if not user:
        raise HTTPException(status_code=400, detail="User already exists")
    return {"msg": "User created successfully", "username": user.username}
