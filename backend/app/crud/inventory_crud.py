from sqlalchemy.orm import Session
from app.models.inventory import Inventory
from app.schemas.inventory_schema import InventoryCreate, InventoryUpdate


def get_inventory(db: Session, inventory_id: int):
    return db.query(Inventory).filter(Inventory.id == inventory_id).first()


def get_inventory_by_product(db: Session, product_id: int):
    return db.query(Inventory).filter(Inventory.product_id == product_id).all()


def get_all_inventory(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Inventory).offset(skip).limit(limit).all()


def create_inventory(db: Session, inventory: InventoryCreate):
    db_inventory = Inventory(
        product_id=inventory.product_id,
        quantity=inventory.quantity,
        location=inventory.location,
    )
    db.add(db_inventory)
    db.commit()
    db.refresh(db_inventory)
    return db_inventory


def update_inventory(db: Session, inventory_id: int, inventory_update: InventoryUpdate):
    db_inventory = get_inventory(db, inventory_id)
    if not db_inventory:
        return None
    if inventory_update.quantity is not None:
        db_inventory.quantity = inventory_update.quantity
    if inventory_update.location:
        db_inventory.location = inventory_update.location
    db.commit()
    db.refresh(db_inventory)
    return db_inventory


def delete_inventory(db: Session, inventory_id: int):
    db_inventory = get_inventory(db, inventory_id)
    if not db_inventory:
        return None
    db.delete(db_inventory)
    db.commit()
    return True

