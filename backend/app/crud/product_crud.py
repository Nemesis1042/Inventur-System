from sqlalchemy.orm import Session, joinedload
from app.models.product import Product
from app.models.category import Category
from app.models.subcategory import Subcategory
from app.schemas.product_schema import ProductCreate, ProductUpdate

def get_products(db: Session, skip: int = 0, limit: int = 100):
    # Produkte mit Kategorien/Subkategorien laden (eager loading)
    return (
        db.query(Product)
        .options(joinedload(Product.category), joinedload(Product.subcategory))
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_product(db: Session, product_id: int):
    return (
        db.query(Product)
        .options(joinedload(Product.category), joinedload(Product.subcategory))
        .filter(Product.id == product_id)
        .first()
    )

def create_product(db: Session, product: ProductCreate):
    db_product = Product(
        name=product.name,
        price=product.unit_price,
        description=product.description,
        barcode=product.barcode,
        category_id=product.category_id,
        subcategory_id=product.subcategory_id,
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def update_product(db: Session, product_id: int, product_update: ProductUpdate):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        return None

    # Update Felder, falls gesetzt
    for field, value in product_update.dict(exclude_unset=True).items():
        setattr(db_product, field, value)

    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: int):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        return False
    db.delete(db_product)
    db.commit()
    return True

