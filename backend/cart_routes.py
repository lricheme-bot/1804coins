from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from datetime import datetime
from bson import ObjectId

from cart_models import (
    AddToCartRequest, UpdateCartRequest, CartResponse, 
    CartItem, Order, CreateOrderResponse, OrderItem
)
from auth import get_current_user

cart_router = APIRouter(prefix="/cart", tags=["cart"])

# Database will be injected from server.py
db = None

def set_cart_db(database):
    global db
    db = database

# Add item to cart
@cart_router.post("/add")
async def add_to_cart(
    request: AddToCartRequest,
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["user_id"]
    
    # Get product details
    product = await db.products.find_one({"_id": request.product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Get or create cart
    cart = await db.carts.find_one({"user_id": user_id})
    
    if not cart:
        # Create new cart
        cart = {
            "user_id": user_id,
            "items": [],
            "updated_at": datetime.utcnow()
        }
    
    # Check if item already in cart
    item_exists = False
    for item in cart["items"]:
        if item["product_id"] == request.product_id:
            item["quantity"] += request.quantity
            item_exists = True
            break
    
    if not item_exists:
        # Add new item
        cart["items"].append({
            "product_id": request.product_id,
            "name": product["name"],
            "image": product["image"],
            "price": product.get("sale_price") or product["price"],
            "quantity": request.quantity
        })
    
    cart["updated_at"] = datetime.utcnow()
    
    # Upsert cart
    await db.carts.update_one(
        {"user_id": user_id},
        {"$set": cart},
        upsert=True
    )
    
    return {"message": "Item added to cart", "item_count": len(cart["items"])}

# Get user's cart
@cart_router.get("", response_model=CartResponse)
async def get_cart(current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    
    cart = await db.carts.find_one({"user_id": user_id})
    
    if not cart or not cart.get("items"):
        return CartResponse(items=[], total=0.0, item_count=0)
    
    items = [CartItem(**item) for item in cart["items"]]
    total = sum(item.price * item.quantity for item in items)
    
    return CartResponse(
        items=items,
        total=round(total, 2),
        item_count=sum(item.quantity for item in items)
    )

# Update item quantity
@cart_router.put("/update")
async def update_cart_item(
    request: UpdateCartRequest,
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["user_id"]
    
    if request.quantity < 0:
        raise HTTPException(status_code=400, detail="Quantity cannot be negative")
    
    cart = await db.carts.find_one({"user_id": user_id})
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    # Update quantity or remove if 0
    if request.quantity == 0:
        cart["items"] = [item for item in cart["items"] if item["product_id"] != request.product_id]
    else:
        found = False
        for item in cart["items"]:
            if item["product_id"] == request.product_id:
                item["quantity"] = request.quantity
                found = True
                break
        
        if not found:
            raise HTTPException(status_code=404, detail="Item not found in cart")
    
    cart["updated_at"] = datetime.utcnow()
    
    await db.carts.update_one(
        {"user_id": user_id},
        {"$set": cart}
    )
    
    return {"message": "Cart updated", "item_count": len(cart["items"])}

# Remove item from cart
@cart_router.delete("/remove/{product_id}")
async def remove_from_cart(
    product_id: str,
    current_user: dict = Depends(get_current_user)
):
    user_id = current_user["user_id"]
    
    result = await db.carts.update_one(
        {"user_id": user_id},
        {"$pull": {"items": {"product_id": product_id}}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    
    return {"message": "Item removed from cart"}

# Clear entire cart
@cart_router.delete("/clear")
async def clear_cart(current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    
    await db.carts.update_one(
        {"user_id": user_id},
        {"$set": {"items": [], "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Cart cleared"}

# Create order from cart
@cart_router.post("/checkout", response_model=CreateOrderResponse)
async def checkout(current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    
    # Get cart
    cart = await db.carts.find_one({"user_id": user_id})
    if not cart or not cart.get("items"):
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    # Calculate total
    total = sum(item["price"] * item["quantity"] for item in cart["items"])
    
    # Create order
    order = {
        "user_id": user_id,
        "items": cart["items"],
        "total": round(total, 2),
        "status": "pending",
        "created_at": datetime.utcnow()
    }
    
    result = await db.orders.insert_one(order)
    order_id = str(result.inserted_id)
    
    # Clear cart after successful order
    await db.carts.update_one(
        {"user_id": user_id},
        {"$set": {"items": [], "updated_at": datetime.utcnow()}}
    )
    
    return CreateOrderResponse(
        order_id=order_id,
        total=round(total, 2),
        message="Order created successfully"
    )

# Get user's orders
@cart_router.get("/orders", response_model=List[Order])
async def get_orders(current_user: dict = Depends(get_current_user)):
    user_id = current_user["user_id"]
    
    orders = await db.orders.find({"user_id": user_id}).sort("created_at", -1).to_list(100)
    
    return [Order(**{**order, "_id": str(order["_id"])}) for order in orders]
