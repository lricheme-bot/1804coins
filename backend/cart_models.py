from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class CartItem(BaseModel):
    product_id: str
    name: str
    image: str
    price: float
    quantity: int = 1

class Cart(BaseModel):
    user_id: str
    items: List[CartItem] = []
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AddToCartRequest(BaseModel):
    product_id: str
    quantity: int = 1

class UpdateCartRequest(BaseModel):
    product_id: str
    quantity: int

class CartResponse(BaseModel):
    items: List[CartItem]
    total: float
    item_count: int

class OrderItem(BaseModel):
    product_id: str
    name: str
    image: str
    price: float
    quantity: int

class Order(BaseModel):
    id: str = Field(alias="_id")
    user_id: str
    items: List[OrderItem]
    total: float
    status: str = "pending"  # pending, completed, cancelled
    created_at: datetime
    
    class Config:
        populate_by_name = True

class CreateOrderResponse(BaseModel):
    order_id: str
    total: float
    message: str
