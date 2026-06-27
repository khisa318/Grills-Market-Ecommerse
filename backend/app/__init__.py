import os
from flask import Flask
from flask_cors import CORS
from app.models import db

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'pitmaster-fallback-encryption-string')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///../grills.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    # Register Route Blueprints
    from app.routes.auth import auth_bp
    from app.routes.products import products_bp
    from app.routes.admin import admin_bp
    from app.routes.payments import payments_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(products_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(payments_bp)
    
    with app.app_context():
        db.create_all()
    
    return app