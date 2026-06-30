from flask import Blueprint, jsonify, request
from app import db
from app.models import Product, Review
from app.utils.security import sanitize_input, validate_pagination
from sqlalchemy import or_

products_bp = Blueprint('products_bp', __name__)


@products_bp.after_request
def add_product_cache_headers(response):
    """Allow browsers and CDNs to briefly cache public catalog reads."""
    if request.method == 'GET' and response.status_code == 200:
        response.headers['Cache-Control'] = 'public, max-age=300, stale-while-revalidate=60'
    return response


@products_bp.route('/products', methods=['GET'])
def get_products():
    """Get all products with filtering, sorting, and pagination."""
    try:
        # Pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        page, per_page = validate_pagination(page, per_page)
        
        # Filtering
        search = sanitize_input(request.args.get('search', '').strip())
        category = sanitize_input(request.args.get('category', '').strip())
        tag = sanitize_input(request.args.get('tag', '').strip())
        brand = sanitize_input(request.args.get('brand', '').strip())
        
        # Price range
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        
        # Sorting
        sort_by = sanitize_input(request.args.get('sort_by', 'created_at').strip())
        sort_order = sanitize_input(request.args.get('sort_order', 'desc').strip())
        
        # Build query
        query = Product.query.filter_by(is_active=True)
        
        # Apply filters
        if search:
            query = query.filter(
                or_(
                    Product.name.ilike(f'%{search}%'),
                    Product.description.ilike(f'%{search}%'),
                    Product.brand.ilike(f'%{search}%')
                )
            )
        
        if category:
            query = query.filter_by(category=category)
        
        if tag:
            query = query.filter_by(tag=tag)
        
        if brand:
            query = query.filter_by(brand=brand)
        
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        
        # Apply sorting
        valid_sort_fields = ['name', 'price', 'created_at', 'rating']
        if sort_by not in valid_sort_fields:
            sort_by = 'created_at'
        
        sort_column = getattr(Product, sort_by)
        if sort_order.lower() == 'asc':
            query = query.order_by(sort_column.asc())
        else:
            query = query.order_by(sort_column.desc())
        
        # Get total count
        total = query.count()
        
        # Paginate
        items = query.paginate(page=page, per_page=per_page, error_out=False)
        
        products_data = [{
            "id": item.id,
            "slug": item.slug,
            "brand": item.brand,
            "name": item.name,
            "price": item.price,
            "original_price": item.original_price,
            "category": item.category,
            "tag": item.tag,
            "description": item.description,
            "image_url": item.image_url,
            "features": item.features,
            "stock_quantity": item.stock_quantity,
            "in_stock": item.stock_quantity > 0
        } for item in items.items]
        
        return jsonify({
            "data": products_data,
            "pagination": {
                "page": page,
                "per_page": per_page,
                "total": total,
                "pages": (total + per_page - 1) // per_page
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/products/<slug>', methods=['GET'])
def get_product(slug):
    """Get a single product by slug with reviews."""
    try:
        slug = sanitize_input(slug)
        product = Product.query.filter_by(slug=slug, is_active=True).first()
        
        if not product:
            return jsonify({"error": "Product not found"}), 404
        
        # Get average rating
        reviews = Review.query.filter_by(product_id=product.id).all()
        avg_rating = sum(r.rating for r in reviews) / len(reviews) if reviews else 0
        
        return jsonify({
            "id": product.id,
            "slug": product.slug,
            "brand": product.brand,
            "name": product.name,
            "price": product.price,
            "original_price": product.original_price,
            "category": product.category,
            "tag": product.tag,
            "description": product.description,
            "image_url": product.image_url,
            "features": product.features,
            "stock_quantity": product.stock_quantity,
            "in_stock": product.stock_quantity > 0,
            "sku": product.sku,
            "reviews_count": len(reviews),
            "average_rating": round(avg_rating, 1),
            "created_at": product.created_at.isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/products/categories', methods=['GET'])
def get_categories():
    """Get list of unique categories."""
    try:
        categories = db.session.query(Product.category).distinct().filter(
            Product.is_active == True
        ).all()
        
        return jsonify({
            "categories": [cat[0] for cat in categories if cat[0]]
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@products_bp.route('/products/brands', methods=['GET'])
def get_brands():
    """Get list of unique brands."""
    try:
        brands = db.session.query(Product.brand).distinct().filter(
            Product.is_active == True
        ).all()
        
        return jsonify({
            "brands": [brand[0] for brand in brands if brand[0]]
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
