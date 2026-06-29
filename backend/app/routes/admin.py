from flask import Blueprint, request, jsonify
from app import db
from app.models import Product, Order, User, InventoryLog, Coupon
from app.utils.security import admin_required, sanitize_input
from datetime import datetime, timedelta

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/products', methods=['POST'])
@admin_required
def create_product(**kwargs):
    """Create a new product (admin only)."""
    try:
        data = request.get_json() or {}
        
        slug = sanitize_input(data.get('slug', '').strip().lower())
        name = sanitize_input(data.get('name', '').strip())
        brand = sanitize_input(data.get('brand', '').strip())
        price = float(data.get('price', 0))
        category = sanitize_input(data.get('category', '').strip())
        
        if not all([slug, name, brand, price, category]):
            return jsonify({"error": "Missing required fields"}), 400
        
        if Product.query.filter_by(slug=slug).first():
            return jsonify({"error": "Product with this slug already exists"}), 409
        
        product = Product(
            slug=slug,
            name=name,
            brand=brand,
            price=price,
            original_price=data.get('original_price'),
            category=category,
            tag=sanitize_input(data.get('tag', '').strip()),
            description=sanitize_input(data.get('description', '').strip()),
            image_url=sanitize_input(data.get('image_url', '').strip()),
            features=data.get('features'),
            stock_quantity=int(data.get('stock_quantity', 0)),
            sku=sanitize_input(data.get('sku', '').strip()),
            is_active=True
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({
            "message": "Product created successfully",
            "product": {"id": product.id, "slug": product.slug}
        }), 201
        
    except ValueError:
        return jsonify({"error": "Invalid price format"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/products/<int:product_id>', methods=['PUT'])
@admin_required
def update_product(product_id, **kwargs):
    """Update a product (admin only)."""
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404
        
        data = request.get_json() or {}
        
        # Update fields
        if 'name' in data:
            product.name = sanitize_input(data['name'].strip())
        if 'price' in data:
            product.price = float(data['price'])
        if 'original_price' in data:
            product.original_price = float(data['original_price']) if data['original_price'] else None
        if 'description' in data:
            product.description = sanitize_input(data['description'].strip())
        if 'image_url' in data:
            product.image_url = sanitize_input(data['image_url'].strip())
        if 'stock_quantity' in data:
            product.stock_quantity = int(data['stock_quantity'])
        if 'is_active' in data:
            product.is_active = bool(data['is_active'])
        
        db.session.commit()
        
        return jsonify({"message": "Product updated successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/inventory/<int:product_id>', methods=['POST'])
@admin_required
def update_inventory(product_id, **kwargs):
    """Update product inventory."""
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404
        
        data = request.get_json() or {}
        quantity_change = int(data.get('quantity_change', 0))
        reason = sanitize_input(data.get('reason', 'adjustment').strip())
        
        old_stock = product.stock_quantity
        product.stock_quantity += quantity_change
        
        # Log the change
        log = InventoryLog(
            product_id=product_id,
            quantity_change=quantity_change,
            reason=reason,
            reference_id=data.get('reference_id')
        )
        
        db.session.add(log)
        db.session.commit()
        
        return jsonify({
            "message": "Inventory updated",
            "old_stock": old_stock,
            "new_stock": product.stock_quantity
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/orders/<int:order_id>/status', methods=['PUT'])
@admin_required
def update_order_status(order_id, **kwargs):
    """Update order status (admin only)."""
    try:
        from app.models import OrderStatusLog
        
        order = Order.query.get(order_id)
        if not order:
            return jsonify({"error": "Order not found"}), 404
        
        data = request.get_json() or {}
        new_status = sanitize_input(data.get('status', '').strip().lower())
        notes = sanitize_input(data.get('notes', '').strip())
        tracking_number = sanitize_input(data.get('tracking_number', '').strip())
        
        valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
        if new_status not in valid_statuses:
            return jsonify({"error": f"Invalid status. Valid: {valid_statuses}"}), 400
        
        old_status = order.status
        order.status = new_status
        
        if tracking_number:
            order.tracking_number = tracking_number
        
        if new_status == 'shipped' and not order.shipped_at:
            order.shipped_at = datetime.utcnow()
        elif new_status == 'delivered' and not order.delivered_at:
            order.delivered_at = datetime.utcnow()
        
        # Log status change
        status_log = OrderStatusLog(
            order_id=order_id,
            status=new_status,
            notes=notes or f"Status changed from {old_status} to {new_status}"
        )
        
        db.session.add(status_log)
        db.session.commit()
        
        return jsonify({
            "message": "Order status updated",
            "old_status": old_status,
            "new_status": new_status
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/coupons', methods=['POST'])
@admin_required
def create_coupon(**kwargs):
    """Create a coupon code (admin only)."""
    try:
        data = request.get_json() or {}
        
        code = sanitize_input(data.get('code', '').upper().strip())
        discount_type = sanitize_input(data.get('discount_type', '').strip())
        discount_value = float(data.get('discount_value', 0))
        
        if not all([code, discount_type, discount_value]):
            return jsonify({"error": "Missing required fields"}), 400
        
        if discount_type not in ['percentage', 'fixed']:
            return jsonify({"error": "Discount type must be 'percentage' or 'fixed'"}), 400
        
        if Coupon.query.filter_by(code=code).first():
            return jsonify({"error": "Coupon code already exists"}), 409
        
        coupon = Coupon(
            code=code,
            description=sanitize_input(data.get('description', '').strip()),
            discount_type=discount_type,
            discount_value=discount_value,
            min_purchase=float(data.get('min_purchase', 0)),
            max_uses=int(data.get('max_uses')) if data.get('max_uses') else None,
            valid_from=datetime.fromisoformat(data.get('valid_from', datetime.utcnow().isoformat())),
            valid_until=datetime.fromisoformat(data.get('valid_until', (datetime.utcnow() + timedelta(days=30)).isoformat())),
            is_active=True
        )
        
        db.session.add(coupon)
        db.session.commit()
        
        return jsonify({
            "message": "Coupon created successfully",
            "coupon": {"id": coupon.id, "code": coupon.code}
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/dashboard/stats', methods=['GET'])
@admin_required
def get_dashboard_stats(**kwargs):
    """Get dashboard statistics (admin only)."""
    try:
        total_orders = Order.query.count()
        total_revenue = db.session.query(db.func.sum(Order.total_amount)).scalar() or 0
        total_users = User.query.count()
        
        # Orders in last 30 days
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        recent_orders = Order.query.filter(Order.created_at >= thirty_days_ago).count()
        
        # Low stock products
        low_stock = Product.query.filter(Product.stock_quantity < 10, Product.is_active == True).count()
        
        return jsonify({
            "total_orders": total_orders,
            "total_revenue": round(total_revenue, 2),
            "total_users": total_users,
            "recent_orders_30d": recent_orders,
            "low_stock_products": low_stock
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500