import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../data/api";
import { useCart } from "../context/CartContext";
import { Star, Shield, Truck, Flame, ArrowLeft, Plus, Minus } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams(); 
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.getProductBySlug(id)
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("We couldn't locate this piece of cooking equipment.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-xs font-bold uppercase tracking-widest text-gray-400">
          Reading firebox telemetry...
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <p className="text-sm font-bold text-red-500 uppercase tracking-wider mb-2">
            {error || "Product Not Found"}
          </p>
          <Link to="/shop" className="text-xs font-bold text-[#ff6b2b] uppercase tracking-widest flex items-center gap-1 hover:underline">
            <ArrowLeft className="size-3" /> Back to Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-8 md:py-12">
        {/* BREADCRUMB ANCHOR */}
        <div className="mb-6">
          <Link to="/shop" className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5 hover:text-[#1a110e] transition">
            <ArrowLeft className="size-3" /> Back to Premium Catalog
          </Link>
        </div>

        {/* TWO COLUMN GRID DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: HERO IMAGE STAGE (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-gray-200 rounded p-6 shadow-sm flex justify-center items-center">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="max-h-[480px] w-auto object-contain rounded"
            />
          </div>

          {/* RIGHT COLUMN: INTERACTIVE SPECS MATRIX (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {product.tag && (
                <span className="inline-block bg-[#ff6b2b]/10 text-[#ff6b2b] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded mb-2">
                  {product.tag}
                </span>
              )}
              <span className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block mb-1">
                {product.brand}
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-medium tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            {/* RATINGS STRIP */}
            <div className="flex items-center gap-4 text-xs border-b border-gray-100 pb-4">
              <div className="flex items-center gap-0.5 text-[#ff6b2b]">
                {[...Array(product.rating)].map((_, i) => (
                  <Star key={i} className="size-3.5 fill-current" />
                ))}
              </div>
              <span className="text-gray-4                                                                                                                                                                                  00 font-medium">({product.reviewCount} verified reviews)</span>
            </div>

            {/* PRICE BAR */}
            <div className="text-3xl font-serif font-medium text-[#1a110e]">
              ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>

            {/* DESCRIPTION EXCERPT */}
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* TECHNICAL COMPONENT FEATURE BADGES */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Engineered Specifications:
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {product.features && product.features.map((feature, i) => (
                  <span key={i} className="bg-white border border-gray-200 px-2.5 py-1 rounded text-xs text-gray-600 font-medium flex items-center gap-1 shadow-sm">
                    <Flame className="size-3 text-[#ff6b2b]" /> {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* INTERACTIVE ACTIONS LAYOUT PANEL */}
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:text-[#ff6b2b] transition"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#1a110e] select-none">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 hover:text-[#ff6b2b] transition"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>

                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-[#1a110e] text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded hover:bg-[#ff6b2b] transition shadow-md"
                >
                  Add To Smoking Inventory
                </button>
              </div>

              {/* FREIGHT TRUST SLATS */}
              <div className="bg-white border border-gray-200/60 rounded p-4 space-y-3 text-[11px] text-gray-500">
                <div className="flex gap-2.5 items-start">
                  <Truck className="size-4 text-[#ff6b2b] shrink-0 mt-0.5" />
                  <p><strong className="text-[#1a110e]">Insured Curbside Delivery:</strong> Out of dock within 48 hours. Lift-gate carrier coordinates direct drops.</p>
                </div>
                <div className="flex gap-2.5 items-start border-t border-gray-100 pt-3">
                  <Shield className="size-4 text-[#ff6b2b] shrink-0 mt-0.5" />
                  <p><strong className="text-[#1a110e]">Authorized Dealer Warranty:</strong> Direct structural assembly coverage passes straight to your household invoice tracking profile.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}