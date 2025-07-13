from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from app.database import engine
from app.routers import auth_router, user_router, product_router, inventory_router
import os

app = FastAPI(
    title="Inventur-System API",
    description="Backend API für das Inventur-System",
    version="1.0.0",
)

# CORS-Settings für lokale Entwicklung mit React-Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React Dev Server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router einbinden
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(user_router)
app.include_router(product_router, prefix="/products", tags=["Product"])
app.include_router(inventory_router, prefix="/inventory", tags=["Inventory"])
from app.database import engine, Base
from app.models import inventory, product, user  # wichtig: alle Modelle importieren

Base.metadata.create_all(bind=engine)


BASE_DIR = os.path.dirname(__file__)
static_path = os.path.join(BASE_DIR, "static")

# Mount static files
app.mount("/static", StaticFiles(directory=static_path), name="static")

# Serve favicon explicitly
@app.get("/favicon.ico")
async def favicon():
    return FileResponse(os.path.join(static_path, "favicon.ico"))

@app.get("/")
def main():
    return {"message": "Server is running"}

@app.get("/health", tags=["System"])
async def health():
    return {
        "status": "ok",
        "version": "1.0.0",
        "message": "Inventur-System API erreichbar"
    }
@app.get("/ping-db")
def ping_db():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"status": "✅ Verbindung zur Datenbank erfolgreich"}
    except Exception as e:
        return {"status": "❌ Fehler bei der Verbindung", "error": str(e)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

