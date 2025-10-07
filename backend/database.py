from motor.motor_asyncio import AsyncIOMotorClient
import os

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'coins_db')]

# Collections
products_collection = db.products
carts_collection = db.carts
contacts_collection = db.contacts
orders_collection = db.orders
