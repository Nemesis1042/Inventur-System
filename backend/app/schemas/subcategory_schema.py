from pydantic import BaseModel

class SubcategoryBase(BaseModel):
    category_id: int
    name: str

class SubcategoryCreate(SubcategoryBase):
    pass

class SubcategoryOut(SubcategoryBase):
    id: int

    class Config:
        from_attributes = True
