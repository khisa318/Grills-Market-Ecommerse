import React from "react";
import Navbar from "../componets/Navbar";
import ProductsList from "../componets/ProductsList";
import Footer from "../componets/Footer";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4]">
      {/* Global Navigation Header */}
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-[#120a07] text-white overflow-hidden min-h-[440px] flex items-center">
        {/* Subtle background overlay to create that dark moody atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120a07] via-[#120a07]/80 to-transparent z-10" />
        
        {/* Decorative subtle texture/gradient placeholder block simulating the grill image background */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#ff6b2b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 w-full relative z-20 py-20">
          <div className="max-w-xl">
            <span className="text-[#ff6b2b] text-[10px] font-bold tracking-[0.25em] uppercase block mb-3">
              Flagship Lineup
            </span>
            <h2 className="font-serif text-5xl md:text-6xl font-medium tracking-tight mb-4 leading-none">
              Pellet Smokers
            </h2>
            <p className="text-sm md:text-base text-gray-400 mb-8 leading-relaxed max-w-sm">
              Set-and-forget temperature control with real wood-fired flavor.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#ff6b2b] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded hover:bg-[#e05316] transition group">
              Shop Pellet Smokers
              <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN PRODUCTS LIST & SHOWCASE SECTION */}
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[#ff6b2b] text-[10px] font-bold tracking-[0.2em] uppercase block mb-1">
              Hand Picked
            </span>
            <h3 className="font-serif text-3xl font-medium text-[#1a110e] tracking-tight">
              Featured Products
            </h3>
          </div>
          <a href="#all-products" className="inline-flex items-center gap-1 text-xs font-bold text-[#1a110e] uppercase tracking-wider hover:text-[#ff6b2b] transition group">
            Shop all
            <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Dynamic product list renderer component loop */}
        <ProductsList />
      </main>

      {/* Global Newsletter & Links Footer */}
      <Footer />
    </div>
  );
}