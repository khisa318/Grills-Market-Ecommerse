import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#1a110e]">
      <Navbar />

      {/* 1. MINIMAL HEADER STRIP */}
      <div className="bg-white text-left py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-[10px] font-normal tracking-[0.2em] text-gray-400 uppercase block mb-1">
            Get In Touch
          </span>
          <h1 className="text-3xl font-medium tracking-tight text-[#1a110e]">
            Contact Our Pitmasters
          </h1>
          <p className="text-sm font-normal text-gray-400 max-w-xl mt-2 leading-relaxed">
            Have questions about freight delivery, assembly specs, or choosing the right smoker? We are here to help.
          </p>
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN FORM & DETAIL LAYOUT */}
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT PANEL: BUSINESS CHANNELS (5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h2 className="text-xs font-medium uppercase tracking-wider text-[#1a110e] border-b border-gray-100 pb-3">
                Direct Support Channels
              </h2>

              <div className="flex gap-4 items-start text-sm">
                <Phone className="size-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#1a110e] mb-0.5">Call Support Line</h3>
                  <a href="tel:+15753002785" className="text-gray-400 hover:text-[#ff6b2b] font-normal transition-colors">
                    +1 (575) 300-2785
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start text-sm">
                <Mail className="size-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#1a110e] mb-0.5">Email Communications</h3>
                  <a href="mailto:hello@emberandiron.com" className="text-gray-400 hover:text-[#ff6b2b] font-normal transition-colors">
                    hello@emberandiron.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start text-sm">
                <MapPin className="size-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#1a110e] mb-0.5">Showroom Headquarters</h3>
                  <span className="text-gray-400 font-normal leading-relaxed block">
                    2155 NW Settle Ave,<br />
                    Port Saint Lucie, FL 34986, USA
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-start text-sm border-t border-gray-100 pt-6">
                <Clock className="size-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#1a110e] mb-0.5">Operating Hours</h3>
                  <span className="text-gray-400 font-normal block">Monday – Saturday</span>
                  <span className="text-gray-500 font-medium block mt-0.5">9:00 AM – 6:00 PM EST</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: CLEAN MODERN INQUIRY FORM (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 p-6 sm:p-8 rounded-none">
            <h2 className="text-xs font-medium uppercase tracking-wider text-[#1a110e] mb-6">
              Send an Electronic Inquiry
            </h2>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-normal uppercase text-gray-400 tracking-wider">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-gray-300 rounded-none py-2 px-3 text-sm font-normal text-[#1a110e] focus:outline-none focus:border-[#1a110e] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-normal uppercase text-gray-400 tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white border border-gray-300 rounded-none py-2 px-3 text-sm font-normal text-[#1a110e] focus:outline-none focus:border-[#1a110e] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-normal uppercase text-gray-400 tracking-wider">
                  Subject Heading
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-white border border-gray-300 rounded-none py-2 px-3 text-sm font-normal text-[#1a110e] focus:outline-none focus:border-[#1a110e] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-normal uppercase text-gray-400 tracking-wider">
                  Message Body
                </label>
                <textarea
                  rows="5"
                  required
                  className="w-full bg-white border border-gray-300 rounded-none py-2 px-3 text-sm font-normal text-[#1a110e] focus:outline-none focus:border-[#1a110e] transition-colors resize-none"
                  placeholder="Tell us what equipment or orders you're looking into..."
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#1a110e] text-white text-xs font-normal uppercase tracking-widest px-6 py-3 rounded-none hover:bg-[#ff6b2b] transition-colors duration-150"
                >
                  Submit Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}