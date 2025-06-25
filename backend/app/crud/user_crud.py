from sqlalchemy.orm import Session
from app.models.user import User, UserRole
from app.schemas.user_schema import UserCreate, UserUpdate
from passlib.context import CryptContext
from app.security import get_password_hash  # Passwort-Hash-Funktion

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user_by_username(db: Session, username: str) -> User | None:
    return db.query(User).filter(User.username == username).first()


def get_user(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


#def get_user_by_email(db: Session, email: str) -> User | None:
#    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> list[User]:
    return db.query(User).offset(skip).limit(limit).all()


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_user(db: Session, user: UserCreate) -> User:
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        #email=user.email,
        hashed_password=hashed_password,
        #full_name=user.full_name,
        role=UserRole[user.role.upper()] if user.role else UserRole.MITARBEITER,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: int, user_update: UserUpdate):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None

    if user_update.username is not None:
        user.username = user_update.username

    if user_update.role is not None:
        user.role = user_update.role.value  # Falls Enum als String gespeichert wird

    if user_update.password:
        user.hashed_password = get_password_hash(user_update.password)

    db.commit()
    db.refresh(user)
    return user



def delete_user(db: Session, user_id: int) -> bool:
    db_user = get_user(db, user_id)
    if not db_user:
        return False
    db.delete(db_user)
    db.commit()
    return True

