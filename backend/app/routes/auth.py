import jwt
import datetime
import bcrypt
from flask import Blueprint, request, jsonify, current_app
from app.models import db, User

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

def generate_token(user):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': user.id,
        'is_admin': user.is_admin
    }
    return jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    if not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing credentials"}), 400
        
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Account already exists"}), 409

    hashed = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(email=data['email'], password_hash=hashed, is_admin=data.get('is_admin', False))
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and bcrypt.checkpw(data.get('password', '').encode('utf-8'), user.password_hash.encode('utf-8')):
        token = generate_token(user)
        return jsonify({"token": token, "user": user.to_dict()})
        
    return jsonify({"error": "Invalid credential matrices"}), 401