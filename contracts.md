# API Contracts & Backend Implementation Plan

## Authentication Endpoints

### POST /api/auth/register
**Request:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

### POST /api/auth/login
**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

### GET /api/auth/me
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```

## Product Endpoints

### GET /api/products
**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": 25.00,
    "image": "string",
    "status": "in_stock|limited_stock|coming_soon",
    "category": "string",
    "featured": boolean,
    "year": "string",
    "material": "string",
    "weight": "string",
    "diameter": "string",
    "mintage": "string"
  }
]
```

### GET /api/products/{id}
**Response:** Single product object

## Comment Endpoints

### GET /api/products/{product_id}/comments
**Response:**
```json
[
  {
    "id": "string",
    "product_id": "string",
    "user_id": "string",
    "username": "string",
    "comment": "string",
    "timestamp": "ISO string",
    "likes": number
  }
]
```

### POST /api/products/{product_id}/comments
**Headers:** Authorization: Bearer {token}
**Request:**
```json
{
  "comment": "string"
}
```
**Response:** Created comment object

### POST /api/comments/{comment_id}/like
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "likes": number
}
```

## Database Models

### User
- _id: ObjectId
- username: string (unique)
- email: string (unique)
- password: string (hashed)
- created_at: datetime

### Product
- _id: ObjectId
- name: string
- description: string
- price: float
- image: string
- status: string
- category: string
- featured: boolean
- year: string
- material: string
- weight: string
- diameter: string
- mintage: string

### Comment
- _id: ObjectId
- product_id: string
- user_id: string
- username: string
- comment: string
- timestamp: datetime
- likes: int
- liked_by: [user_id]

## Frontend Integration

### Replace Mock Data:
1. Remove mockData.js usage
2. Replace AuthContext to use API calls
3. Update ProductDetail to fetch comments from API
4. Add axios interceptor for JWT token
5. Handle loading states and errors
