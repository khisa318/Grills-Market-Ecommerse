import React from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import ProductCard from "../componets/ProductCard";
import { Search } from "lucide-react";

export default function SearchResults() {
  // Mock query search metric tracking data
  const currentQuery = "Traeger";
  
  const searchResultsProducts = [
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
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      {/* SEARCH BANNER UPDATE */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          <div className="p-2.5 bg-[#fbf7f4] border border-gray-200 rounded-sm text-gray-400">
            <Search className="size-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-0.5">
              Catalog Search Results
            </span>
            <h1 className="font-serif text-2xl font-medium">
              Showing matches for &ldquo;<span className="text-[#ff6b2b]">{currentQuery}</span>&rdquo;
            </h1>
          </div>
          <span className="text-xs text-gray-400 font-medium ml-auto hidden sm:inline">
            {searchResultsProducts.length} models found
          </span>
        </div>
      </div>

      {/* DYNAMIC RESULTS CONTROLLER GRID */}
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-12">
        {searchResultsProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResultsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 p-16 text-center rounded max-w-md mx-auto">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">No Matching Equipment</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              We couldn't find any direct matches for your query. Try searching for broader parameters like "Grill", "Smoker", "Weber", or "Charcoal".
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}