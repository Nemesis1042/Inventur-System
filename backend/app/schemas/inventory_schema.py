from pydantic import BaseModel, conint
from typing import Optional


class InventoryBase(BaseModel):
    product_id: int
    quantity: conint(ge=0)
    location: Optional[str] = None


class InventoryCreate(InventoryBase):
    pass


class InventoryUpdate(BaseModel):
    quantity: Optional[conint(ge=0)] = None
    location: Optional[str] = None


class InventoryOut(InventoryBase):
    id: int

    class Config:
        orm_mode = True

