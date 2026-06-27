from flask import Blueprint, jsonify
from app.models import Product

products_bp = Blueprint('products_bp', __name__)

# Route to get ALL products
@products_bp.route('/products', methods=['GET'])
def get_products():
    items = Product.query.all()
    return jsonify([
        {
            "id": item.id,
            "slug": item.slug,
            "brand": item.brand,
            "name": item.name,
            "price": item.price,
            "tag": item.tag,
            "description": item.description,
            "image_url": item.image_url,
            "features": item.features
        } for item in items
    ]), 200

# Route to get a SINGLE product by its slug
@products_bp.route('/products/<slug>', methods=['GET'])
def get_product(slug):
    item = Product.query.filter_by(slug=slug).first_or_404()
    return jsonify({
        "id": item.id,
        "slug": item.slug,
        "brand": item.brand,
        "name": item.name,
        "price": item.price,
        "tag": item.tag,
        "description": item.description,
        "image_url": item.image_url,
        "features": item.features
    }), 200