import React from "react";

export default function Footer() {
  const storePolicies = [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Returns & Refunds", href: "#returns" },
    { label: "Shipping Policy", href: "#shipping" },
    { label: "Billing Terms & Conditions", href: "#billing" },
  ];

  const customerCare = [
    { label: "About Us", href: "#about" },
    { label: "My Account", href: "#account" },
    { label: "Track Your Order", href: "#track" },
    { label: "FAQ", href: "#faq" },
  ];

  const productCategories = [
    { label: "Gas Grills", href: "#gas-grills" },
    { label: "Charcoal", href: "#charcoal" },
    { label: "Pellet Smokers", href: "#pellet-smokers" },
    { label: "Offset Smokers", href: "#offset-smokers" },
  ];

  return (
    <footer className="bg-[#120a07] text-[#fcf9f6]/80 font-sans">
      
      {/* 1. NEWSLETTER STRIP (Smoke Signals) */}
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-12 text-center border-b border-white/5">
        <h3 className="font-serif text-3xl md:text-4xl text-white font-medium tracking-tight mb-2">
          Smoke Signals
        </h3>
        <p className="text-xs md:text-sm text-gray-400 mb-6 max-w-md mx-auto">
          New US arrivals, pitmaster tips and members-only drops. No spam, just smoke.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full bg-[#1c120e] border border-gray-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff6b2b]"
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#ff6b2b] text-white font-bold text-xs tracking-wider uppercase px-6 py-3 rounded hover:bg-[#e05316] transition shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* 2. MAIN FOOTER CONTENT LINK GRID */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand block */}
          <div className="lg:col-span-1">
            {/* Logo Frame without emojis */}
            <div className="bg-white rounded-xl px-5 py-4 mb-5 flex items-center gap-2 w-fit">
              <div className="leading-none">
                <div className="font-black text-xl tracking-wider text-[#1a110e]">
                  EMBER<span className="text-[#ff6b2b]">&amp;</span>IRON
                </div>
                <div className="text-[8px] tracking-[0.25em] text-gray-400 font-bold">
                  PREMIUM BBQ CO.
                </div>
              </div>
            </div>
            
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 underline underline-offset-4 decoration-[#ff6b2b]/60">
              About Us
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              A family-owned US grill shop and authorized dealer for every brand we carry — run by people who actually cook on this gear.
            </p>
          </div>

          {/* Column 2: Store Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 underline underline-offset-4 decoration-[#ff6b2b]/60">
              Store Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {storePolicies.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#ff6b2b] transition">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 underline underline-offset-4 decoration-[#ff6b2b]/60">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {customerCare.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#ff6b2b] transition">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 underline underline-offset-4 decoration-[#ff6b2b]/60">
              Product Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {productCategories.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#ff6b2b] transition">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 underline underline-offset-4 decoration-[#ff6b2b]/60">
              Contact Info
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400">
              <li className="flex flex-col gap-0.5">
                <span className="text-white font-medium text-[11px] uppercase tracking-wider opacity-40">Address</span>
                <span>
                  2155 NW Settle Ave,<br />
                  Port Saint Lucie, FL 34986, USA
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-white font-medium text-[11px] uppercase tracking-wider opacity-40">Phone</span>
                <a href="tel:+15753002785" className="hover:text-[#ff6b2b] transition">+1 (575) 300-2785</a>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="text-white font-medium text-[11px] uppercase tracking-wider opacity-40">Email</span>
                <a href="mailto:hello@emberandiron.com" className="hover:text-[#ff6b2b] transition">hello@emberandiron.com</a>
              </li>
              <li className="text-[11px] text-gray-500 pt-1">
                Mon–Sat, 9:00 AM – 6:00 PM EST
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 3. SUB FOOTER RIGHTS BAR */}
      <div className="border-t border-white/5 bg-[#0b0604]">
        <div className="max-w-7xl mx-auto px-4 py-4 text-[11px] text-gray-500 flex flex-wrap items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Ember &amp; Iron BBQ Co. All rights reserved.</div>
          <div>United States · USD ($)</div>
        </div>
      </div>

    </footer>
  );
}