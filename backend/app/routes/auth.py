from flask import Blueprint, request, jsonify
from app.models import User
from werkzeug.security import check_password_hash
# import jwt, datetime etc. depending on your token logic

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/auth/login', methods=['POST', 'OPTIONS'])
def login():
    # Handle browser preflight checks manually if needed
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
        
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    # Your login lookup code goes here...
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password_hash, password):
        # Generate token logic...
        return jsonify({
            "token": "your_jwt_token_here",
            "user": {"email": user.email, "is_admin": user.is_admin}
        }), 200

    return jsonify({"error": "Invalid email or password"}), 401