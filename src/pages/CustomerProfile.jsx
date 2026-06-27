import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { User, Package, CreditCard, Truck, Calendar } from "lucide-react";

export default function CustomerProfile() {
  // Grab the logged-in session data
  const sessionUser = JSON.parse(localStorage.getItem("user")) || { email: "cooker@gmail.com" };
  
  // Hardcoded mockup transaction matching your database's standard default state output
  const [mockOrders, setMockOrders] = useState([
    {
      id: "EMI-98402-TX",
      date: "June 27, 2026",
      item: "Weber Searwood 600 Smart Pellet Grill",
      total: 899.00,
      status: "In Transit", 
      shippingAddress: "123 Pitmaster Way, Austin TX"
    }
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">
        
        {/* WELCOME BANNER HEADLINE */}
        <div className="mb-10 pb-4 border-b border-gray-200 flex items-center gap-4">
          <div className="p-3 bg-[#ff6b2b]/10 text-[#ff6b2b] rounded-full">
            <User className="size-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-medium tracking-tight">Welcome Back, Chef</h1>
            <p className="text-xs text-gray-400 mt-0.5">Manage your back-patio smoke profile settings.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* LEFT SIDEBAR COLUMN: ACCOUNT PROFILE SNAPSHOT */}
          <section className="bg-white p-6 border border-gray-200/60 shadow-sm rounded-sm h-fit">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 pb-2 border-b border-gray-100">
              Profile Matrix
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Registered Email</label>
                <span className="text-sm font-medium text-[#1a110e] break-all">{sessionUser.email}</span>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Account Type</label>
                <span className="text-xs font-bold text-[#ff6b2b] uppercase bg-[#ff6b2b]/10 px-2 py-0.5 rounded-sm inline-block mt-0.5">
                  Backyard Griller
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT MAIN COLUMN: ORDER SHIPMENT TRACKING MATRIX */}
          <section className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-white p-6 border border-gray-200/60 shadow-sm rounded-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Package className="size-4 text-gray-400" /> Manifest & Order History
              </h3>

              {mockOrders.length === 0 ? (
                <div className="text-center py-12 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  No smoke hardware orders recorded yet.
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-gray-100 rounded-sm overflow-hidden">
                      
                      {/* ORDER SUITE METADATA SUMMARY BAR */}
                      <div className="bg-gray-50/70 px-4 py-3 border-b border-gray-100 flex flex-wrap gap-4 justify-between items-center text-xs">
                        <div className="flex gap-4 text-gray-500">
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-gray-400">Date Staged</span>
                            <span className="font-medium flex items-center gap-1 mt-0.5"><Calendar className="size-3" /> {order.date}</span>
                          </div>
                          <div>
                            <span className="block text-[10px] uppercase font-bold text-gray-400">Invoice ID</span>
                            <span className="font-mono text-gray-700 mt-0.5 block">{order.id}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] uppercase font-bold text-gray-400">Total Charge</span>
                          <span className="font-bold text-[#1a110e]">${order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* ORDER DETAILS AND SHIPPING LIVE TICKER TIMELINE */}
                      <div className="p-4 flex flex-col sm:flex-row justify-between gap-4 bg-white items-start sm:items-center">
                        <div className="max-w-sm">
                          <h4 className="font-medium text-sm text-[#1a110e]">{order.item}</h4>
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <Truck className="size-3.5" /> Destination: {order.shippingAddress}
                          </p>
                        </div>

                        {/* STATUS BADGE TIMELINE HOOK */}
                        <div>
                          <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full animate-pulse">
                            {order.status}
                          </span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}