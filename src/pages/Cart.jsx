import React from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";

export default function Cart({ isOpen = true, onClose }) {
  // Mocking the Traeger Pro item exactly as seen in your basket screenshot
  const cartItems = [
    {
      id: "traeger-pro-575",
      brand: "TRAEGER",
      name: "Traeger Pro 575 Wood Pellet Grill",
      price: 899.99,
      quantity: 1,
      imageUrl: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&w=140&q=80"
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop overlay that darkens the underlying product grid */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl">
          
          {/* 1. BASKET HEADER BLOCK */}
          <div className="bg-[#120a07] text-white px-6 py-5 flex items-center justify-between">
            <h2 className="font-serif text-lg font-medium tracking-wide flex items-center gap-2">
              <span className="text-[#ff6b2b] font-sans">🛍️</span> Your Basket
            </h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition p-1"
              aria-label="Close cart"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* 2. ITEM CONTENT SCROLL AREA */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 items-start border-b border-gray-100 pb-6">
                
                {/* Product Thumbnail image frame */}
                <div className="size-20 bg-white border border-gray-200 rounded p-1 flex items-center justify-center shrink-0 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="object-contain max-h-full max-w-full"
                  />
                </div>

                {/* Meta details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 block uppercase mb-0.5">
                    {item.brand}
                  </span>
                  <h3 className="text-xs font-bold text-[#1a110e] leading-snug line-clamp-2 mb-3">
                    {item.name}
                  </h3>
                  
                  {/* Quantity adjustment controls footer row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center border border-gray-300 rounded bg-white">
                      <button className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 hover:text-[#1a110e] transition">
                        <Minus className="size-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#1a110e] select-none">
                        {item.quantity}
                      </span>
                      <button className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 hover:text-[#1a110e] transition">
                        <Plus className="size-3" />
                      </button>
                    </div>

                    <div className="text-sm font-bold text-[#1a110e]">
                      ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* Individual Item Trash/Removal shortcut */}
                <button 
                  className="text-gray-400 hover:text-[#ff6b2b] transition p-1 shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 className="size-4" />
                </button>

              </div>
            ))}
          </div>

          {/* 3. SUB-TOTAL & CHECKOUT ACTION SLAT */}
          <div className="border-t border-gray-200 p-6 bg-[#fbf7f4]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Subtotal</span>
              <span className="text-xl font-black text-[#1a110e]">
                ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            <p className="text-[11px] text-gray-400 mb-5">
              Shipping &amp; taxes calculated at checkout.
            </p>

            <div className="space-y-3 text-center">
              <button className="w-full bg-[#ff6b2b] text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded hover:bg-[#e05316] transition shadow-sm">
                Checkout
              </button>
              
              <button className="text-[11px] font-medium text-gray-400 hover:text-[#1a110e] transition underline underline-offset-2 block mx-auto">
                Clear basket
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}