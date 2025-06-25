from pydantic import BaseModel, Field
from typing import Optional

class ProductBase(BaseModel):
    name: str
    category_id: int
    subcategory_id: int
    quantity: int = Field(ge=0)
    unit_price: float = Field(ge=0)
    description: Optional[str] = None
    barcode: Optional[str] = None

class ProductCreate(ProductBase): 
    pass

class ProductUpdate(BaseModel):
    quantity: Optional[int] = Field(None, ge=0)
    unit_price: Optional[float] = Field(None, ge=0)
    description: Optional[str] = None
    barcode: Optional[str] = None
    category_id: Optional[int] = None
    subcategory_id: Optional[int] = None

class ProductOut(ProductBase):
    id: int
    total_value: float

    class Config:
        from_attributes = True

