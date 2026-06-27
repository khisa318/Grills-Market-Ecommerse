from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {"id": self.id, "email": self.email, "is_admin": self.is_admin}

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(80), unique=True, nullable=False)
    brand = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    tag = db.Column(db.String(30), nullable=True)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    features = db.Column(db.Text, nullable=False)  # Stored as a comma-separated string

    def to_dict(self):
        return {
            "id": self.slug,
            "db_id": self.id,
            "brand": self.brand,
            "name": self.name,
            "price": self.price,
            "tag": self.tag,
            "description": self.description,
            "imageUrl": self.image_url,
            "features": [f.strip() for f in self.features.split(',')] if self.features else []
        }

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default="In Transit")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)