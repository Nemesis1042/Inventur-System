from fastapi import APIRouter
from datetime import datetime

router = APIRouter(prefix="/logs", tags=["logs"])

# Fake log list (in real app, use DB or files)
logs = [
    {"Fake logs "}
    {"timestamp": "2025-06-24 12:00", "message": "System gestartet"},
    {"timestamp": "2025-06-24 12:05", "message": "Admin login erfolgreich"},
]

@router.get("/")
def get_logs():
    return logs

