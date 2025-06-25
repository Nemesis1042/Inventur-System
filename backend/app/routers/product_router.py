from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.schemas.product_schema import ProductCreate, ProductOut, ProductUpdate
from app.crud.product_crud import get_product, create_product, update_product, delete_product, get_products
from app.services.auth_service import get_current_active_user
from app.database import get_db

router = APIRouter(tags=["products"])  # kein prefix

@router.get("/", response_model=List[ProductOut])
def list_products(db: Session = Depends(get_db), current_user=Depends(get_current_active_user)):
    return get_products(db)

@router.get("/{product_id}", response_model=ProductOut)
def read_product(product_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_active_user)):
    product = get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_new_product(product: ProductCreate, db: Session = Depends(get_db), current_user=Depends(get_current_active_user)):
    return create_product(db, product)

@router.put("/{product_id}", response_model=ProductOut)
def update_existing_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_active_user)):
    db_product = get_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return update_product(db, product_id, product)

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_product(product_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_active_user)):
    db_product = get_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    delete_product(db, product_id)

