from flask import Blueprint, request, jsonify
from app import db
from app.models import Review, Product
from app.utils.security import token_required, sanitize_input

reviews_bp = Blueprint('reviews', __name__)

@reviews_bp.route('/products/<int:product_id>/reviews', methods=['GET'])
def get_product_reviews(product_id):
    """Get all reviews for a product."""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        sort = request.args.get('sort', 'newest')  # newest, oldest, rating_high, rating_low
        
        query = Review.query.filter_by(product_id=product_id)
        
        if sort == 'oldest':
            query = query.order_by(Review.created_at.asc())
        elif sort == 'rating_high':
            query = query.order_by(Review.rating.desc())
        elif sort == 'rating_low':
            query = query.order_by(Review.rating.asc())
        else:  # newest
            query = query.order_by(Review.created_at.desc())
        
        reviews = query.paginate(page=page, per_page=per_page, error_out=False)
        
        reviews_data = [{
            "id": review.id,
            "user_id": review.user_id,
            "rating": review.rating,
            "title": review.title,
            "comment": review.comment,
            "verified_purchase": review.verified_purchase,
            "created_at": review.created_at.isoformat(),
            "user": {
                "username": review.user.username,
                "first_name": review.user.first_name
            }
        } for review in reviews.items]
        
        return jsonify({
            "data": reviews_data,
            "pagination": {
                "page": page,
                "per_page": per_page,
                "total": reviews.total,
                "pages": reviews.pages
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@reviews_bp.route('/products/<int:product_id>/reviews', methods=['POST'])
@token_required
def create_review(product_id, current_user_id, **kwargs):
    """Create a review for a product."""
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404
        
        # Check if user has already reviewed this product
        existing = Review.query.filter_by(
            product_id=product_id,
            user_id=current_user_id
        ).first()
        
        if existing:
            return jsonify({"error": "You have already reviewed this product"}), 400
        
        data = request.get_json() or {}
        
        rating = data.get('rating')
        title = sanitize_input(data.get('title', '').strip())
        comment = sanitize_input(data.get('comment', '').strip())
        
        if not rating or not title or not comment:
            return jsonify({"error": "Rating, title, and comment are required"}), 400
        
        if not (1 <= rating <= 5):
            return jsonify({"error": "Rating must be between 1 and 5"}), 400
        
        # Check if verified purchase
        from app.models import OrderItem
        verified = db.session.query(OrderItem).filter(
            OrderItem.product_id == product_id,
            OrderItem.order.has(user_id=current_user_id)
        ).first() is not None
        
        review = Review(
            product_id=product_id,
            user_id=current_user_id,
            rating=rating,
            title=title,
            comment=comment,
            verified_purchase=verified
        )
        
        db.session.add(review)
        db.session.commit()
        
        return jsonify({
            "message": "Review created successfully",
            "review": {
                "id": review.id,
                "rating": review.rating,
                "title": review.title,
                "comment": review.comment
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@reviews_bp.route('/reviews/<int:review_id>', methods=['DELETE'])
@token_required
def delete_review(review_id, current_user_id, **kwargs):
    """Delete a review (only own reviews)."""
    try:
        review = Review.query.get(review_id)
        
        if not review:
            return jsonify({"error": "Review not found"}), 404
        
        if review.user_id != current_user_id and not kwargs.get('is_admin'):
            return jsonify({"error": "Unauthorized"}), 403
        
        db.session.delete(review)
        db.session.commit()
        
        return jsonify({"message": "Review deleted successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
