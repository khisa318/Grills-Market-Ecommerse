import React from "react";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  const {
    name,
    brand,
    price,
    tag,
    rating,
    reviewCount,
    description,
    features,
    imageUrl,
  } = product;

  return (
    <div className="bg-white border border-gray-200/60 flex flex-col h-full relative group hover:shadow-md transition-shadow duration-200">
      
      {/* 1. TOP METADATA BADGE TAG */}
      {tag && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#ff6b2b] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm">
            {tag}
          </span>
        </div>
      )}

      {/* 2. PRODUCT IMAGE FRAME */}
      <div className="p-6 bg-white flex items-center justify-center min-h-[240px] max-h-[240px] overflow-hidden border-b border-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="object-contain max-h-[200px] w-full transform group-hover:scale-102 transition-transform duration-200"
        />
      </div>

      {/* 3. CARD BODY DETAILS */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        
        {/* Brand Header */}
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 block mb-1">
          {brand}
        </span>

        {/* Product Title */}
        <h4 className="font-serif text-lg font-medium text-[#1a110e] leading-tight mb-2 min-h-[44px] line-clamp-2">
          {name}
        </h4>

        {/* Five Star Rating Row */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5 text-[#ff6b2b]">
            {[...Array(5)].map((_, idx) => (
              <Star
                key={idx}
                className="size-3.5 fill-current"
                strokeWidth={0}
              />
            ))}
          </div>
          <span className="text-gray-400 text-[11px] font-medium font-sans">
            ({reviewCount})
          </span>
        </div>

        {/* Short Marketing Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3 min-h-[54px]">
          {description}
        </p>

        {/* Technical Data Columns Grid Layout */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] text-gray-600 font-medium border-t border-gray-100 pt-4 mb-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-1.5 truncate">
              <span className="size-1 bg-[#ff6b2b] rounded-full shrink-0" />
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>

        {/* 4. PRICE & ACTION FOOTER ROW */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="text-xl font-bold text-[#1a110e]">
            ${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          
          <button className="bg-[#1a110e] text-white hover:bg-[#ff6b2b] text-[11px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-sm transition flex items-center gap-1 shrink-0">
            <span>+</span>
            <span>ADD</span>
          </button>
        </div>

      </div>

    </div>
  );
}