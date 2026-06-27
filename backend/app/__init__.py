import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Enable CORS for all routes under /api/ with flexible resource headers
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, '..', 'grills.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev_secret_key_123')

    db.init_app(app)

    # 1. Register Products Blueprint
    from app.routes.products import products_bp
    app.register_blueprint(products_bp, url_prefix='/api')

    # 2. Make sure your Auth Blueprint is registered here!
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api')

    return app