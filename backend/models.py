from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime

# User Models
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: str

class UserInDB(BaseModel):
    id: str = Field(alias="_id")
    username: str
    email: str
    password: str
    created_at: datetime

    class Config:
        populate_by_name = True

# Product Models
class Product(BaseModel):
    id: str = Field(alias="_id")
    name: str
    description: str
    price: float
    image: str
    status: str
    category: str
    featured: bool
    year: str
    material: str
    weight: str
    diameter: str
    mintage: str
    sale_price: Optional[float] = None
    sale_label: Optional[str] = None

    class Config:
        populate_by_name = True
        allow_population_by_field_name = True

# Comment Models
class CommentCreate(BaseModel):
    comment: str

class Comment(BaseModel):
    id: str = Field(alias="_id")
    product_id: str
    user_id: str
    username: str
    comment: str
    timestamp: datetime
    likes: int = 0
    liked_by: List[str] = []

    class Config:
        populate_by_name = True

class CommentResponse(BaseModel):
    id: str
    product_id: str
    user_id: str
    username: str
    comment: str
    timestamp: str
    likes: int
