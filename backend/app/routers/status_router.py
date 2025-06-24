from fastapi import APIRouter

router = APIRouter(prefix="/status", tags=["status"])

@router.get("/")
def get_status():
    return {"status": "OK", "uptime": "12h 34m", "version": "1.0.0"}

