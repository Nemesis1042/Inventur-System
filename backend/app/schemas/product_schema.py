from pydantic import BaseModel, constr, condecimal
from typing import Optional


class ProductBase(BaseModel):
    name: constr(min_length=1, max_length=255)
    description: Optional[str] = None
    price: Optional[condecimal(max_digits=10, decimal_places=2)] = None
    barcode: Optional[constr(max_length=100)] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[constr(min_length=1, max_length=255)] = None
    description: Optional[str] = None
    price: Optional[condecimal(max_digits=10, decimal_places=2)] = None
    barcode: Optional[constr(max_length=100)] = None


class ProductOut(ProductBase):
    id: int

    class Config:
        orm_mode = True

