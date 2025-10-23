from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from datetime import datetime
from bson import ObjectId

from models import Product
from auth import get_current_user

admin_router = APIRouter(prefix="/admin", tags=["admin"])

# Database will be injected from server.py
db = None

def set_db(database):
    global db
    db = database

# Admin users list (in production, use a proper admin table)
ADMIN_EMAILS = ["admin@1804coins.com", "owner@1804coins.com"]

def is_admin(current_user: dict) -> bool:
    return current_user.get("email") in ADMIN_EMAILS

async def require_admin(current_user: dict = Depends(get_current_user)):
    if not is_admin(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required"
        )
    return current_user

# Create Product
@admin_router.post("/products", response_model=Product)
async def create_product(product_data: dict, admin: dict = Depends(require_admin)):
    # Generate new ID
    last_product = await db.products.find_one(sort=[("_id", -1)])
    new_id = str(int(last_product["_id"]) + 1) if last_product else "1"
    
    product_data["_id"] = new_id
    result = await db.products.insert_one(product_data)
    
    created_product = await db.products.find_one({"_id": new_id})
    return Product(**{**created_product, "_id": str(created_product["_id"])})

# Update Product
@admin_router.put("/products/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    product_data: dict,
    admin: dict = Depends(require_admin)
):
    # Remove _id from update data if present
    product_data.pop("_id", None)
    product_data.pop("id", None)
    
    result = await db.products.update_one(
        {"_id": product_id},
        {"$set": product_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_product = await db.products.find_one({"_id": product_id})
    return Product(**{**updated_product, "_id": str(updated_product["_id"])})

# Delete Product
@admin_router.delete("/products/{product_id}")
async def delete_product(product_id: str, admin: dict = Depends(require_admin)):
    result = await db.products.delete_one({"_id": product_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deleted successfully", "product_id": product_id}

# Get all products (admin view with more details)
@admin_router.get("/products", response_model=List[Product])
async def get_all_products_admin(admin: dict = Depends(require_admin)):
    products = await db.products.find().to_list(1000)
    return [Product(**{**p, "_id": str(p["_id"])}) for p in products]

# Check if user is admin
@admin_router.get("/check")
async def check_admin_status(current_user: dict = Depends(get_current_user)):
    return {
        "is_admin": is_admin(current_user),
        "email": current_user.get("email")
    }
