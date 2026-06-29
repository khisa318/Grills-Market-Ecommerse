# Grill Website - Architecture & Best Practices

## 📂 Project Structure

```
grill-website/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── admin.py          # Admin operations
│   │   │   ├── auth.py           # Authentication
│   │   │   ├── cart.py           # Cart & addresses
│   │   │   ├── orders.py         # Order management
│   │   │   ├── products.py       # Product catalog
│   │   │   ├── reviews.py        # Product reviews
│   │   │   └── wishlist.py       # Wishlist management
│   │   ├── utils/
│   │   │   ├── security.py       # Auth & validation utilities
│   │   │   └── error_handler.py  # Global error handling
│   │   ├── models.py             # Database models
│   │   └── __init__.py           # App initialization
│   ├── run.py                    # Entry point
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example              # Environment variables template
│   └── grills.db                 # SQLite database
├── src/
│   ├── components/               # Reusable React components
│   ├── context/                  # React context (Auth)
│   ├── data/                     # API client
│   ├── pages/                    # Page components
│   ├── store.js                  # Zustand state management
│   ├── App.jsx                   # Main app component
│   └── index.css                 # Tailwind CSS
├── public/                       # Static assets
├── package.json                  # NPM dependencies
├── vite.config.js               # Vite configuration
├── eslint.config.js             # Linting configuration
├── index.html                   # Entry HTML
├── .env.local                   # Frontend environment (local)
└── README.md                    # Project documentation

```

---

## 🏗️ Architecture Overview

### Backend Architecture (Flask)
```
Request → CORS Middleware → Rate Limiter → Route Handler
                                            ↓
                                        Authenticate
                                            ↓
                                        Validate Input
                                            ↓
                                        Business Logic
                                            ↓
                                        Database Query (SQLAlchemy)
                                            ↓
                                        Response
```

### Frontend Architecture (React)
```
User Action → Component → Store (Zustand) → API Client
                ↑                              ↓
                └──────── Response ←──────────┘
                
LocalStorage ← Persist Middleware
```

---

## 💾 Database Schema

### Users Table
```sql
id (PK), email (UNIQUE), username (UNIQUE), password_hash, 
first_name, last_name, phone, is_admin, is_active, 
created_at, updated_at
```

### Products Table
```sql
id (PK), slug (UNIQUE, INDEX), brand (INDEX), name, 
price, original_price, category (INDEX), tag (INDEX), 
description, image_url, features, stock_quantity, sku (UNIQUE), 
is_active, created_at, updated_at
```

### Orders Table
```sql
id (PK), order_number (UNIQUE, INDEX), user_id (FK), address_id (FK), 
subtotal, tax, shipping, discount, total_amount, 
status (INDEX), payment_status, payment_method, payment_id, 
tracking_number, notes, created_at (INDEX), updated_at, 
shipped_at, delivered_at
```

### Order Items Table
```sql
id (PK), order_id (FK), product_id (FK), quantity, price, subtotal
```

### Reviews Table
```sql
id (PK), product_id (FK), user_id (FK), rating, title, comment, 
verified_purchase, created_at, updated_at
```

### Addresses Table
```sql
id (PK), user_id (FK), street_address, city, state, postal_code, 
country, is_default, created_at
```

### Coupons Table
```sql
id (PK), code (UNIQUE, INDEX), description, discount_type, 
discount_value, min_purchase, max_uses, current_uses, is_active, 
valid_from, valid_until, created_at
```

---

## 🔐 Authentication Flow

### Registration
```
1. User submits email, username, password
2. Validate format & strength
3. Check if email/username already exists
4. Hash password (PBKDF2-SHA256)
5. Create user in database
6. Generate JWT token
7. Return token & user data
8. Client stores token in localStorage
```

### Login
```
1. User submits email, password
2. Find user by email
3. Verify password hash
4. Check account is active
5. Generate JWT token
6. Return token & user data
7. Client stores token in localStorage
8. Set Authorization header for all future requests
```

### Protected Routes
```
1. Client sends request with Authorization header
2. Backend extracts token from header
3. Verify token signature
4. Check token not expired
5. Extract user_id & is_admin from payload
6. Proceed with route handler
7. If token invalid/missing → 401 Unauthorized
8. If user not admin for admin route → 403 Forbidden
```

---

## 🛒 Order Processing Flow

### Checkout Process
```
1. User selects products → Cart
2. User adds/updates quantity
3. User enters/selects shipping address
4. Apply coupon code (optional)
   - Validate coupon
   - Calculate discount
5. Calculate totals:
   - Subtotal = sum(product_price * quantity)
   - Tax = subtotal * 0.085 (8.5%)
   - Shipping = $15 or $25 (free over $100)
   - Discount = coupon value
   - Total = subtotal + tax + shipping - discount
6. Create order in database
   - Generate order_number
   - Create order items
   - Reduce product stock
   - Log order status
7. Return order confirmation
8. Payment gateway integration (future)
```

### Order Status Workflow
```
Pending → Processing → Shipped → Delivered
           (Admin can cancel if pending/processing)
           
Each status change:
- Updates order.status
- Creates OrderStatusLog entry
- Can include tracking number
- Timestamps recorded
```

---

## 🎯 API Response Format

### Success Response (200 OK)
```json
{
  "data": { ... },
  "message": "Operation successful",
  "pagination": { "page": 1, "per_page": 20, "total": 100, "pages": 5 }
}
```

### Error Response
```json
{
  "error": "Human-readable error message"
}
```

### Authentication Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "is_admin": false
  }
}
```

---

## 🔄 State Management Strategy

### Zustand Stores

**AuthStore**
- Current user & token
- Login/logout state
- Auth errors

**CartStore**
- Cart items
- Coupon applied
- Saved addresses
- Cart totals

**ProductStore**
- Product list
- Filters & sorting
- Categories & brands
- Loading state

**WishlistStore**
- Wishlist item IDs
- Persistent (localStorage)

**UIStore**
- Sidebar/drawer state
- Cart drawer state
- Notifications

---

## 🔌 Integration Points

### Email Service (Future)
```python
# Send order confirmation
send_email(
    to=user.email,
    subject="Order Confirmation",
    template="order_confirmation.html",
    context={"order": order}
)

# Send password reset
send_password_reset_email(user)

# Send shipment tracking
send_shipment_notification(order)
```

### Payment Gateway (Future)
```python
# Stripe Integration
@orders_bp.route('/checkout/payment', methods=['POST'])
@token_required
def create_payment_intent(current_user_id):
    intent = stripe.PaymentIntent.create(
        amount=int(total * 100),  # cents
        currency='usd',
        metadata={'order_id': order.id}
    )
    return jsonify({"client_secret": intent.client_secret})
```

### Image Upload (Future)
```python
# AWS S3 Integration
from flask_uploads import UploadSet, IMAGES

photos = UploadSet('photos', IMAGES)

@products_bp.route('/products/<id>/upload-image', methods=['POST'])
@admin_required
def upload_product_image(product_id):
    file = request.files['image']
    filename = photos.save(file)
    url = photos.url(filename)
    product.image_url = url
    db.session.commit()
```

---

## ⚡ Performance Optimization

### Current Implementation
- Pagination on all list endpoints
- Database indexing on FK and search fields
- Request rate limiting
- JWT tokens (stateless, no session lookup)

### Future Optimizations
- Redis caching for:
  - Category/brand lists
  - Popular products
  - User sessions
- Database query optimization:
  - Lazy loading for relationships
  - Eager loading where beneficial
  - Query result caching
- Frontend optimizations:
  - Code splitting
  - Lazy loading images
  - Service worker caching

---

## 📊 Monitoring & Logging

### Recommended Setup
```python
# Sentry for error tracking
import sentry_sdk
sentry_sdk.init("https://key@sentry.io/project")

# Python logging
import logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

### Key Metrics to Track
- API response times
- Error rates by endpoint
- Database query performance
- User registration/login trends
- Order volume & revenue
- Stock levels (low stock alerts)
- Rate limiter hits

---

## 🧪 Testing Strategy

### Backend Testing
```python
# test_auth.py
def test_user_registration():
    response = client.post('/api/auth/register', json={
        'email': 'test@example.com',
        'username': 'testuser',
        'password': 'SecurePass123'
    })
    assert response.status_code == 201

def test_invalid_token():
    response = client.get('/api/auth/profile', 
        headers={'Authorization': 'Bearer invalid'})
    assert response.status_code == 401
```

### Frontend Testing
```javascript
// useAuth.test.jsx
describe('useAuth', () => {
  it('should login user', async () => {
    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.login('user@example.com', 'password');
    });
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

---

## 🚀 Deployment Guide

### Development
```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
python run.py

# Terminal 2: Frontend
npm run dev
```

### Production (Docker - Optional)
```dockerfile
# Dockerfile.backend
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:create_app()"]
```

```dockerfile
# Dockerfile.frontend
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

**Last Updated:** 2024
**Maintainer:** Development Team
