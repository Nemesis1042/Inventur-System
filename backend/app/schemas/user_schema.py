from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from enum import Enum


class UserRole(str, Enum):
    ADMIN = "admin"
    MITARBEITER = "mitarbeiter"
    IT = "it"


class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: Optional[UserRole] = UserRole.MITARBEITER


class UserCreate(UserBase):
    password: constr(min_length=8)


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[constr(min_length=8)] = None
    role: Optional[UserRole] = None


class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True

