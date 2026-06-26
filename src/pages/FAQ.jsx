import React, { useState } from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "How does freight delivery work for large smokers?",
      a: "Heavy units (like offset setups or large pellet grills) arrive via premium lift-gate freight carriers. The carrier will call you directly to schedule a delivery window, and the driver will drop the palletized grill right onto your driveway."
    },
    {
      q: "Are you an authorized dealer for all brands?",
      a: "Yes, we are 100% authorized retail dealers for every manufacturer we host. Your factory warranties pass directly to your billing registration out of the box."
    },
    {
      q: "What is your return policy on unused equipment?",
      a: "We support a 30-day return window for unused items kept in original crate packaging. Get in touch with our pitmaster desk to arrange freight return shipping routing."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      <div className="bg-[#1a110e] text-white py-16 text-center border-b border-white/5">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#ff6b2b] uppercase block mb-2">Help Desk</span>
        <h1 className="font-serif text-4xl font-medium tracking-tight">Frequently Asked Questions</h1>
      </div>

      <main className="flex-1 max-w-3xl mx-auto px-4 w-full py-16">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="bg-white border border-gray-200/60 rounded overflow-hidden">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left text-xs font-bold uppercase tracking-wider flex justify-between items-center bg-[#fbf7f4]/40"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="size-4 text-[#ff6b2b]" /> {faq.q}
                  </span>
                  {isOpen ? <ChevronUp className="size-4 text-gray-400" /> : <ChevronDown className="size-4 text-gray-400" />}
                </button>
                {isOpen && (
                  <div className="p-5 text-sm text-gray-600 border-t border-gray-100 leading-relaxed bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}