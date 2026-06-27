import jwt
from flask import Blueprint, request, jsonify, current_app
from app.models import db, Product

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

def admin_required(f):
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or 'Bearer ' not in auth_header:
            return jsonify({"error": "Missing bearer token"}), 401
        try:
            token = auth_header.split(" ")[1]
            decoded = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            if not decoded.get('is_admin'):
                return jsonify({"error": "Administrative permissions required"}), 403
        except Exception:
            return jsonify({"error": "Invalid or expired token security link"}), 401
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

@admin_bp.route('/products', methods=['POST'])
@admin_required
def add_product():
    data = request.get_json() or {}
    try:
        new_item = Product(
            slug=data['slug'], brand=data['brand'], name=data['name'],
            price=float(data['price']), tag=data.get('tag'),
            description=data['description'], image_url=data['imageUrl'],
            features=data['features']
        )
        db.session.add(new_item)
        db.session.commit()
        return jsonify({"message": "Product injected successfully", "item": new_item.to_dict()}), 201
    except Exception as e:
        return jsonify({"error": f"Failed compiling item fields: {str(e)}"}), 400