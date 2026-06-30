import base64
import json
import os
import uuid
from datetime import datetime
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from flask import Blueprint, jsonify, request

from app import db, limiter
from app.models import PaymentTransaction, Product
from app.utils.security import sanitize_input

payments_bp = Blueprint('payments', __name__)


def generate_payment_reference():
    return f"PAY-{datetime.utcnow().strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"


def normalize_phone(phone):
    cleaned = ''.join(ch for ch in str(phone or '') if ch.isdigit() or ch == '+')
    if cleaned.startswith('0') and len(cleaned) == 10:
        return f"254{cleaned[1:]}"
    if cleaned.startswith('+254'):
        return cleaned[1:]
    return cleaned


def get_payhero_config():
    return {
        "enabled": os.getenv('PAYHERO_ENABLED', 'false').lower() == 'true',
        "base_url": os.getenv('PAYHERO_API_BASE_URL', 'https://backend.payhero.co.ke/api/v2').rstrip('/'),
        "payment_endpoint": os.getenv('PAYHERO_PAYMENT_ENDPOINT', '/payments'),
        "channel_id": os.getenv('PAYHERO_CHANNEL_ID'),
        "payment_method": os.getenv('PAYHERO_PAYMENT_METHOD', 'bank'),
        "username": os.getenv('PAYHERO_USERNAME'),
        "password": os.getenv('PAYHERO_PASSWORD'),
        "bearer_token": os.getenv('PAYHERO_BEARER_TOKEN'),
        "callback_url": os.getenv('PAYHERO_CALLBACK_URL'),
    }


def build_auth_header(config):
    if config["bearer_token"]:
        return f"Bearer {config['bearer_token']}"

    if config["username"] and config["password"]:
        raw = f"{config['username']}:{config['password']}".encode('utf-8')
        return f"Basic {base64.b64encode(raw).decode('utf-8')}"

    return None


def call_payhero(payload):
    config = get_payhero_config()
    if not config["enabled"]:
        return {
            "sandbox": True,
            "status": "pending",
            "message": "PayHero is disabled until credentials are configured.",
            "reference": payload["external_reference"],
        }

    auth_header = build_auth_header(config)
    if not auth_header or not config["channel_id"]:
        raise RuntimeError("PayHero credentials are not fully configured.")

    url = f"{config['base_url']}{config['payment_endpoint']}"
    request_payload = {
        **payload,
        "channel_id": config["channel_id"],
    }

    if config["callback_url"] and not request_payload.get("callback_url"):
        request_payload["callback_url"] = config["callback_url"]

    req = Request(
        url,
        data=json.dumps(request_payload).encode('utf-8'),
        headers={
            "Authorization": auth_header,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method="POST",
    )

    try:
        with urlopen(req, timeout=20) as response:
            response_body = response.read().decode('utf-8')
            return json.loads(response_body) if response_body else {}
    except HTTPError as error:
        body = error.read().decode('utf-8')
        raise RuntimeError(f"PayHero returned {error.code}: {body}") from error
    except URLError as error:
        raise RuntimeError(f"PayHero request failed: {error.reason}") from error


def calculate_checkout_totals(items):
    subtotal = 0
    normalized_items = []

    if not items:
        raise ValueError("Cart is empty.")

    for item in items:
        product_id = item.get('id') or item.get('product_id')
        quantity = int(item.get('quantity', 1))

        if not product_id or quantity <= 0:
            raise ValueError("Invalid cart item.")

        product = Product.query.filter_by(id=product_id, is_active=True).first()
        if not product:
            raise ValueError(f"Product {product_id} is unavailable.")

        if product.stock_quantity < quantity:
            raise ValueError(f"Insufficient stock for {product.name}.")

        line_total = product.price * quantity
        subtotal += line_total
        normalized_items.append({
            "product_id": product.id,
            "slug": product.slug,
            "name": product.name,
            "quantity": quantity,
            "unit_price": product.price,
            "line_total": line_total,
        })

    tax = subtotal * 0.085
    shipping = 0 if subtotal >= 250 else 15
    total = subtotal + tax + shipping

    return {
        "items": normalized_items,
        "subtotal": round(subtotal, 2),
        "tax": round(tax, 2),
        "shipping": round(shipping, 2),
        "total": round(total, 2),
    }


@payments_bp.route('/payments/checkout', methods=['POST'])
@limiter.limit("10 per hour")
def create_checkout_payment():
    try:
        data = request.get_json() or {}
        customer = data.get('customer') or {}
        phone = normalize_phone(customer.get('phone') or data.get('phone'))
        email = sanitize_input(customer.get('email', '').strip())
        first_name = sanitize_input(customer.get('first_name', '').strip())
        last_name = sanitize_input(customer.get('last_name', '').strip())
        bank_details = data.get('bank_details') or {}

        if not all([first_name, last_name, email]):
            return jsonify({"error": "Customer name and email are required."}), 400

        totals = calculate_checkout_totals(data.get('items', []))
        reference = generate_payment_reference()
        config = get_payhero_config()
        address = data.get('shipping_address') or {}
        address_text = json.dumps({
            "address": sanitize_input(address.get('address', '').strip()),
            "city": sanitize_input(address.get('city', '').strip()),
            "state": sanitize_input(address.get('state', '').strip()),
            "zip_code": sanitize_input(address.get('zip_code', '').strip()),
            "country": sanitize_input(address.get('country', 'Kenya').strip()),
        })

        payment_payload = {
            "amount": int(round(totals["total"])),
            "payment_method": config["payment_method"],
            "provider": config["payment_method"],
            "external_reference": reference,
            "customer_name": f"{first_name} {last_name}",
            "customer_email": email,
            "description": f"Ember & Iron order {reference}",
            "bank_details": {
                "bank_name": sanitize_input(bank_details.get('bank_name', '').strip()),
                "account_name": sanitize_input(bank_details.get('account_name', '').strip()),
                "payment_reference": sanitize_input(bank_details.get('payment_reference', '').strip()),
            },
        }
        if phone:
            payment_payload["customer_phone"] = phone

        transaction = PaymentTransaction(
            reference=reference,
            customer_name=f"{first_name} {last_name}",
            customer_email=email,
            customer_phone=phone or 'not-provided',
            shipping_address=address_text,
            subtotal=totals["subtotal"],
            tax=totals["tax"],
            shipping=totals["shipping"],
            total_amount=totals["total"],
            currency=os.getenv('PAYMENT_CURRENCY', 'KES'),
            status='pending',
            items=json.dumps(totals["items"]),
            provider_payload=json.dumps(payment_payload),
        )
        db.session.add(transaction)
        db.session.flush()

        provider_response = call_payhero(payment_payload)
        transaction.provider_response = json.dumps(provider_response)
        transaction.provider_reference = (
            provider_response.get('reference')
            or provider_response.get('transaction_reference')
            or provider_response.get('transaction_id')
        )
        transaction.checkout_request_id = (
            provider_response.get('checkout_request_id')
            or provider_response.get('CheckoutRequestID')
            or provider_response.get('request_id')
        )
        db.session.commit()

        return jsonify({
            "message": "Payment request created.",
            "reference": transaction.reference,
            "status": transaction.status,
            "amount": transaction.total_amount,
            "currency": transaction.currency,
            "provider_response": provider_response,
            "totals": {
                "subtotal": transaction.subtotal,
                "tax": transaction.tax,
                "shipping": transaction.shipping,
                "total": transaction.total_amount,
            },
        }), 201

    except ValueError as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 400
    except Exception as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 502


@payments_bp.route('/payments/<reference>', methods=['GET'])
def get_payment_status(reference):
    transaction = PaymentTransaction.query.filter_by(reference=sanitize_input(reference)).first()
    if not transaction:
        return jsonify({"error": "Payment not found."}), 404

    return jsonify({
        "reference": transaction.reference,
        "status": transaction.status,
        "amount": transaction.total_amount,
        "currency": transaction.currency,
        "created_at": transaction.created_at.isoformat(),
    }), 200


@payments_bp.route('/payments/payhero/webhook', methods=['POST'])
def payhero_webhook():
    webhook_secret = os.getenv('PAYHERO_WEBHOOK_SECRET')
    provided_secret = request.headers.get('X-PayHero-Webhook-Secret') or request.headers.get('X-Webhook-Secret')

    if webhook_secret and provided_secret != webhook_secret:
        return jsonify({"error": "Invalid webhook secret."}), 401

    data = request.get_json() or {}
    reference = (
        data.get('external_reference')
        or data.get('reference')
        or data.get('merchant_reference')
    )

    if not reference:
        return jsonify({"error": "Payment reference missing."}), 400

    transaction = PaymentTransaction.query.filter_by(reference=sanitize_input(reference)).first()
    if not transaction:
        return jsonify({"error": "Payment not found."}), 404

    incoming_status = str(data.get('status') or data.get('payment_status') or '').lower()
    if incoming_status in {'success', 'successful', 'completed', 'paid'}:
        transaction.status = 'paid'
    elif incoming_status in {'failed', 'cancelled', 'canceled', 'reversed'}:
        transaction.status = 'failed'

    transaction.provider_response = json.dumps(data)
    db.session.commit()

    return jsonify({"message": "Webhook processed."}), 200
