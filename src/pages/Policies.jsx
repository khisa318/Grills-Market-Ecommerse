import React from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { Scale, FileText, ShieldAlert } from "lucide-react";

export default function Policies() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      {/* HEADER BANNER */}
      <div className="bg-[#1a110e] text-white py-16 text-center border-b border-white/5">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#ff6b2b] uppercase block mb-2">Legal Ledger</span>
        <h1 className="font-serif text-4xl font-medium tracking-tight">Store Policies &amp; Terms</h1>
      </div>

      {/* POLICY TEXT DETAILS */}
      <main className="flex-1 max-w-4xl mx-auto px-4 w-full py-16">
        <div className="bg-white border border-gray-200/60 rounded p-8 md:p-12 space-y-10 shadow-sm">
          
          {/* Section 1: Shipping and Freight */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a110e] flex items-center gap-2 border-b border-gray-100 pb-2">
              <Scale className="size-4 text-[#ff6b2b]" /> 1. Freight &amp; Delivery Policies
            </h2>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              All commercial-grade offset smokers and oversized pellet grills are shipped via standard freight services using lift-gate equipment. Delivery teams will provide curbside drop-offs only. Customers must ensure an accessible pathing area is cleared for delivery trucks.
            </p>
          </div>

          {/* Section 2: Returns & Cancellation */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a110e] flex items-center gap-2 border-b border-gray-100 pb-2">
              <FileText className="size-4 text-[#ff6b2b]" /> 2. Return Guidelines
            </h2>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              We offer a 30-day return window on completely unused equipment packed safely inside its original factory strapping. Return shipping freight fees are the responsibility of the buyer unless the item arrived damaged.
            </p>
          </div>

          {/* Section 3: Data Protection */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a110e] flex items-center gap-2 border-b border-gray-100 pb-2">
              <ShieldAlert className="size-4 text-[#ff6b2b]" /> 3. Privacy Assurance
            </h2>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              Your transactional data is handled securely via industry-standard SSL encryption pathways. We never lease or distribute user registration records or contact lists to external tracking companies.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}