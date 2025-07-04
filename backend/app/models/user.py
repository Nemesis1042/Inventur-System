from sqlalchemy import Column, Integer, String, Enum
from sqlalchemy.orm import relationship
from ..database import Base
from pydantic import BaseModel
import enum


class UserRole(enum.Enum):
    ADMIN = "admin"
    MITARBEITER = "mitarbeiter"
    IT = "it"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String(255), nullable=False)
    #full_name = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.MITARBEITER, nullable=False)

    # Beispiel: relationship zu Log- oder Inventory-Einträgen, wenn du willst
    # logs = relationship("LogEntry", back_populates="user")
class LoginRequest(BaseModel):
    username: str
    password: str

