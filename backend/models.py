from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Product Models
class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    subtitle: str
    price: float
    status: str  # in-stock, coming-soon, limited, pre-order
    image: str
    description: str
    category: str
    inStock: bool
    featured: bool
    stockQuantity: int = 10
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(BaseModel):
    name: str
    subtitle: str
    price: float
    status: str
    image: str
    description: str
    category: str
    inStock: bool
    featured: bool
    stockQuantity: int = 10

# Cart Models
class CartItem(BaseModel):
    productId: str
    quantity: int
    priceAtAdd: float

class Cart(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    sessionId: str
    items: List[CartItem] = []
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class AddToCartRequest(BaseModel):
    sessionId: str
    productId: str
    quantity: int = 1

class UpdateCartRequest(BaseModel):
    sessionId: str
    productId: str
    quantity: int

# Contact Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    firstName: str
    lastName: str
    email: EmailStr
    message: str
    status: str = "new"  # new, read, replied
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ContactCreate(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    message: str

# Order Models
class OrderItem(BaseModel):
    productId: str
    productName: str
    quantity: int
    price: float

class ShippingAddress(BaseModel):
    street: str
    city: str
    state: str
    zipCode: str
    country: str

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    orderNumber: str = Field(default_factory=lambda: f"ORD-{uuid.uuid4().hex[:8].upper()}")
    sessionId: str
    items: List[OrderItem]
    subtotal: float
    shipping: float
    total: float
    status: str = "pending"  # pending, processing, shipped, delivered
    shippingAddress: Optional[ShippingAddress] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class OrderCreate(BaseModel):
    sessionId: str
    items: List[OrderItem]
    subtotal: float
    shipping: float
    total: float
    shippingAddress: ShippingAddress
