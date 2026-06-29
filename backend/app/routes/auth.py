from flask import Blueprint, request, jsonify
from app import db, limiter
from app.models import User
from app.utils.security import (
    hash_password, verify_password, generate_jwt_token,
    token_required, validate_email, validate_password_strength,
    sanitize_input
)

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/auth/register', methods=['POST', 'OPTIONS'])
@limiter.limit("5 per hour")
def register():
    """Register a new user account."""
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        data = request.get_json() or {}
        
        # Validate required fields
        email = sanitize_input(data.get('email', '').strip())
        username = sanitize_input(data.get('username', '').strip())
        password = data.get('password', '')
        first_name = sanitize_input(data.get('first_name', '').strip())
        last_name = sanitize_input(data.get('last_name', '').strip())
        
        if not email or not username or not password:
            return jsonify({"error": "Email, username, and password are required"}), 400
        
        # Validate email format
        if not validate_email(email):
            return jsonify({"error": "Invalid email format"}), 400
        
        # Validate password strength
        is_strong, message = validate_password_strength(password)
        if not is_strong:
            return jsonify({"error": f"Password requirement: {message}"}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already registered"}), 409
        
        if User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already taken"}), 409
        
        # Create new user
        user = User(
            email=email,
            username=username,
            password_hash=hash_password(password),
            first_name=first_name,
            last_name=last_name,
            is_active=True
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Generate token
        token = generate_jwt_token(user.id, user.is_admin)
        
        return jsonify({
            "message": "User registered successfully",
            "token": token,
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "is_admin": user.is_admin
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/auth/login', methods=['POST', 'OPTIONS'])
@limiter.limit("10 per hour")
def login():
    """Login user with email and password."""
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        data = request.get_json() or {}
        email = sanitize_input(data.get('email', '').strip())
        password = data.get('password', '')
        
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400
        
        # Find user by email
        user = User.query.filter_by(email=email).first()
        
        if not user or not verify_password(password, user.password_hash):
            return jsonify({"error": "Invalid email or password"}), 401
        
        if not user.is_active:
            return jsonify({"error": "Account is inactive"}), 403
        
        # Generate token
        token = generate_jwt_token(user.id, user.is_admin)
        
        return jsonify({
            "message": "Login successful",
            "token": token,
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "is_admin": user.is_admin
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/auth/profile', methods=['GET'])
@token_required
def get_profile(current_user_id, **kwargs):
    """Get the current user's profile."""
    try:
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "phone": user.phone,
            "is_admin": user.is_admin,
            "created_at": user.created_at.isoformat(),
            "addresses": [{
                "id": addr.id,
                "street_address": addr.street_address,
                "city": addr.city,
                "state": addr.state,
                "postal_code": addr.postal_code,
                "country": addr.country,
                "is_default": addr.is_default
            } for addr in user.addresses]
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/auth/profile', methods=['PUT'])
@token_required
def update_profile(current_user_id, **kwargs):
    """Update user profile."""
    try:
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        data = request.get_json() or {}
        
        # Update fields
        if 'first_name' in data:
            user.first_name = sanitize_input(data.get('first_name', ''))
        if 'last_name' in data:
            user.last_name = sanitize_input(data.get('last_name', ''))
        if 'phone' in data:
            user.phone = sanitize_input(data.get('phone', ''))
        
        db.session.commit()
        
        return jsonify({"message": "Profile updated successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@auth_bp.route('/auth/change-password', methods=['POST'])
@token_required
@limiter.limit("3 per hour")
def change_password(current_user_id, **kwargs):
    """Change user password."""
    try:
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        data = request.get_json() or {}
        old_password = data.get('old_password', '')
        new_password = data.get('new_password', '')
        
        # Verify old password
        if not verify_password(old_password, user.password_hash):
            return jsonify({"error": "Old password is incorrect"}), 401
        
        # Validate new password strength
        is_strong, message = validate_password_strength(new_password)
        if not is_strong:
            return jsonify({"error": f"Password requirement: {message}"}), 400
        
        # Update password
        user.password_hash = hash_password(new_password)
        db.session.commit()
        
        return jsonify({"message": "Password changed successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500