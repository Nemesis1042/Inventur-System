from pydantic import BaseModel,  constr
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    MITARBEITER = "mitarbeiter"
    IT = "it"

class UserBase(BaseModel):
    username: str
    role: Optional[UserRole] = UserRole.MITARBEITER


class UserCreate(UserBase):
    password: constr(min_length=8)


class UserUpdate(BaseModel):
    username: Optional[constr(min_length=3)] = None
    password: Optional[constr(min_length=8)] = None
    role: Optional[UserRole] = None


class UserOut(BaseModel):
    id: int
    username: str
    role: str

    class Config:
         from_attributes = True
