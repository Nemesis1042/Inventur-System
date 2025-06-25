# backend/app/security.py

from passlib.hash import bcrypt

def get_password_hash(password: str) -> str:
    return bcrypt.hash(password)

def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.verify(password, hashed_password)

