import React from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { Package, Truck, Search } from "lucide-react";

export default function OrderTracking() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      {/* HERO HEADER */}
      <div className="bg-[#1a110e] text-white py-16 border-b border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#ff6b2b] uppercase block mb-2">
            Fulfillment Status
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Track Your Order
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Check the live shipment milestone metrics for your backyard gear and freight cargo instantly.
          </p>
        </div>
      </div>

      {/* LOOKUP PANEL CONTAINER */}
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-white border border-gray-200/60 rounded p-8 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-6">
            <div className="p-2 bg-[#ff6b2b]/10 text-[#ff6b2b] rounded-sm">
              <Package className="size-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1a110e] uppercase tracking-wider">
                Find Your Delivery
              </h2>
              <p className="text-[11px] text-gray-400">Enter your credentials below</p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                Order ID Number
              </label>
              <input
                type="text"
                required
                className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                placeholder="e.g. #EB-49102"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                Billing Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a110e] text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded hover:bg-[#ff6b2b] transition duration-150 flex items-center justify-center gap-2"
            >
              <Search className="size-4" /> Locate Shipment
            </button>
          </form>

          {/* DELIVER NOTE SLAT */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3 text-[11px] text-gray-500 leading-normal">
            <Truck className="size-4 text-[#ff6b2b] shrink-0 mt-0.5" />
            <p>
              Please note: Large structural pellet grills and smokers are dispatched via premium lift-gate freight carriers. Tracking keys update within 24 hours of leaving dock hubs.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}