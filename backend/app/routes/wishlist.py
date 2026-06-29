from flask import Blueprint, request, jsonify
from app import db
from app.models import WishlistItem, Product
from app.utils.security import token_required

wishlist_bp = Blueprint('wishlist', __name__)

@wishlist_bp.route('/wishlist', methods=['GET'])
@token_required
def get_wishlist(current_user_id, **kwargs):
    """Get user's wishlist."""
    try:
        wishlist = WishlistItem.query.filter_by(user_id=current_user_id).all()
        
        items_data = [{
            "id": item.id,
            "product": {
                "id": item.product.id,
                "slug": item.product.slug,
                "name": item.product.name,
                "price": item.product.price,
                "image_url": item.product.image_url,
                "in_stock": item.product.stock_quantity > 0
            },
            "added_at": item.created_at.isoformat()
        } for item in wishlist]
        
        return jsonify({
            "data": items_data,
            "count": len(items_data)
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@wishlist_bp.route('/wishlist/<int:product_id>', methods=['POST'])
@token_required
def add_to_wishlist(product_id, current_user_id, **kwargs):
    """Add product to wishlist."""
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404
        
        # Check if already in wishlist
        existing = WishlistItem.query.filter_by(
            user_id=current_user_id,
            product_id=product_id
        ).first()
        
        if existing:
            return jsonify({"error": "Product already in wishlist"}), 400
        
        item = WishlistItem(user_id=current_user_id, product_id=product_id)
        db.session.add(item)
        db.session.commit()
        
        return jsonify({"message": "Added to wishlist"}), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@wishlist_bp.route('/wishlist/<int:item_id>', methods=['DELETE'])
@token_required
def remove_from_wishlist(item_id, current_user_id, **kwargs):
    """Remove product from wishlist."""
    try:
        item = WishlistItem.query.filter_by(id=item_id, user_id=current_user_id).first()
        
        if not item:
            return jsonify({"error": "Wishlist item not found"}), 404
        
        db.session.delete(item)
        db.session.commit()
        
        return jsonify({"message": "Removed from wishlist"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
