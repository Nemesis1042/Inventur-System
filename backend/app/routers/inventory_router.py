from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.schemas.inventory_schema import InventoryCreate, InventoryOut, InventoryUpdate
from app.crud.inventory_crud import get_inventory, create_inventory, update_inventory, delete_inventory, get_inventories
from app.services.auth_service import get_current_active_user

router = APIRouter(prefix="/inventory", tags=["inventory"])

@router.get("/", response_model=List[InventoryOut])
async def read_inventory(current_user=Depends(get_current_active_user)):
    return await get_inventories()

@router.get("/{inventory_id}", response_model=InventoryOut)
async def read_inventory_item(inventory_id: int, current_user=Depends(get_current_active_user)):
    item = await get_inventory(inventory_id)
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    return item

@router.post("/", response_model=InventoryOut, status_code=status.HTTP_201_CREATED)
async def create_inventory_item(inventory: InventoryCreate, current_user=Depends(get_current_active_user)):
    return await create_inventory(inventory)

@router.put("/{inventory_id}", response_model=InventoryOut)
async def update_inventory_item(inventory_id: int, inventory: InventoryUpdate, current_user=Depends(get_current_active_user)):
    db_item = await get_inventory(inventory_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    return await update_inventory(inventory_id, inventory)

@router.delete("/{inventory_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_inventory_item(inventory_id: int, current_user=Depends(get_current_active_user)):
    db_item = await get_inventory(inventory_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    await delete_inventory(inventory_id)

