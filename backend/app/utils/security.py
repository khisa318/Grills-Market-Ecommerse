import jwt
import os
from datetime import datetime, timedelta
from functools import wraps
from flask import request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
import re
import bleach

def hash_password(password):
    """Hash a password using werkzeug security."""
    if not password or len(password) < 8:
        raise ValueError("Password must be at least 8 characters long")
    return generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)

def verify_password(password, password_hash):
    """Verify a password against its hash."""
    return check_password_hash(password_hash, password)

def generate_jwt_token(user_id, is_admin=False):
    """Generate a JWT token for a user."""
    payload = {
        'user_id': user_id,
        'is_admin': is_admin,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(
            seconds=current_app.config.get('JWT_ACCESS_TOKEN_EXPIRES', 86400)
        )
    }
    return jwt.encode(
        payload,
        current_app.config['JWT_SECRET_KEY'],
        algorithm='HS256'
    )

def verify_jwt_token(token):
    """Verify a JWT token and return the payload."""
    try:
        payload = jwt.decode(
            token,
            current_app.config['JWT_SECRET_KEY'],
            algorithms=['HS256']
        )
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

def token_required(f):
    """Decorator to protect routes with JWT authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Check for token in Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({"error": "Invalid token format"}), 401
        
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        
        payload = verify_jwt_token(token)
        if not payload:
            return jsonify({"error": "Invalid or expired token"}), 401
        
        # Inject user_id into kwargs for the route function
        kwargs['current_user_id'] = payload['user_id']
        kwargs['is_admin'] = payload.get('is_admin', False)
        
        return f(*args, **kwargs)
    
    return decorated

def admin_required(f):
    """Decorator to protect routes for admin users only."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({"error": "Invalid token format"}), 401
        
        if not token:
            return jsonify({"error": "Token is missing"}), 401
        
        payload = verify_jwt_token(token)
        if not payload:
            return jsonify({"error": "Invalid or expired token"}), 401
        
        if not payload.get('is_admin', False):
            return jsonify({"error": "Admin access required"}), 403
        
        kwargs['current_user_id'] = payload['user_id']
        kwargs['is_admin'] = payload['is_admin']
        
        return f(*args, **kwargs)
    
    return decorated

def validate_email(email):
    """Validate email format."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password_strength(password):
    """Validate password strength (min 8 chars, at least one uppercase, one lowercase, one digit)."""
    if len(password) < 8:
        return False, "Password must be at least 8 characters"
    if not re.search(r'[A-Z]', password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(r'[a-z]', password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(r'\d', password):
        return False, "Password must contain at least one digit"
    return True, ""

def sanitize_input(text, max_length=1000):
    """Sanitize user input to prevent XSS attacks."""
    if not isinstance(text, str):
        return ""
    
    # Limit length
    text = text[:max_length]
    
    # Remove potentially dangerous HTML tags
    allowed_tags = []
    sanitized = bleach.clean(text, tags=allowed_tags, strip=True)
    
    return sanitized

def validate_pagination(page, per_page, max_per_page=100):
    """Validate and return safe pagination parameters."""
    try:
        page = max(1, int(page))
        per_page = min(max(1, int(per_page)), max_per_page)
        return page, per_page
    except (ValueError, TypeError):
        return 1, 20
