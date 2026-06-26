import React, { useState } from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import ProductCard from "../componets/ProductCard";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

export default function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("Pellet Smokers");

  // Mock array representing catalog data filtered to current category view
  const categoryProducts = [
    {
      id: "traeger-pro-575",
      brand: "TRAEGER",
      name: "Traeger Pro 575 Wood Pellet Grill",
      price: 899.99,
      tag: "BEST SELLER",
      rating: 5,
      reviewCount: 124,
      description: "WiFIRE-enabled pellet smoker with D2 direct drive. Hits 500°F for searing and holds low and slow within ±5°F.",
      features: ["575 sq in", "180-500°F", "WiFIRE", "Hopper 18 lb", "Pellet"],
      imageUrl: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4]">
      <Navbar />

      {/* CATEGORY TITLE BANNER STRIP */}
      <div className="bg-[#1a110e] text-white py-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#ff6b2b] uppercase block mb-1">
            Browse Equipment
          </span>
          <h1 className="font-serif text-3xl font-medium tracking-tight">
            {selectedCategory}
          </h1>
        </div>
      </div>

      {/* MAIN VIEW CONTROLLER BODY */}
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LEFT: FILTER SIDEBAR COMPONENT PANEL */}
          <aside className="w-full lg:w-64 bg-white border border-gray-200/60 p-5 rounded shrink-0">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100 mb-5">
              <SlidersHorizontal className="size-4 text-[#ff6b2b]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1a110e]">
                Filter Catalog
              </h3>
            </div>

            {/* Filter Section: Brand */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-[#1a110e] uppercase mb-3 flex items-center justify-between">
                <span>Brand</span>
                <ChevronDown className="size-3 text-gray-400" />
              </h4>
              <div className="space-y-2 text-xs text-gray-600 font-medium">
                {["Weber", "Traeger", "Big Green Egg", "Oklahoma Joe's"].map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-[#ff6b2b]">
                    <input type="checkbox" className="accent-[#ff6b2b] rounded-sm" />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Section: Price Range */}
            <div>
              <h4 className="text-xs font-bold text-[#1a110e] uppercase mb-3 flex items-center justify-between">
                <span>Price Range</span>
                <ChevronDown className="size-3 text-gray-400" />
              </h4>
              <div className="space-y-2 text-xs text-gray-600 font-medium">
                {["Under $500", "$500 - $1,000", "Over $1,000"].map((range) => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer hover:text-[#ff6b2b]">
                    <input type="radio" name="price-range" className="accent-[#ff6b2b]" />
                    <span>{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT: LIVE DYNAMIC GRID LOOP */}
          <section className="flex-1 w-full">
            <div className="bg-white border border-gray-200/60 p-4 rounded mb-6 flex items-center justify-between text-xs text-gray-500">
              <div>Showing {categoryProducts.length} premium models</div>
              <div className="flex items-center gap-1.5 font-medium text-[#1a110e] cursor-pointer">
                <span>Sort by: Featured</span>
                <ChevronDown className="size-3.5 mt-0.5 text-gray-400" />
              </div>
            </div>

            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 p-12 text-center rounded">
                <p className="text-sm text-gray-400 font-medium">No items found matching your filters.</p>
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}