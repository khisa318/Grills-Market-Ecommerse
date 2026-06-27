from flask import Blueprint, request, jsonify
from app.models import Product

products_bp = Blueprint('products', __name__, url_prefix='/api/products')

@products_bp.route('', methods=['GET'])
def get_products():
    query = request.args.get('search', '').lower()
    if query:
        items = Product.query.filter(
            Product.name.ilike(f"%{query}%") | Product.brand.ilike(f"%{query}%")
        ).all()
    else:
        items = Product.query.all()
    return jsonify([i.to_dict() for i in items])

@products_bp.route('/<string:slug>', methods=['GET'])
def get_product(slug):
    item = Product.query.filter_by(slug=slug).first_or_404()
    return jsonify(item.to_dict())