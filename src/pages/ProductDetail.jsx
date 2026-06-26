import React, { useState } from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { Star, Shield, Truck, RefreshCw, Minus, Plus } from "lucide-react";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  // Focus product details matching your flagship lineup
  const product = {
    brand: "TRAEGER",
    name: "Traeger Pro 575 Wood Pellet Grill",
    price: 899.99,
    reviewCount: 124,
    description: "The world's best-selling pellet grill just got better. The Traeger Pro 575 redefines backyard cooking with the D2 direct drive powertrain for faster heating and ultra-precise smoke levels. Control your grill anytime, anywhere using WiFIRE technology via the Traeger app.",
    specs: [
      { label: "Cooking Capacity", value: "575 sq. in." },
      { label: "Temperature Range", value: "180°F to 500°F" },
      { label: "Connectivity", value: "WiFIRE Enabled" },
      { label: "Hopper Capacity", value: "18 lbs." },
      { label: "Fuel Source", value: "All-Natural Wood Pellets" },
      { label: "Warranty", value: "3-Year Limited" }
    ],
    imageUrl: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=600&q=80"
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: PRODUCT IMAGE WINDOW */}
          <div className="bg-white border border-gray-200/60 p-8 rounded flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="object-contain max-h-[400px] w-full"
            />
          </div>

          {/* RIGHT: PRODUCT INFO & PURCHASE CONTROLS */}
          <div className="flex flex-col">
            <span className="text-xs font-bold tracking-[0.2em] text-[#ff6b2b] uppercase mb-2">
              {product.brand}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-medium text-[#1a110e] leading-tight mb-3">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center text-[#ff6b2b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-medium">
                {product.reviewCount} customer reviews
              </span>
            </div>

            {/* Price Frame */}
            <div className="text-3xl font-bold text-[#1a110e] mb-6">
              ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>

            {/* Core Description Block */}
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity Selector and Add Button */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4 pb-8 border-b border-gray-200">
              <div className="flex items-center justify-between border border-gray-300 rounded bg-white h-12 px-2 sm:w-32">
                <button 
                  onClick={handleDecrement}
                  className="p-1 text-gray-500 hover:text-[#1a110e] transition"
                >
                  <Minus className="size-4" />
                </button>
                <span className="text-sm font-bold text-[#1a110e] w-8 text-center select-none">
                  {quantity}
                </span>
                <button 
                  onClick={handleIncrement}
                  className="p-1 text-gray-500 hover:text-[#1a110e] transition"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button className="flex-1 bg-[#ff6b2b] text-white text-xs font-bold uppercase tracking-wider h-12 px-8 rounded hover:bg-[#e05316] transition shadow-sm">
                Add to Basket
              </button>
            </div>

            {/* Trust Badges Slat */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-gray-200 text-xs text-gray-600">
              <div className="flex items-center gap-2.5">
                <Truck className="size-4 text-[#ff6b2b] shrink-0" />
                <span>Free Freight Delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="size-4 text-[#ff6b2b] shrink-0" />
                <span>Authorized Dealer</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RefreshCw className="size-4 text-[#ff6b2b] shrink-0" />
                <span>30-Day Hassle Returns</span>
              </div>
            </div>

            {/* Specifications List */}
            <div className="pt-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1a110e] mb-4">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between border-b border-gray-100 pb-2 text-xs">
                    <span className="text-gray-400 font-medium">{spec.label}</span>
                    <span className="text-[#1a110e] font-bold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}