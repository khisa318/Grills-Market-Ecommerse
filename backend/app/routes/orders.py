from flask import Blueprint, request, jsonify
from app import db
from app.models import Order, OrderItem, OrderStatusLog, Product, Address, Coupon
from app.utils.security import token_required, sanitize_input
from datetime import datetime
import uuid

orders_bp = Blueprint('orders', __name__)

def generate_order_number():
    """Generate a unique order number."""
    return f"ORD-{datetime.utcnow().strftime('%Y%m%d')}-{str(uuid.uuid4().hex[:8]).upper()}"

@orders_bp.route('/orders', methods=['GET'])
@token_required
def get_user_orders(current_user_id, **kwargs):
    """Get all orders for the current user."""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        orders = Order.query.filter_by(user_id=current_user_id).order_by(
            Order.created_at.desc()
        ).paginate(page=page, per_page=per_page, error_out=False)
        
        orders_data = [{
            "id": order.id,
            "order_number": order.order_number,
            "total_amount": order.total_amount,
            "status": order.status,
            "payment_status": order.payment_status,
            "created_at": order.created_at.isoformat(),
            "items": [{
                "product_id": item.product_id,
                "quantity": item.quantity,
                "price": item.price
            } for item in order.items]
        } for order in orders.items]
        
        return jsonify({
            "data": orders_data,
            "pagination": {
                "page": page,
                "per_page": per_page,
                "total": orders.total,
                "pages": orders.pages
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orders_bp.route('/orders/<int:order_id>', methods=['GET'])
@token_required
def get_order(order_id, current_user_id, **kwargs):
    """Get order details."""
    try:
        order = Order.query.filter_by(id=order_id, user_id=current_user_id).first()
        
        if not order:
            return jsonify({"error": "Order not found"}), 404
        
        return jsonify({
            "id": order.id,
            "order_number": order.order_number,
            "subtotal": order.subtotal,
            "tax": order.tax,
            "shipping": order.shipping,
            "discount": order.discount,
            "total_amount": order.total_amount,
            "status": order.status,
            "payment_status": order.payment_status,
            "payment_method": order.payment_method,
            "tracking_number": order.tracking_number,
            "created_at": order.created_at.isoformat(),
            "shipped_at": order.shipped_at.isoformat() if order.shipped_at else None,
            "delivered_at": order.delivered_at.isoformat() if order.delivered_at else None,
            "items": [{
                "id": item.id,
                "product_id": item.product_id,
                "quantity": item.quantity,
                "price": item.price,
                "subtotal": item.subtotal
            } for item in order.items],
            "status_logs": [{
                "status": log.status,
                "notes": log.notes,
                "created_at": log.created_at.isoformat()
            } for log in order.status_logs]
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@orders_bp.route('/orders/create', methods=['POST'])
@token_required
def create_order(current_user_id, **kwargs):
    """Create a new order."""
    try:
        data = request.get_json() or {}
        
        # Validate required fields
        items = data.get('items', [])
        address_id = data.get('address_id')
        coupon_code = data.get('coupon_code')
        
        if not items or not address_id:
            return jsonify({"error": "Items and address are required"}), 400
        
        # Verify address belongs to user
        address = Address.query.filter_by(id=address_id, user_id=current_user_id).first()
        if not address:
            return jsonify({"error": "Invalid address"}), 400
        
        # Calculate totals
        subtotal = 0
        order_items = []
        
        for item in items:
            product_id = item.get('product_id')
            quantity = item.get('quantity', 1)
            
            product = Product.query.get(product_id)
            if not product:
                return jsonify({"error": f"Product {product_id} not found"}), 404
            
            if product.stock_quantity < quantity:
                return jsonify({"error": f"Insufficient stock for {product.name}"}), 400
            
            item_subtotal = product.price * quantity
            subtotal += item_subtotal
            order_items.append({
                'product': product,
                'quantity': quantity,
                'price': product.price,
                'subtotal': item_subtotal
            })
        
        # Apply coupon if provided
        discount = 0
        if coupon_code:
            coupon = Coupon.query.filter_by(code=coupon_code.upper(), is_active=True).first()
            if coupon and coupon.min_purchase <= subtotal:
                if coupon.discount_type == 'percentage':
                    discount = subtotal * (coupon.discount_value / 100)
                else:
                    discount = min(coupon.discount_value, subtotal)
                
                coupon.current_uses += 1
                db.session.add(coupon)
        
        # Calculate tax (8.5%) and shipping
        tax = (subtotal - discount) * 0.085
        shipping = 15 if subtotal > 100 else 25  # Free shipping over $100
        
        total = subtotal + tax + shipping - discount
        
        # Create order
        order = Order(
            order_number=generate_order_number(),
            user_id=current_user_id,
            address_id=address_id,
            subtotal=subtotal,
            tax=tax,
            shipping=shipping,
            discount=discount,
            total_amount=total,
            status='pending',
            payment_status='pending'
        )
        
        db.session.add(order)
        db.session.flush()  # Get the order ID
        
        # Add order items and reduce stock
        for item_data in order_items:
            order_item = OrderItem(
                order_id=order.id,
                product_id=item_data['product'].id,
                quantity=item_data['quantity'],
                price=item_data['price'],
                subtotal=item_data['subtotal']
            )
            db.session.add(order_item)
            
            # Reduce stock
            item_data['product'].stock_quantity -= item_data['quantity']
        
        # Add initial status log
        status_log = OrderStatusLog(
            order_id=order.id,
            status='pending',
            notes='Order created'
        )
        db.session.add(status_log)
        
        db.session.commit()
        
        return jsonify({
            "message": "Order created successfully",
            "order": {
                "id": order.id,
                "order_number": order.order_number,
                "total_amount": order.total_amount,
                "status": order.status
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@orders_bp.route('/orders/<int:order_id>/cancel', methods=['POST'])
@token_required
def cancel_order(order_id, current_user_id, **kwargs):
    """Cancel an order (only if pending)."""
    try:
        order = Order.query.filter_by(id=order_id, user_id=current_user_id).first()
        
        if not order:
            return jsonify({"error": "Order not found"}), 404
        
        if order.status not in ['pending', 'processing']:
            return jsonify({"error": f"Cannot cancel order with status: {order.status}"}), 400
        
        # Restore stock
        for item in order.items:
            item.product.stock_quantity += item.quantity
        
        order.status = 'cancelled'
        
        status_log = OrderStatusLog(
            order_id=order.id,
            status='cancelled',
            notes='Order cancelled by user'
        )
        db.session.add(status_log)
        db.session.commit()
        
        return jsonify({"message": "Order cancelled successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
