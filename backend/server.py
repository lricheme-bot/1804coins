from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime

from models import (
    Product, ProductCreate, Cart, AddToCartRequest, UpdateCartRequest,
    ContactSubmission, ContactCreate, Order, OrderCreate
)
from database import products_collection, carts_collection, contacts_collection, orders_collection
from seed_data import products_seed

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="1804 Coins API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Startup event - seed database
@app.on_event("startup")
async def startup_event():
    logger.info("Starting up application...")
    # Check if products exist, if not, seed them
    count = await products_collection.count_documents({})
    if count == 0:
        logger.info("Seeding products database...")
        await products_collection.insert_many(products_seed)
        logger.info(f"Seeded {len(products_seed)} products")
    else:
        logger.info(f"Database already has {count} products")

# ==================== PRODUCTS ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "1804 Coins API - Preserving Haiti's Legacy"}

@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    featured: Optional[bool] = Query(None)
):
    """Get all products with optional filtering"""
    query = {}
    
    if category and category != "all":
        query["category"] = category
    
    if featured is not None:
        query["featured"] = featured
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    products = await products_collection.find(query).to_list(1000)
    return [Product(**product) for product in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a single product by ID"""
    product = await products_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@api_router.post("/products", response_model=Product)
async def create_product(product: ProductCreate):
    """Create a new product (admin function)"""
    product_dict = product.dict()
    product_obj = Product(**product_dict)
    await products_collection.insert_one(product_obj.dict())
    return product_obj

# ==================== CART ROUTES ====================

@api_router.get("/cart/{session_id}")
async def get_cart(session_id: str):
    """Get cart for a session"""
    cart = await carts_collection.find_one({"sessionId": session_id})
    
    if not cart:
        # Return empty cart
        return {"sessionId": session_id, "items": [], "totalItems": 0, "subtotal": 0}
    
    # Enrich cart items with product details
    enriched_items = []
    total_items = 0
    subtotal = 0
    
    for item in cart.get("items", []):
        product = await products_collection.find_one({"id": item["productId"]})
        if product:
            enriched_items.append({
                "productId": item["productId"],
                "quantity": item["quantity"],
                "price": item["priceAtAdd"],
                "name": product["name"],
                "subtitle": product["subtitle"],
                "image": product["image"],
                "inStock": product["inStock"]
            })
            total_items += item["quantity"]
            subtotal += item["priceAtAdd"] * item["quantity"]
    
    return {
        "sessionId": session_id,
        "items": enriched_items,
        "totalItems": total_items,
        "subtotal": subtotal
    }

@api_router.post("/cart/add")
async def add_to_cart(request: AddToCartRequest):
    """Add item to cart"""
    # Verify product exists
    product = await products_collection.find_one({"id": request.productId})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if not product.get("inStock"):
        raise HTTPException(status_code=400, detail="Product is out of stock")
    
    # Find or create cart
    cart = await carts_collection.find_one({"sessionId": request.sessionId})
    
    if not cart:
        # Create new cart
        new_cart = {
            "sessionId": request.sessionId,
            "items": [{
                "productId": request.productId,
                "quantity": request.quantity,
                "priceAtAdd": product["price"]
            }],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        await carts_collection.insert_one(new_cart)
    else:
        # Update existing cart
        items = cart.get("items", [])
        found = False
        
        for item in items:
            if item["productId"] == request.productId:
                item["quantity"] += request.quantity
                found = True
                break
        
        if not found:
            items.append({
                "productId": request.productId,
                "quantity": request.quantity,
                "priceAtAdd": product["price"]
            })
        
        await carts_collection.update_one(
            {"sessionId": request.sessionId},
            {"$set": {"items": items, "updatedAt": datetime.utcnow()}}
        )
    
    return {"message": "Item added to cart successfully"}

@api_router.put("/cart/update")
async def update_cart(request: UpdateCartRequest):
    """Update cart item quantity"""
    cart = await carts_collection.find_one({"sessionId": request.sessionId})
    
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    items = cart.get("items", [])
    updated = False
    
    for item in items:
        if item["productId"] == request.productId:
            if request.quantity <= 0:
                items.remove(item)
            else:
                item["quantity"] = request.quantity
            updated = True
            break
    
    if not updated:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    
    await carts_collection.update_one(
        {"sessionId": request.sessionId},
        {"$set": {"items": items, "updatedAt": datetime.utcnow()}}
    )
    
    return {"message": "Cart updated successfully"}

@api_router.delete("/cart/remove/{session_id}/{product_id}")
async def remove_from_cart(session_id: str, product_id: str):
    """Remove item from cart"""
    cart = await carts_collection.find_one({"sessionId": session_id})
    
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    items = [item for item in cart.get("items", []) if item["productId"] != product_id]
    
    await carts_collection.update_one(
        {"sessionId": session_id},
        {"$set": {"items": items, "updatedAt": datetime.utcnow()}}
    )
    
    return {"message": "Item removed from cart"}

@api_router.delete("/cart/clear/{session_id}")
async def clear_cart(session_id: str):
    """Clear entire cart"""
    await carts_collection.delete_one({"sessionId": session_id})
    return {"message": "Cart cleared successfully"}

# ==================== CONTACT ROUTES ====================

@api_router.post("/contact")
async def submit_contact(contact: ContactCreate):
    """Submit contact form"""
    contact_dict = contact.dict()
    contact_obj = ContactSubmission(**contact_dict)
    await contacts_collection.insert_one(contact_obj.dict())
    
    logger.info(f"Contact form submitted by {contact.email}")
    
    return {"message": "Thank you for contacting us! We'll get back to you soon."}

@api_router.get("/contacts", response_model=List[ContactSubmission])
async def get_contacts():
    """Get all contact submissions (admin function)"""
    contacts = await contacts_collection.find().sort("createdAt", -1).to_list(1000)
    return [ContactSubmission(**contact) for contact in contacts]

# ==================== ORDER ROUTES ====================

@api_router.post("/orders")
async def create_order(order: OrderCreate):
    """Create a new order"""
    order_dict = order.dict()
    order_obj = Order(**order_dict)
    await orders_collection.insert_one(order_obj.dict())
    
    # Clear the cart after order is placed
    await carts_collection.delete_one({"sessionId": order.sessionId})
    
    logger.info(f"Order created: {order_obj.orderNumber}")
    
    return {
        "message": "Order created successfully",
        "orderNumber": order_obj.orderNumber,
        "orderId": order_obj.id
    }

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get order details"""
    order = await orders_collection.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("Shutting down application...")