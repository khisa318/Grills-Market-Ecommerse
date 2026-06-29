from flask import Blueprint, request, jsonify
from app import db
from app.models import Address
from app.utils.security import token_required, sanitize_input

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('/cart/addresses', methods=['GET'])
@token_required
def get_addresses(current_user_id, **kwargs):
    """Get user's saved addresses."""
    try:
        addresses = Address.query.filter_by(user_id=current_user_id).all()
        
        addresses_data = [{
            "id": addr.id,
            "street_address": addr.street_address,
            "city": addr.city,
            "state": addr.state,
            "postal_code": addr.postal_code,
            "country": addr.country,
            "is_default": addr.is_default,
            "created_at": addr.created_at.isoformat()
        } for addr in addresses]
        
        return jsonify({"data": addresses_data}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@cart_bp.route('/cart/addresses', methods=['POST'])
@token_required
def add_address(current_user_id, **kwargs):
    """Add a new address."""
    try:
        data = request.get_json() or {}
        
        street = sanitize_input(data.get('street_address', '').strip())
        city = sanitize_input(data.get('city', '').strip())
        state = sanitize_input(data.get('state', '').strip())
        postal = sanitize_input(data.get('postal_code', '').strip())
        country = sanitize_input(data.get('country', 'USA').strip())
        is_default = data.get('is_default', False)
        
        if not all([street, city, state, postal]):
            return jsonify({"error": "All address fields are required"}), 400
        
        # If this is the default, unset other defaults
        if is_default:
            Address.query.filter_by(user_id=current_user_id, is_default=True).update({'is_default': False})
        
        address = Address(
            user_id=current_user_id,
            street_address=street,
            city=city,
            state=state,
            postal_code=postal,
            country=country,
            is_default=is_default or not Address.query.filter_by(user_id=current_user_id).first()
        )
        
        db.session.add(address)
        db.session.commit()
        
        return jsonify({
            "message": "Address added successfully",
            "address": {
                "id": address.id,
                "street_address": address.street_address,
                "city": address.city,
                "state": address.state,
                "postal_code": address.postal_code,
                "country": address.country,
                "is_default": address.is_default
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@cart_bp.route('/cart/addresses/<int:address_id>', methods=['DELETE'])
@token_required
def delete_address(address_id, current_user_id, **kwargs):
    """Delete an address."""
    try:
        address = Address.query.filter_by(id=address_id, user_id=current_user_id).first()
        
        if not address:
            return jsonify({"error": "Address not found"}), 404
        
        db.session.delete(address)
        db.session.commit()
        
        return jsonify({"message": "Address deleted successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@cart_bp.route('/cart/validate-coupon', methods=['POST'])
def validate_coupon():
    """Validate a coupon code."""
    try:
        from app.models import Coupon
        from datetime import datetime
        
        data = request.get_json() or {}
        code = sanitize_input(data.get('code', '').upper().strip())
        subtotal = data.get('subtotal', 0)
        
        if not code:
            return jsonify({"error": "Coupon code is required"}), 400
        
        coupon = Coupon.query.filter_by(code=code, is_active=True).first()
        
        if not coupon:
            return jsonify({"error": "Invalid coupon code"}), 404
        
        # Check expiration
        if datetime.utcnow() > coupon.valid_until or datetime.utcnow() < coupon.valid_from:
            return jsonify({"error": "Coupon has expired"}), 400
        
        # Check max uses
        if coupon.max_uses and coupon.current_uses >= coupon.max_uses:
            return jsonify({"error": "Coupon has reached maximum uses"}), 400
        
        # Check minimum purchase
        if subtotal < coupon.min_purchase:
            return jsonify({"error": f"Minimum purchase of ${coupon.min_purchase} required"}), 400
        
        # Calculate discount
        if coupon.discount_type == 'percentage':
            discount = subtotal * (coupon.discount_value / 100)
        else:
            discount = min(coupon.discount_value, subtotal)
        
        return jsonify({
            "valid": True,
            "code": coupon.code,
            "description": coupon.description,
            "discount": round(discount, 2),
            "discount_type": coupon.discount_type,
            "discount_value": coupon.discount_value
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
