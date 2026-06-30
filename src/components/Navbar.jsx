import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Search, User, Menu, X, Trash2, Plus, Minus } from "lucide-react";

export default function Navbar() {
  const { cart, cartCount, cartSubtotal, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();
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
      <header className="w-full bg-white font-sans  top-0 z-40 border-b border-gray-100">
        
        {/* 1. UPPER UTILITY STRIP */}
        <div className="bg-[#1a110e] text-gray-300 text-sm py-2.5">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-5">
              <span className="font-normal text-sm">Free US delivery over $250</span>
              <div className="w-[1px] h-3 bg-white/20" />
              <a href="tel:+15753002785" className="hover:text-white font-normal text-sm transition">
                +1 (575) 300-2785
              </a>
            </div>
            <div>
              <span className="font-normal text-sm">Ship to: United States (USD $)</span>
            </div>
          </div>
        </div>

        {/* 2. CORE WHITE BRAND HEADER ROW */}
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-8 bg-white">
          
          {/* Ember & Iron Brand Logo Box */}
          <Link to="/" className="shrink-0 block border border-[#1a110e] px-5 py-2 bg-white">
            <div className="flex flex-col text-center">
              <span className="font-bold text-2xl tracking-wide text-[#1a110e] leading-none">
                EMBER&amp;IRON
              </span>
              <span className="text-[10px] font-normal tracking-[0.25em] uppercase text-gray-400 mt-1.5 block leading-none">
                PREMIUM BBQ CO.
              </span>
            </div>
          </Link>

          {/* Centered Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="w-full relative flex items-center border border-gray-300 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search grills, smokers, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white py-2.5 pl-4 pr-14 text-base font-normal text-[#1a110e] placeholder-gray-400 focus:outline-none"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 bottom-0 bg-[#ff6b2b] text-white px-5 flex items-center justify-center hover:bg-[#e25c20] transition"
              >
                <Search className="size-5" />
              </button>
            </div>
          </form>

          {/* User & Cart Info Links */}
          <div className="flex items-center gap-6 shrink-0 text-[#1a110e]">
            <Link to="/account" className="flex items-center gap-2 hover:text-[#ff6b2b] transition官方">
              <User className="size-5.5" />
              <div className="hidden lg:flex flex-col text-left leading-tight">
                <span className="text-xs font-normal text-gray-450">Account</span>
                <span className="text-sm font-medium">Sign In</span>
              </div>
            </Link>

            {/* Shopping Basket Toggle Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 hover:text-[#ff6b2b] transition relative"
            >
              <div className="relative">
                <ShoppingBag className="size-5.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#ff6b2b] text-white text-[10px] font-medium w-4.5 h-4.5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-tight">
                <span className="text-xs font-normal text-gray-450">Basket</span>
                <span className="text-sm font-medium">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </div>
            </button>

            {/* Mobile Menu Expansion Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* 3. CORE DARK-BROWN CATEGORY LINKS BLOCK */}
        <div className="bg-[#1a110e] hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-8 text-sm font-medium uppercase tracking-wider text-white py-3.5">
              <Link to="/" className="text-[#ff6b2b]">Home</Link>
              <Link to="/shop?category=Pellet%20Grills" className="hover:text-[#ff6b2b] transition">Pellet Grills</Link>
              <Link to="/shop?category=Kamado%20Grills" className="hover:text-[#ff6b2b] transition">Kamado</Link>
              <Link to="/shop?category=Fuel" className="hover:text-[#ff6b2b] transition">Fuel</Link>
              <Link to="/shop" className="hover:text-[#ff6b2b] transition">All Products</Link>
              <Link to="/about" className="hover:text-[#ff6b2b] transition">About</Link>
              <Link to="/contact" className="hover:text-[#ff6b2b] transition">Contact</Link>
            </nav>
          </div>
        </div>

        {/* MOBILE OVERLAY NAVIGATION CONTAINER */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4 shadow-md">
            <form onSubmit={handleSearchSubmit} className="flex relative items-center border border-gray-300 rounded overflow-hidden">
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white py-2.5 pl-3 pr-14 text-base font-normal text-[#1a110e] placeholder-gray-400 focus:outline-none"
              />
              <button type="submit" className="absolute right-0 top-0 bottom-0 bg-[#ff6b2b] text-white px-4">
                <Search className="size-4" />
              </button>
            </form>
            <nav className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wider text-gray-700">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[#ff6b2b]">Home</Link>
              <Link to="/shop?category=Pellet%20Grills" onClick={() => setIsMobileMenuOpen(false)}>Pellet Grills</Link>
              <Link to="/shop?category=Kamado%20Grills" onClick={() => setIsMobileMenuOpen(false)}>Kamado</Link>
              <Link to="/shop?category=Fuel" onClick={() => setIsMobileMenuOpen(false)}>Fuel</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </nav>
          </div>
        )}
      </header>

      {/* CART SLIDE PANEL INTERFACE */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white border-l border-gray-200 text-[#1a110e] flex flex-col shadow-2xl">
              
              <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="size-5 text-[#ff6b2b]" />
                  <h2 className="text-sm font-medium uppercase tracking-wider">Your Smoking Inventory</h2>
                  <span className="text-xs font-normal px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                    {cartCount}
                  </span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-1 hover:text-red-500 transition">
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                    <ShoppingBag className="size-10 stroke-1 text-gray-300 mb-3" />
                    <p className="text-sm font-medium uppercase tracking-wider mb-1">Inventory Empty</p>
                    <p className="text-xs font-normal max-w-[220px]">No backyard equipment has been staged for delivery yet.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded p-3.5 flex gap-4 shadow-xs relative group">
                      <div className="w-16 h-16 bg-white border border-gray-100 rounded flex items-center justify-center p-1 shrink-0">
                        <img src={item.image_url || item.imageUrl} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      
                      <div className="flex-1 min-w-0 pr-6 space-y-2">
                        <div>
                          <span className="text-[10px] font-normal text-gray-400 tracking-wider uppercase block">{item.brand}</span>
                          <h4 className="text-sm font-normal text-[#1a110e] truncate leading-tight">{item.name}</h4>
                        </div>
                        
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center border border-gray-200 rounded bg-gray-50">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:text-[#ff6b2b] transition">
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:text-[#ff6b2b] transition">
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          
                          <span className="text-sm font-medium text-gray-800">
                            ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-3.5 right-3.5 text-gray-300 hover:text-red-500 transition"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="bg-white border-t border-gray-200 p-5 space-y-4">
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider">
                    <span>Staged Subtotal:</span>
                    <span className="text-base font-medium text-[#1a110e]">
                      ${cartSubtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="block text-center bg-[#1a110e] hover:bg-[#ff6b2b] text-white text-sm font-medium uppercase tracking-widest py-4 rounded transition shadow-md"
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
