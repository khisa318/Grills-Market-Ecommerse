import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Truck, ShieldCheck, ShoppingBag } from "lucide-react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { api } from "../data/api";

export default function CheckOut() {
  const { cart, cartSubtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bankName: "",
    accountName: "",
    bankReference: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "Kenya",
  });

  const estimatedFreight = cartSubtotal >= 250 ? 0 : 15;
  const estimatedTax = cartSubtotal * 0.085;
  const orderTotal = cartSubtotal + estimatedFreight + estimatedTax;

  const formatMoney = (amount) =>
    `KES ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0 || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setPaymentResult(null);

    try {
      const response = await api.createPaymentCheckout({
        customer: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        bank_details: {
          bank_name: formData.bankName,
          account_name: formData.accountName,
          payment_reference: formData.bankReference,
        },
        shipping_address: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country,
        },
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });

      setPaymentResult(response);
      clearCart();
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Could not start the PayHero payment request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-10">
        <h1 className="font-serif text-3xl font-medium tracking-tight mb-8">Secure PayHero Bank Checkout</h1>

        {cart.length === 0 && !paymentResult ? (
          <div className="bg-white border border-gray-200 p-12 text-center rounded max-w-md mx-auto shadow-sm">
            <ShoppingBag className="size-10 text-gray-300 mx-auto mb-3 stroke-1" />
            <p className="text-sm font-bold text-[#1a110e] uppercase tracking-wider mb-1">Billing Deck Empty</p>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              There are currently no items staged inside your shipping manifest.
            </p>
            <Link to="/shop" className="inline-block bg-[#1a110e] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded hover:bg-[#ff6b2b] transition">
              Return to Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form onSubmit={handlePaymentSubmit} className="lg:col-span-7 space-y-6">
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider rounded p-4">
                  {errorMessage}
                </div>
              )}

              {paymentResult && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded p-5 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider">PayHero payment request created</p>
                  <p className="text-sm">
                    Reference <span className="font-bold">{paymentResult.reference}</span> is pending. Use this reference for the bank payment.
                  </p>
                  <p className="text-xs text-emerald-700">
                    Amount: {formatMoney(paymentResult.amount || orderTotal)}
                  </p>
                  <Link to="/track-order" className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-700 underline underline-offset-4">
                    Continue to tracking
                  </Link>
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2 mb-2">
                  <Truck className="size-4 text-[#ff6b2b]" /> 1. Delivery Address
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b]" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Email for Invoice</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b]" />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Contact Phone Optional</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+254..." className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b] placeholder:text-gray-400" />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Street Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Delivery location" className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b] placeholder:text-gray-400" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">County / State</label>
                    <input required type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="Nairobi" className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Postal Code</label>
                    <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b]" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2 mb-2">
                  <Building2 className="size-4 text-[#ff6b2b]" /> 2. PayHero Bank Payment
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Bank Name Optional</label>
                    <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} placeholder="Equity, KCB, Co-op..." className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b] placeholder:text-gray-400" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Account Name Optional</label>
                    <input type="text" name="accountName" value={formData.accountName} onChange={handleInputChange} placeholder="Name on bank transfer" className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b] placeholder:text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Bank Transfer Reference Optional</label>
                  <input type="text" name="bankReference" value={formData.bankReference} onChange={handleInputChange} placeholder="Reference from your bank transfer" className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b] placeholder:text-gray-400" />
                  <p className="text-[11px] text-gray-400 mt-2">
                    PayHero is configured for bank payments. The backend will create a bank-payment request and track the PayHero reference.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || Boolean(paymentResult)}
                className="w-full bg-[#1a110e] text-white text-xs font-bold uppercase tracking-widest py-4 rounded hover:bg-[#ff6b2b] transition disabled:bg-gray-400 flex items-center justify-center gap-2 shadow-md"
              >
                {isSubmitting ? "Starting PayHero bank request..." : `Pay by bank with PayHero - ${formatMoney(orderTotal)}`}
              </button>
            </form>

            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-3 mb-4">
                  Staged Equipment Manifest
                </h3>

                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-2 space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 pt-3 first:pt-0 items-center justify-between">
                      <div className="w-10 h-10 bg-[#fbf7f4] border border-gray-100 rounded flex items-center justify-center p-0.5 shrink-0">
                        <img src={item.image_url || item.imageUrl} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0 px-1">
                        <h4 className="text-xs font-bold text-[#1a110e] truncate">{item.name}</h4>
                        <span className="text-[10px] text-gray-400 font-medium">Qty: {item.quantity}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-700 shrink-0">
                        {formatMoney(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Equipment Subtotal:</span>
                    <span className="font-medium text-gray-800">{formatMoney(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Insured Freight Delivery:</span>
                    <span className="font-medium text-gray-800">{formatMoney(estimatedFreight)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Sales Tax:</span>
                    <span className="font-medium text-gray-800">{formatMoney(estimatedTax)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold uppercase tracking-wide border-t border-dashed border-gray-200 pt-3 text-[#1a110e]">
                    <span>Total:</span>
                    <span className="font-serif text-base font-black">{formatMoney(orderTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200/60 rounded p-4 flex gap-3 items-start text-gray-500 text-[11px] leading-relaxed shadow-sm">
                <ShieldCheck className="size-5 text-green-600 shrink-0 mt-0.5" />
                <p>
                  The frontend never collects card numbers or CVV. The server validates prices from the database and creates a PayHero bank-payment request for the confirmed total.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
