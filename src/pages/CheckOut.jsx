import React from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { Lock, CreditCard, ShieldCheck } from "lucide-react";

export default function CheckOut() {
  // Mock item to show in checkout summary
  const checkoutItems = [
    {
      id: "traeger-pro-575",
      name: "Traeger Pro 575 Wood Pellet Grill",
      price: 899.99,
      quantity: 1,
    }
  ];

  const itemsSubtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const estimatedShipping = 0.00; // Free over $250
  const estimatedTax = itemsSubtotal * 0.07; // 7% standard mock tax rate
  const orderTotal = itemsSubtotal + estimatedShipping + estimatedTax;

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-12">
        {/* SECURE HEADER NOTE */}
        <div className="flex items-center gap-2 pb-6 border-b border-gray-200 mb-10">
          <Lock className="size-4 text-[#ff6b2b]" />
          <h1 className="font-serif text-2xl font-medium tracking-tight">Secure Checkout</h1>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded ml-auto flex items-center gap-1">
            <ShieldCheck className="size-3" /> SSL Encrypted
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT PANEL: SHIPPING & PAYMENT FORMS (8 Columns) */}
          <form onSubmit={(e) => e.preventDefault()} className="lg:col-span-7 space-y-8">
            
            {/* Section 1: Customer Info */}
            <div className="bg-white p-6 border border-gray-200/60 rounded">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a110e] mb-4">
                1. Customer Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  className="sm:col-span-2 w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                />
              </div>
            </div>

            {/* Section 2: Delivery Address */}
            <div className="bg-white p-6 border border-gray-200/60 rounded">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a110e] mb-4">
                2. Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  required
                  className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  required
                  className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                />
                <input 
                  type="text" 
                  placeholder="Street Address" 
                  required
                  className="sm:col-span-2 w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                />
                <input 
                  type="text" 
                  placeholder="City" 
                  required
                  className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="State" 
                    required
                    className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                  />
                  <input 
                    type="text" 
                    placeholder="ZIP Code" 
                    required
                    className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Payment Frame */}
            <div className="bg-white p-6 border border-gray-200/60 rounded">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a110e] mb-4 flex items-center gap-2">
                <CreditCard className="size-4 text-[#ff6b2b]" /> 3. Payment Method
              </h2>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Cardholder Name" 
                  required
                  className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                />
                <input 
                  type="text" 
                  placeholder="Card Number" 
                  required
                  className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="MM / YY" 
                    required
                    className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                  />
                  <input 
                    type="text" 
                    placeholder="CVV" 
                    required
                    className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                  />
                </div>
              </div>
            </div>

          </form>

          {/* RIGHT PANEL: ORDER SUMMARY LEDGER (5 Columns) */}
          <aside className="lg:col-span-5 bg-white border border-gray-200/60 p-6 rounded">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a110e] mb-4">
              Order Summary
            </h2>

            {/* Itemized Loop */}
            <div className="divide-y divide-gray-100 mb-6">
              {checkoutItems.map((item) => (
                <div key={item.id} className="py-3 flex justify-between items-start gap-4 text-xs">
                  <div className="font-medium text-gray-700">
                    {item.name} <span className="text-gray-400 font-bold">x{item.quantity}</span>
                  </div>
                  <div className="font-bold text-[#1a110e] shrink-0">
                    ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Blocks */}
            <div className="border-t border-gray-100 pt-4 space-y-2.5 text-xs text-gray-500 font-medium mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#1a110e]">${itemsSubtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-emerald-700 font-bold">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="text-[#1a110e]">${estimatedTax.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1a110e] pt-2 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-xl font-black text-[#ff6b2b]">
                  ${orderTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#ff6b2b] text-white text-xs font-bold uppercase tracking-widest py-4 rounded hover:bg-[#e05316] transition shadow-sm"
            >
              Authorize Order
            </button>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}