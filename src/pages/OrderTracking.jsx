import React, { useState } from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { ShieldAlert, Package, Truck, CheckCircle2, Search, Sliders } from "lucide-react";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [searchedId, setSearchedId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsSearching(true);
    setSearchedId(orderId.trim());

    // Simulate real-time tracking registry lookup delay
    setTimeout(() => {
      setIsSearching(false);
      setOrderData({
        id: orderId.trim().toUpperCase(),
        status: "In Transit",
        carrier: "Ember Logistical Freight Services",
        eta: "3-4 Business Days",
        steps: [
          { label: "Invoice Validated & Cleared", date: "June 25, 2026", done: true },
          { label: "Secured to Heavy Lift Freight Skid", date: "June 26, 2026", done: true },
          { label: "Departed Primary Texas Distribution Dock", date: "June 27, 2026", done: true },
          { label: "Outbound Regional Line-Haul Routing", date: "Pending", done: false }
        ]
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 w-full py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#ff6b2b] uppercase block mb-2">Logistics Control Tower</span>
          <h1 className="font-serif text-3xl font-medium tracking-tight">Freight Shipment Telemetry</h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Enter your active invoice tracking hash below to verify scheduling status parameters, carrier paths, and gate drop coordinates.
          </p>
        </div>

        {/* INPUT INPUT CONTROLLER CONSOLE */}
        <div className="bg-white border border-gray-200 rounded p-6 shadow-sm mb-8">
          <form onSubmit={handleTrackSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 size-4 text-gray-400" />
              <input
                type="text"
                required
                placeholder="e.g. EMI-77492-TX"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full bg-[#fbf7f4] border border-gray-200 pl-10 pr-4 py-2.5 text-xs rounded focus:outline-none focus:border-[#ff6b2b] uppercase font-mono tracking-wider text-gray-800"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="bg-[#1a110e] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded hover:bg-[#ff6b2b] transition disabled:bg-gray-400 shrink-0"
            >
              {isSearching ? "Pinging..." : "Track"}
            </button>
          </form>
        </div>

        {/* SHIPMENT METRICS FEEDBACK BOX */}
        {orderData ? (
          <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden animate-fadeIn">
            {/* Top Indicator Header Strip */}
            <div className="bg-[#1a110e] text-white p-4 flex flex-wrap justify-between items-center gap-2 border-b border-white/5">
              <div>
                <span className="text-[9px] font-bold tracking-wider text-gray-400 block uppercase">Manifest ID</span>
                <span className="text-xs font-mono font-bold text-[#ff6b2b]">{orderData.id}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold tracking-wider text-gray-400 block uppercase">Estimated Delivery Window</span>
                <span className="text-xs font-bold">{orderData.eta}</span>
              </div>
            </div>

            {/* Step-by-Step Logistics Track Timeline */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="relative border-l-2 border-gray-200 pl-6 ml-3 space-y-8">
                {orderData.steps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Floating Step Dot Circle */}
                    <span className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${step.done ? "border-[#ff6b2b]" : "border-gray-200"}`}>
                      {step.done && <div className="w-1.5 h-1.5 bg-[#ff6b2b] rounded-full" />}
                    </span>
                    <div>
                      <h4 className={`text-xs font-bold ${step.done ? "text-[#1a110e]" : "text-gray-400"}`}>
                        {step.label}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-medium block mt-0.5">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lift-Gate Instruction Warning Alert Bar */}
              <div className="bg-[#fbf7f4] border border-gray-200 p-4 rounded flex gap-3 text-[11px] text-gray-500 leading-normal mt-4">
                <Truck className="size-4 text-[#ff6b2b] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#1a110e]">Logistics Warning Notification:</strong> Freight items weigh in excess of 200 lbs. Ensure clear path access grids are fully prepared ahead of arrival.
                </p>
              </div>
            </div>
          </div>
        ) : (
          searchedId === "" && (
            <div className="border border-dashed border-gray-300 p-12 text-center rounded text-gray-400 text-xs font-medium">
              Awaiting tracker synchronization input.
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}