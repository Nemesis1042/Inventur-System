from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.schemas.product_schema import ProductCreate, ProductOut, ProductUpdate
from app.crud.product_crud import get_product, create_product, update_product, delete_product, get_products
from app.services.auth_service import get_current_active_user

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[ProductOut])
async def read_products(current_user=Depends(get_current_active_user)):
    return await get_products()

@router.get("/{product_id}", response_model=ProductOut)
async def read_product(product_id: int, current_user=Depends(get_current_active_user)):
    product = await get_product(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
async def create_new_product(product: ProductCreate, current_user=Depends(get_current_active_user)):
    return await create_product(product)

@router.put("/{product_id}", response_model=ProductOut)
async def update_existing_product(product_id: int, product: ProductUpdate, current_user=Depends(get_current_active_user)):
    db_product = await get_product(product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return await update_product(product_id, product)

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_product(product_id: int, current_user=Depends(get_current_active_user)):
    db_product = await get_product(product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    await delete_product(product_id)

