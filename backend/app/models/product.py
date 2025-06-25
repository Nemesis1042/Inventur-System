from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    barcode = Column(String(255), unique=True, index=True, nullable=True)

    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    subcategory_id = Column(Integer, ForeignKey("subcategories.id"), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Beziehungen
    category = relationship("Category", back_populates="products")
    subcategory = relationship("Subcategory", back_populates="products")
    inventory_items = relationship("Inventory", back_populates="product")

    @property
    def quantity(self):
        return sum(item.quantity for item in self.inventory_items) if self.inventory_items else 0

    @property
    def unit_price(self):
        return self.price

    @property
    def total_value(self):
        return self.quantity * self.unit_price

