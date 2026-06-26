import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

# SQLite Configuration Matrix
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'grills.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# -------------------------------------------------------------------------
# DATABASE MODELS
# -------------------------------------------------------------------------

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  # Stored securely

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email
        }

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(80), unique=True, nullable=False) # e.g., 'traeger-pro-575'
    brand = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    tag = db.Column(db.String(30), nullable=True) # e.g., 'BEST SELLER'
    rating = db.Column(db.Integer, default=5)
    review_count = db.Column(db.Integer, default=0)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    
    # Store features list as a simple comma-separated string in SQLite
    _features = db.Column(db.String(255), nullable=False)

    @property
    def features(self):
        return [f.strip() for f in self._features.split(',')] if self._features else []

    @features.setter
    def features(self, value):
        self._features = ','.join(value)

    def to_dict(self):
        return {
            "id": self.slug,  # Keeps it compatible with frontend parameters
            "db_id": self.id,
            "brand": self.brand,
            "name": self.name,
            "price": self.price,
            "tag": self.tag,
            "rating": self.rating,
            "reviewCount": self.review_count,
            "description": self.description,
            "features": self.features,
            "imageUrl": self.image_url
        }

# -------------------------------------------------------------------------
# API ROUTES
# -------------------------------------------------------------------------

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Ember & Iron API Engine"})

@app.route('/api/products', methods=["GET"])
def get_products():
    search_query = request.args.get('search', '').lower()
    
    if search_query:
        # Simple dynamic database search query match
        results = Product.query.filter(
            (Product.name.ilike(f"%{search_query}%")) | 
            (Product.brand.ilike(f"%{search_query}%"))
        ).all()
    else:
        results = Product.query.all()
        
    return jsonify([p.to_dict() for p in results])

@app.route('/api/products/<string:product_slug>', methods=["GET"])
def get_product(product_slug):
    product = Product.query.filter_by(slug=product_slug).first()
    if product:
        return jsonify(product.to_dict())
    return jsonify({"error": "Equipment entry not found"}), 404

# -------------------------------------------------------------------------
# DATABASE INITIALIZATION SEED
# -------------------------------------------------------------------------

def seed_database():
    with app.app_context():
        db.create_all()  # Generates the SQLite tables if missing
        
        if Product.query.first() is None:
            mock_grill = Product(
                slug="traeger-pro-575",
                brand="TRAEGER",
                name="Traeger Pro 575 Wood Pellet Grill",
                price=899.99,
                tag="BEST SELLER",
                rating=5,
                review_count=124,
                description="The world's best-selling pellet grill just got better. Features WiFIRE technology.",
                image_url="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=400&q=80"
            )
            mock_grill.features = ["575 sq in", "180-500°F", "WiFIRE", "Hopper 18 lb"]
            
            db.session.add(mock_grill)
            db.session.commit()
            print("Database initialized and seeded with flagship grill model.")

if __name__ == '__main__':
    seed_database()
    app.run(debug=True, port=5000)