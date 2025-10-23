from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from typing import List
import os
import logging
from pathlib import Path
from dotenv import load_dotenv

from models import (
    UserCreate, UserLogin, UserResponse, 
    Product, CommentCreate, Comment, CommentResponse
)
from auth import (
    get_password_hash, verify_password, create_access_token, get_current_user
)
from seed_data import products_data
from admin_routes import admin_router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============== Authentication Endpoints ==============

@api_router.post("/auth/register", response_model=dict)
async def register(user_data: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"$or": [{"email": user_data.email}, {"username": user_data.username}]})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username or email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    user_dict = {
        "username": user_data.username,
        "email": user_data.email,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }
    
    result = await db.users.insert_one(user_dict)
    user_id = str(result.inserted_id)
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user_id, "username": user_data.username, "email": user_data.email}
    )
    
    return {
        "token": access_token,
        "user": {
            "id": user_id,
            "username": user_data.username,
            "email": user_data.email
        }
    }

@api_router.post("/auth/login", response_model=dict)
async def login(user_data: UserLogin):
    # Find user by email
    user = await db.users.find_one({"email": user_data.email})
    if not user or not verify_password(user_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    user_id = str(user["_id"])
    
    # Create access token
    access_token = create_access_token(
        data={"sub": user_id, "username": user["username"], "email": user["email"]}
    )
    
    return {
        "token": access_token,
        "user": {
            "id": user_id,
            "username": user["username"],
            "email": user["email"]
        }
    }

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"_id": current_user["user_id"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(
        id=str(user["_id"]),
        username=user["username"],
        email=user["email"]
    )

# ============== Product Endpoints ==============

@api_router.get("/products", response_model=List[Product])
async def get_products():
    products = await db.products.find().to_list(100)
    return [Product(**{**p, "_id": str(p["_id"])}) for p in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"_id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return Product(**{**product, "_id": str(product["_id"])})

# ============== Comment Endpoints ==============

@api_router.get("/products/{product_id}/comments", response_model=List[CommentResponse])
async def get_comments(product_id: str):
    comments = await db.comments.find({"product_id": product_id}).sort("timestamp", -1).to_list(100)
    return [
        CommentResponse(
            id=str(c["_id"]),
            product_id=c["product_id"],
            user_id=c["user_id"],
            username=c["username"],
            comment=c["comment"],
            timestamp=c["timestamp"].isoformat(),
            likes=c.get("likes", 0)
        )
        for c in comments
    ]

@api_router.post("/products/{product_id}/comments", response_model=CommentResponse)
async def create_comment(
    product_id: str,
    comment_data: CommentCreate,
    current_user: dict = Depends(get_current_user)
):
    # Check if product exists
    product = await db.products.find_one({"_id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Create comment
    comment_dict = {
        "product_id": product_id,
        "user_id": current_user["user_id"],
        "username": current_user["username"],
        "comment": comment_data.comment,
        "timestamp": datetime.utcnow(),
        "likes": 0,
        "liked_by": []
    }
    
    result = await db.comments.insert_one(comment_dict)
    comment_id = str(result.inserted_id)
    
    return CommentResponse(
        id=comment_id,
        product_id=product_id,
        user_id=current_user["user_id"],
        username=current_user["username"],
        comment=comment_data.comment,
        timestamp=comment_dict["timestamp"].isoformat(),
        likes=0
    )

@api_router.post("/comments/{comment_id}/like")
async def like_comment(
    comment_id: str,
    current_user: dict = Depends(get_current_user)
):
    from bson import ObjectId
    
    comment = await db.comments.find_one({"_id": ObjectId(comment_id)})
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    user_id = current_user["user_id"]
    liked_by = comment.get("liked_by", [])
    
    # Toggle like
    if user_id in liked_by:
        # Unlike
        await db.comments.update_one(
            {"_id": ObjectId(comment_id)},
            {
                "$pull": {"liked_by": user_id},
                "$inc": {"likes": -1}
            }
        )
        new_likes = comment.get("likes", 0) - 1
    else:
        # Like
        await db.comments.update_one(
            {"_id": ObjectId(comment_id)},
            {
                "$addToSet": {"liked_by": user_id},
                "$inc": {"likes": 1}
            }
        )
        new_likes = comment.get("likes", 0) + 1
    
    return {"likes": max(0, new_likes)}

# ============== Seed Database ==============

@api_router.post("/seed-products")
async def seed_products():
    """Seed the database with initial products"""
    # Clear existing products
    await db.products.delete_many({})
    
    # Insert products
    await db.products.insert_many(products_data)
    
    return {"message": f"Seeded {len(products_data)} products successfully"}

# Include the routers in the main app
app.include_router(api_router)
app.include_router(admin_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.users.create_index("username", unique=True)
    await db.comments.create_index("product_id")
    
    # Seed products if none exist
    product_count = await db.products.count_documents({})
    if product_count == 0:
        await db.products.insert_many(products_data)
        logger.info(f"Seeded {len(products_data)} products")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
