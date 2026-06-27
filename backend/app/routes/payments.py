from flask import Blueprint, request, jsonify
from app.models import db, Order

payments_bp = Blueprint('payments', __name__, url_prefix='/api/payments')

@payments_bp.route('/checkout', methods=['POST'])
def process_checkout():
    data = request.get_json() or {}
    if not data.get('items'):
        return jsonify({"error": "Staged checkout manifest empty"}), 400
        
    subtotal = sum(float(item['price']) * int(item['quantity']) for item in data['items'])
    total_charge = subtotal + (subtotal * 0.085)  # 8.5% automated tax calculation
    
    new_order = Order(total_amount=total_charge, status="In Transit")
    db.session.add(new_order)
    db.session.commit()
    
    return jsonify({
        "message": "Gateway transaction successfully authorized",
        "orderId": f"EMI-{new_order.id:05d}-TX",
        "chargedAmount": total_charge
    }), 200