import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard"; // <-- Import the card directly
import { api } from "../data/api"; // <-- Using your working api instance
import { ChevronRight, Loader2 } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Matches your CategoryPage data fetch exactly
    api.getProducts()
      .then((data) => {
        setProducts(data || []);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not retrieve the inventory matrix.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      {/* Global Navigation Header */}
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <section className="relative bg-[#120a07] text-white overflow-hidden min-h-[440px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#120a07] via-[#120a07]/80 to-transparent z-10" />
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
            <Link to="/shop" className="inline-flex items-center gap-2 bg-[#ff6b2b] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded hover:bg-[#e05316] transition group">
              Shop Pellet Smokers
              <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. MAIN PRODUCTS SHOWCASE SECTION */}
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
          <Link to="/shop" className="inline-flex items-center gap-1 text-xs font-bold text-[#1a110e] uppercase tracking-wider hover:text-[#ff6b2b] transition group">
            Shop all
            <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3. CONDITIONAL LOADING/ERROR/DATA STREAM */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
            <Loader2 className="size-7 animate-spin text-[#ff6b2b]" />
            <span className="text-xs uppercase tracking-widest font-bold">Stoking the firebox...</span>
          </div>
        ) : error ? (
          <div className="text-center py-24 text-xs text-red-500 font-bold uppercase tracking-wider">
            {error}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 text-xs uppercase tracking-widest py-12">No cooking rigs listed today.</p>
        ) : (
          /* Inline rendering grid using the 3-column layout suited for Home features */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => ( // .slice(0, 6) limits it to top 6 items for a clean home grid
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Global Newsletter & Links Footer */}
      <Footer />
    </div>
  );
}