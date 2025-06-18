from sqlalchemy import Column, Integer, String, Float, DateTime
from ..database import Base
from datetime import datetime
from sqlalchemy.orm import relationship

# innerhalb Product-Klasse:
inventory_entries = relationship("Inventory", back_populates="product")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(1024), nullable=True)
    price = Column(Float, nullable=False)
    barcode = Column(String(128), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
