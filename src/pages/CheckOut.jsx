import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CreditCard, Truck, ShieldCheck, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CheckOut() {
  const { cart, cartSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State Matrix
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  // Calculate secondary billing elements
  const estimatedFreight = cartSubtotal > 0 ? 0 : 0; // Free freight based on global promo banner
  const estimatedTax = cartSubtotal * 0.085; // 8.5% average allocation fallback
  const orderTotal = cartSubtotal + estimatedFreight + estimatedTax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    // Simulate an API billing transaction endpoint response delay
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart(); // Flush context storage on completion
      alert("Order processed successfully! Staging tracking profile.");
      console.log("Invoice finalized tracking payload:", { formData, items: cart, total: orderTotal });
      navigate("/track-order");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-10">
        <h1 className="font-serif text-3xl font-medium tracking-tight mb-8">Secure Invoicing &amp; Delivery</h1>

        {cart.length === 0 ? (
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
            
            {/* LEFT AREA: SHIPPING AND BILLING ENTRY DECK (7 Columns) */}
            <form onSubmit={handlePaymentSubmit} className="lg:col-span-7 space-y-6">
              
              {/* Section 1: Delivery Address */}
              <div className="bg-white border border-gray-200 rounded p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2 mb-2">
                  <Truck className="size-4 text-[#ff6b2b]" /> 1. Logistics Manifest Address
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
                  <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Email for Telemetry & Invoices</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b]" />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Street Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Freight drop location (No PO Boxes)" className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b] placeholder:text-gray-400" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b]" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">State</label>
                    <input required type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="TX" maxLength="2" className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b] text-center uppercase" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">ZIP Code</label>
                    <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b]" />
                  </div>
                </div>
              </div>

              {/* Section 2: Financial Layer */}
              <div className="bg-white border border-gray-200 rounded p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2 mb-2">
                  <CreditCard className="size-4 text-[#ff6b2b]" /> 2. Gateway Financial Routing
                </h3>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Cardholder Card Number</label>
                  <input required type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b] placeholder:text-gray-400" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Expiration Date</label>
                    <input required type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM/YY" className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b] text-center placeholder:text-gray-400" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Security CVV</label>
                    <input required type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="000" maxLength="4" className="w-full bg-[#fbf7f4] border border-gray-200 p-2 text-xs rounded focus:outline-none focus:border-[#ff6b2b] text-center placeholder:text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Action Processing Execution Trigger */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1a110e] text-white text-xs font-bold uppercase tracking-widest py-4 rounded hover:bg-[#ff6b2b] transition disabled:bg-gray-400 flex items-center justify-center gap-2 shadow-md"
              >
                {isSubmitting ? "Authorizing Security Node..." : `Authorize Invoice Payment • $${orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
              </button>
            </form>

            {/* RIGHT AREA: ITEMIZATION MANIFEST BREAKDOWN (5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-3 mb-4">
                  Staged Equipment Manifest
                </h3>

                {/* Inline loop for items */}
                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-2 space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 pt-3 first:pt-0 items-center justify-between">
                      <div className="w-10 h-10 bg-[#fbf7f4] border border-gray-100 rounded flex items-center justify-center p-0.5 shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0 px-1">
                        <h4 className="text-xs font-bold text-[#1a110e] truncate">{item.name}</h4>
                        <span className="text-[10px] text-gray-400 font-medium">Qty: {item.quantity}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-700 shrink-0">
                        ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Computational Cost Tiers */}
                <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Equipment Subtotal:</span>
                    <span className="font-medium text-gray-800">${cartSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Insured Freight Delivery:</span>
                    <span className="text-green-600 font-bold uppercase text-[10px] tracking-wider">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Regulatory State Sales Tax:</span>
                    <span className="font-medium text-gray-800">${estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold uppercase tracking-wide border-t border-dashed border-gray-200 pt-3 text-[#1a110e]">
                    <span>Total Invoiced Outlay:</span>
                    <span className="font-serif text-base font-black">${orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Secure Shield Seal */}
              <div className="bg-white border border-gray-200/60 rounded p-4 flex gap-3 items-start text-gray-500 text-[11px] leading-relaxed shadow-sm">
                <ShieldCheck className="size-5 text-green-600 shrink-0 mt-0.5" />
                <p>
                  Your communication parameters are filtered using continuous symmetric AES-256 endpoint hashing arrays. Banking card credentials are completely unrecorded inside local SQLite configurations.
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