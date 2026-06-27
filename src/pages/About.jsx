import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      {/* BRAND MANIFESTO HERO STRIP */}
      <div className="bg-[#1a110e] text-white py-16 border-b border-white/5 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#ff6b2b] uppercase block mb-2">
            Our Manifesto
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-4">
            For the Love of Smoke &amp; Iron
          </h1>
          <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            We aren't a massive department store box-mover. We live, breath, and cook on the very gear we sell.
          </p>
        </div>
      </div>

      {/* CORE CONTENT SEGMENT */}
      <main className="flex-1 max-w-4xl mx-auto px-4 w-full py-16 space-y-12">
        
        {/* Pitch Statement */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-medium">The Pitmaster Guarantee</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Ember &amp; Iron was founded in Florida out of a simple frustration: finding premium backyard cooking setups from people who actually know how to maintain a fire box. Every single brand on our site—from heavy structural offset steel chambers to elite WiFi dynamic pellet controllers—is verified and sourced direct.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            As authorized retail dealers, we support the factory parts arrays, direct warranty allocations, and freight updates without middlemen interference.
          </p>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 border border-gray-200/60 rounded">
            <ShieldCheck className="size-6 text-[#ff6b2b] mb-3" />
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1">100% Authorized</h3>
            <p className="text-xs text-gray-500 leading-relaxed"> Full maker warranties pass straight to your home order register setup.</p>
          </div>

          <div className="bg-white p-6 border border-gray-200/60 rounded">
            <Award className="size-6 text-[#ff6b2b] mb-3" />
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1">Elite Curation</h3>
            <p className="text-xs text-gray-500 leading-relaxed">We bypass thin metals. If a cooker doesn't seal heat reliably, we drop it.</p>
          </div>

          <div className="bg-white p-6 border border-gray-200/60 rounded">
            <Users className="size-6 text-[#ff6b2b] mb-3" />
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1">Pitmaster Support</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Call or text real experts ready to talk air draft flow modifications anytime.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}