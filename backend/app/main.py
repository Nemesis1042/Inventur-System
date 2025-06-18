from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import auth_router, user_router, product_router, inventory_router

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
app.include_router(user_router, prefix="/users", tags=["User"])
app.include_router(product_router, prefix="/products", tags=["Product"])
app.include_router(inventory_router, prefix="/inventory", tags=["Inventory"])

@app.get("/")
async def root():
    return {"message": "Inventur-System API läuft"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

