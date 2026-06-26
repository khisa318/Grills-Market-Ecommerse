import React from "react";
import { Search, ShoppingCart, User, Flame, Phone, Truck } from "lucide-react";

export default function Navbar() {
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Gas Grills", href: "#gas-grills" },
    { label: "Charcoal", href: "#charcoal" },
    { label: "Pellet", href: "#pellet" },
    { label: "Smokers", href: "#smokers" },
    { label: "Kamado", href: "#kamado" },
    { label: "Accessories", href: "#accessories" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="w-full font-sans">
      
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#120a07] text-[#fcf9f6]/90 text-xs px-4 py-2 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Truck className="size-3.5 text-[#ff6b2b]" /> Free US delivery over $250
            </span>
            <a href="tel:+15753002785" className="inline-flex items-center gap-1.5 hover:text-[#ff6b2b] transition">
              <Phone className="size-3.5 text-[#ff6b2b]" /> +1 (575) 300-2785
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <span className="opacity-60 hidden md:inline">Ship to: United States (USD $)</span>
            <a href="#signin" className="hover:text-[#ff6b2b] transition">Sign In</a>
            <a href="#register" className="hover:text-[#ff6b2b] transition">Register</a>
          </div>
        </div>
      </div>

      {/* 2. MAIN LOGO & SEARCH AREA */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          
          {/* Brand Logo Container */}
          <a href="#" className="shrink-0">
            <div className="flex items-center gap-2 rounded border-2 border-[#1a110e] px-3 py-1 bg-white">
              <Flame className="size-5 text-[#ff6b2b] shrink-0" strokeWidth={2.5} />
              <div className="leading-none">
                <div className="font-black text-lg tracking-wider text-[#1a110e]">
                  EMBER<span className="text-[#ff6b2b]">&amp;</span>IRON
                </div>
                <div className="text-[8px] tracking-[0.22em] text-gray-400 font-bold">
                  PREMIUM BBQ CO.
                </div>
              </div>
            </div>
          </a>

          {/* Core Search Engine Bar */}
          <div className="flex-1 max-w-xl relative hidden md:block">
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <input
                type="text"
                placeholder="Search grills, smokers, accessories..."
                className="w-full h-10 bg-white border border-gray-300 rounded px-4 pr-12 text-sm focus:outline-none focus:border-[#ff6b2b] focus:ring-1 focus:ring-[#ff6b2b]"
              />
              <button 
                type="submit" 
                aria-label="Submit search"
                className="absolute right-1 top-1 h-8 w-9 rounded bg-[#ff6b2b] text-white flex items-center justify-center hover:bg-[#e05316] transition"
              >
                <Search className="size-4" />
              </button>
            </form>
          </div>

          {/* Profile & Cart Quick-links */}
          <div className="flex items-center gap-5 text-xs text-[#1a110e]">
            <a href="#account" className="flex items-center gap-2 group">
              <User className="size-5 text-gray-400 group-hover:text-[#ff6b2b] transition" />
              <div className="leading-tight hidden sm:block">
                <div className="text-gray-400 text-[10px]">Account</div>
                <div className="font-bold">Sign In</div>
              </div>
            </a>

            <button className="flex items-center gap-2 group text-left">
              <div className="relative">
                <ShoppingCart className="size-5 text-gray-400 group-hover:text-[#ff6b2b] transition" />
                <span className="absolute -top-1.5 -right-1.5 bg-[#ff6b2b] text-white text-[9px] font-bold rounded-full size-4 flex items-center justify-center">
                  0
                </span>
              </div>
              <div className="leading-tight hidden sm:block">
                <div className="text-gray-400 text-[10px]">Basket</div>
                <div className="font-bold">0 items</div>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* 3. CATEGORY LINKS ROW */}
      <div className="bg-[#1a110e] text-[#fcf9f6] text-xs font-bold tracking-wider uppercase border-b border-white/5 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar whitespace-nowrap">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              className={`px-4 py-3.5 hover:text-[#ff6b2b] transition-colors duration-150 relative ${
                idx === 0 ? "text-[#ff6b2b] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-[#ff6b2b]" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

    </nav>
  );
}