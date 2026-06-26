import React from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      {/* HEADER HERO STRIP */}
      <div className="bg-[#1a110e] text-white py-16 border-b border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#ff6b2b] uppercase block mb-2">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Contact Our Pitmasters
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Have questions about freight delivery, assembly specs, or choosing the right smoker? We are here to help.
          </p>
        </div>
      </div>

      {/* MAIN TWO-COLUMN BODY INTERFACE */}
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: CORE BUSINESS CHANNELS (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 border border-gray-200/60 rounded space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a110e] border-b border-gray-100 pb-3">
                Direct Support Channels
              </h2>

              <div className="flex gap-4 items-start text-xs">
                <Phone className="size-4 text-[#ff6b2b] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-0.5">Call Support Line</h3>
                  <a href="tel:+15753002785" className="text-gray-600 hover:text-[#ff6b2b] font-medium transition">
                    +1 (575) 300-2785
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs">
                <Mail className="size-4 text-[#ff6b2b] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-0.5">Email Communications</h3>
                  <a href="mailto:hello@emberandiron.com" className="text-gray-600 hover:text-[#ff6b2b] font-medium transition">
                    hello@emberandiron.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs">
                <MapPin className="size-4 text-[#ff6b2b] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-0.5">Showroom Headquarters</h3>
                  <span className="text-gray-600 font-medium leading-relaxed">
                    2155 NW Settle Ave,<br />
                    Port Saint Lucie, FL 34986, USA
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-start text-xs border-t border-gray-100 pt-5">
                <Clock className="size-4 text-[#ff6b2b] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-0.5">Operating Hours</h3>
                  <span className="text-gray-500 font-medium block">Monday – Saturday</span>
                  <span className="text-gray-600 font-bold">9:00 AM – 6:00 PM EST</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: REACTION FORMS PLATFORM (7 Columns) */}
          <div className="lg:col-span-7 bg-white p-8 border border-gray-200/60 rounded">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1a110e] mb-6">
              Send an Electronic Inquiry
            </h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                  Subject Heading
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                  Message Body
                </label>
                <textarea
                  rows="5"
                  required
                  className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b] resize-none"
                  placeholder="Tell us what equipment or orders you're looking into..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#1a110e] text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded hover:bg-[#ff6b2b] transition"
              >
                Submit Message
              </button>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}