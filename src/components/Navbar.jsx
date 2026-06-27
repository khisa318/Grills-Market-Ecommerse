import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Search, User, Menu, X, Trash2, Plus, Minus } from "lucide-react";

export default function Navbar() {
  const { cart, cartCount, cartSubtotal, updateQuantity, removeFromCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#1a110e] text-white border-b border-white/5 font-sans">
        {/* UPPER ANNOUNCEMENT BAR */}
        <div className="bg-[#ff6b2b] text-[10px] uppercase font-black tracking-[0.2em] text-center py-1.5 px-4 text-[#1a110e]">
          Complimentary Lift-Gate Freight Protection For Premium Smoker Outfits
        </div>

        {/* PRIMARY MAIN NAVIGATION REGISTRATION ROW */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Brand Entry */}
          <Link to="/" className="font-serif text-lg md:text-xl tracking-tight font-black shrink-0 text-white hover:text-gray-200 transition">
            EMBER &amp; IRON
          </Link>

          {/* DESKTOP ROUTE PANEL LINKS */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-300">
            <Link to="/shop" className="hover:text-[#ff6b2b] transition">Shop Grills</Link>
            <Link to="/about" className="hover:text-[#ff6b2b] transition">Our Story</Link>
            <Link to="/contact" className="hover:text-[#ff6b2b] transition">Support</Link>
          </nav>

          {/* UTILITY CORE SEARCH BAR FORM */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center bg-white/5 border border-white/10 rounded px-2.5 py-1.5 w-64 max-w-sm">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs focus:outline-none w-full placeholder-gray-500 pr-2"
            />
            <button type="submit" className="text-gray-400 hover:text-white transition">
              <Search className="size-3.5" />
            </button>
          </form>

          {/* RIGHT CONTROLS REGISTRY BUTTONS */}
          <div className="flex items-center gap-4">
            <Link to="/account" className="hidden sm:inline-block text-gray-400 hover:text-white transition" title="My Pitmaster Account">
              <User className="size-4.5" />
            </Link>

            {/* Dynamic Basket Counter Controller Link Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1 text-gray-400 hover:text-white transition flex items-center gap-1.5"
            >
              <ShoppingBag className="size-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff6b2b] text-[#1a110e] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Navigation Expansion Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white transition"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU EXTENSION PANEL BLOCK */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#1a110e] px-4 py-4 space-y-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center bg-white/5 border border-white/10 rounded p-2">
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs focus:outline-none w-full placeholder-gray-500 text-white"
              />
              <button type="submit" className="text-gray-400">
                <Search className="size-4" />
              </button>
            </form>
            <nav className="flex flex-col gap-3 text-xs font-bold uppercase tracking-wider text-gray-300">
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ff6b2b]">Shop Grills</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ff6b2b]">Our Story</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ff6b2b]">Support</Link>
              <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#ff6b2b]">Sign In / Register</Link>
            </nav>
          </div>
        )}
      </header>

      {/* DYNAMIC CART SLIDE DRAWER COMPONENT INTERFACE */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Gray Backdrop Overlay Layer */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#fbf7f4] border-l border-gray-200 text-[#1a110e] flex flex-col shadow-2xl">
              
              {/* Header Drawer Strip */}
              <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="size-4 text-[#ff6b2b]" />
                  <h2 className="text-xs font-bold uppercase tracking-wider">Your Smoking Inventory</h2>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {cartCount}
                  </span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1 hover:text-red-500 transition">
                  <X className="size-4" />
                </button>
              </div>

              {/* Items List Content Scroll Frame */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                    <ShoppingBag className="size-8 stroke-1 text-gray-300 mb-2" />
                    <p className="text-xs font-bold uppercase tracking-wider mb-1">Inventory Empty</p>
                    <p className="text-[11px] max-w-[200px]">No backyard equipment has been staged for delivery yet.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200/80 rounded p-3 flex gap-3 shadow-sm relative group">
                      <div className="w-16 h-16 bg-[#fbf7f4] border border-gray-100 rounded flex items-center justify-center p-1 shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="max-h-full max-w-full object-contain rounded-sm" />
                      </div>
                      
                      <div className="flex-1 min-w-0 pr-6 space-y-1.5">
                        <div>
                          <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase block">{item.brand}</span>
                          <h4 className="text-xs font-bold text-[#1a110e] truncate leading-tight">{item.name}</h4>
                        </div>
                        
                        <div className="flex items-center justify-between gap-2">
                          {/* Inner Modifier Control Layout Slat */}
                          <div className="flex items-center border border-gray-200 rounded bg-[#fbf7f4]">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-[#ff6b2b] transition">
                              <Minus className="size-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-[#ff6b2b] transition">
                              <Plus className="size-3" />
                            </button>
                          </div>
                          
                          <span className="text-xs font-bold text-gray-700">
                            ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      {/* Remove Single Line Register Hook Trigger */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition"
                        title="Remove product line item"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Action Totals Summary Slat Section */}
              {cart.length > 0 && (
                <div className="bg-white border-t border-gray-200 p-4 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span>Staged Subtotal:</span>
                    <span className="text-sm font-serif font-black text-[#1a110e]">
                      ${cartSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-normal">
                    * Final freight tariffs, state sales taxation distributions, and insurance updates are updated during final invoicing.
                  </p>
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block text-center bg-[#1a110e] text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded hover:bg-[#ff6b2b] transition shadow-md"
                  >
                    Proceed To Secure Billing
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}