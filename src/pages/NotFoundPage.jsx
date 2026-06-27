import React from "react";
import { Link } from "react-router-dom";
import { FlameKindling } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fbf7f4] font-sans text-[#1a110e] px-4">
      <div className="text-center max-w-md bg-white p-8 border border-gray-200/60 shadow-md rounded-sm flex flex-col items-center">
        
        {/* Burner Icon Frame */}
        <div className="p-4 bg-[#ff6b2b]/10 text-[#ff6b2b] rounded-full mb-6 animate-pulse">
          <FlameKindling className="size-12" />
        </div>

        {/* 404 Error Header */}
        <h1 className="font-serif text-6xl font-bold tracking-tight text-[#ff6b2b] mb-2">404</h1>
        <h2 className="font-serif text-xl font-medium mb-4">The Firebox is Cold</h2>
        
        {/* Description Copy */}
        <p className="text-xs text-gray-500 leading-relaxed mb-8">
          The coordinate matrix you entered doesn't map to an active grill layout or inventory stack. The fuel line might be disconnected, or the path was cleared away.
        </p>

        {/* Action Re-route Button */}
        <Link 
          to="/shop" 
          className="w-full bg-[#1a110e] text-white hover:bg-[#ff6b2b] text-xs font-bold uppercase tracking-wider py-3 rounded-sm transition text-center"
        >
          Return to Smokehouse Catalog
        </Link>
      </div>
    </div>
  );
}