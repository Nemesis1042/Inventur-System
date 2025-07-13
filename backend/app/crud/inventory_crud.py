from sqlalchemy.orm import Session
from app.models.inventory import Inventory
from app.schemas.inventory_schema import InventoryCreate, InventoryUpdate

def get_inventory(db: Session, inventory_id: int):
    return db.query(Inventory).filter(Inventory.id == inventory_id).first()

def get_inventories(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Inventory).offset(skip).limit(limit).all()

def create_inventory(db: Session, inventory: InventoryCreate):
    db_inventory = Inventory(**inventory.dict())
    db.add(db_inventory)
    db.commit()
    db.refresh(db_inventory)
    return db_inventory

def update_inventory(db: Session, inventory_id: int, inventory_update: InventoryUpdate):
    db_inventory = db.query(Inventory).filter(Inventory.id == inventory_id).first()
    if not db_inventory:
        return None

    for field, value in inventory_update.dict(exclude_unset=True).items():
        setattr(db_inventory, field, value)

    db.commit()
    db.refresh(db_inventory)
    return db_inventory

def delete_inventory(db: Session, inventory_id: int):
    db_inventory = db.query(Inventory).filter(Inventory.id == inventory_id).first()
    if not db_inventory:
        return False
    db.delete(db_inventory)
    db.commit()
    return True

