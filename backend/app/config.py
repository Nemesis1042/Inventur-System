import os
from dotenv import load_dotenv

load_dotenv()  # .env-Datei laden

class Settings:
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "mysql+pymysql://user:password@localhost:3306/inventur_db"
    )
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecretkey1234567890")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440))  # 24h Token
    ALGORITHM: str = "HS256"
print("Loaded DATABASE_URL:", os.getenv("DATABASE_URL"))

settings = Settings()

