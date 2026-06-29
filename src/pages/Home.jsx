import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { api } from "../data/api";
import { ChevronRight, Loader2 } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getProducts()
      .then((data) => {
        setProducts(data || []);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not retrieve the inventory matrix.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Separate products out for the asymmetric layout grid
  const leftGridProducts = products.slice(0, 2);
  const bottomSpannerProduct = products[2];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#1a110e]">
      {/* Global Navigation Header */}
      <Navbar />

      {/* 1. CLEAN WHITE HERO LAYOUT SECTION */}
      <section className="w-full bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: HERO TEXT & DESCRIPTIONS (Spans 5 Columns) */}
          <div className="lg:col-span-5 space-y-6 pt-4">
            <span className="inline-block bg-white border border-gray-200 text-gray-400 text-xs uppercase tracking-wider px-3 py-1 font-normal rounded-xs">
              Curated Selection
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-[#1a110e] leading-tight">
              Discover What Defines Modern BBQ
            </h1>
            
            <p className="text-sm font-normal text-gray-400 max-w-md leading-relaxed">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Donec velit neque, auctor sit amet aliquam vel.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <Link to="/shop" className="bg-[#ff6b2b] text-white text-sm font-normal px-6 py-2.5 hover:bg-[#e25c20] transition">
                Browse Items
              </Link>
              <Link to="/shop" className="bg-white border border-gray-300 text-[#1a110e] text-sm font-normal px-5 py-2.5 hover:bg-gray-50 transition flex items-center gap-1.5">
                See All Categories <span className="text-xs">→</span>
              </Link>
            </div>

            {/* Trust Indicators Footnote Strip */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-8 border-t border-gray-100 text-xs font-normal text-gray-400">
              <div>Free Shipping</div>
              <div>Verified Quality</div>
              <div>Easy Returns</div>
              <div>24/7 Support</div>
            </div>
          </div>

          {/* RIGHT PANEL: INTERLOCKING PRODUCT GRID (Spans 7 Columns) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Loading state placeholders within the grid box frame */}
            {loading ? (
              <div className="sm:col-span-2 flex items-center justify-center py-24 text-gray-400">
                <Loader2 className="size-6 animate-spin text-[#ff6b2b] mr-2" />
                <span className="text-xs uppercase tracking-wider">Stoking firebox...</span>
              </div>
            ) : leftGridProducts.length === 0 ? (
              <div className="sm:col-span-2 text-center py-12 text-xs text-gray-400 uppercase tracking-widest">
                No items available.
              </div>
            ) : (
              <>
                {/* Top Matrix Rows (Two Side-by-Side Cards) */}
                {leftGridProducts.map((product, idx) => (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col justify-between group">
                    <div className="p-4 bg-gray-50/50 relative flex flex-col items-center justify-center min-h-[220px]">
                      <span className="absolute top-4 left-4 bg-white border border-gray-200 text-gray-400 text-[10px] uppercase font-normal px-2 py-0.5 rounded-xs">
                        {idx === 0 ? "Best Seller" : "Trending Now"}
                      </span>
                      <img 
                        src={product.image_url || product.imageUrl} 
                        alt={product.name} 
                        className="max-h-40 object-contain group-hover:scale-102 transition duration-300"
                      />
                    </div>
                    
                    <div className="p-4 border-t border-gray-100 bg-white space-y-1">
                      <h3 className="text-sm font-normal text-[#1a110e] truncate">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#1a110e]">
                          ${typeof product.price === 'number' ? product.price.toLocaleString(undefined, {minimumFractionDigits: 2}) : product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Bottom Spanning Card Frame Row */}
                {bottomSpannerProduct && (
                  <div className="sm:col-span-2 bg-white border border-gray-200 rounded-sm overflow-hidden grid grid-cols-1 sm:grid-cols-12 group">
                    <div className="sm:col-span-5 bg-gray-50/50 p-4 relative flex flex-col items-center justify-center min-h-[180px]">
                      <span className="absolute top-4 left-4 bg-white border border-gray-200 text-gray-400 text-[10px] uppercase font-normal px-2 py-0.5 rounded-xs">
                        Just Launched
                      </span>
                      <img 
                        src={bottomSpannerProduct.image_url || bottomSpannerProduct.imageUrl} 
                        alt={bottomSpannerProduct.name} 
                        className="max-h-36 object-contain group-hover:scale-102 transition duration-300"
                      />
                    </div>
                    
                    <div className="sm:col-span-7 p-5 flex flex-col justify-center space-y-2 border-t sm:border-t-0 sm:border-l border-gray-100">
                      <div className="space-y-1">
                        <h3 className="text-sm font-normal text-[#1a110e]">{bottomSpannerProduct.name}</h3>
                        <p className="text-xs font-normal text-gray-400 leading-relaxed line-clamp-2">
                          {bottomSpannerProduct.description || "Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus curabitur."}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-sm font-medium text-[#1a110e]">
                          ${typeof bottomSpannerProduct.price === 'number' ? bottomSpannerProduct.price.toLocaleString(undefined, {minimumFractionDigits: 2}) : bottomSpannerProduct.price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </section>

      {/* 2. LOWER COMPACT CORE PRODUCT GRID INVENTORY LIST */}
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-14">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-gray-400 text-[10px] font-normal tracking-[0.2em] uppercase block mb-1">
              Hand Picked
            </span>
            <h3 className="text-2xl font-medium text-[#1a110e] tracking-tight">
              Featured Products
            </h3>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-1 text-xs font-normal text-[#1a110e] uppercase tracking-wider hover:text-[#ff6b2b] transition group">
            Shop all
            <ChevronRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Conditional Rows */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2 text-gray-400">
            <Loader2 className="size-6 animate-spin text-[#ff6b2b]" />
            <span className="text-xs uppercase tracking-widest font-normal">Stoking...</span>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-xs text-red-500 font-normal uppercase tracking-wider">
            {error}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 text-xs uppercase tracking-widest py-12">No equipment outfits listed today.</p>
        ) : (
          /* Standard uniform product display grid row loop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(3, 9).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Global Newsletter & Links Footer */}
      <Footer />
    </div>
  );
}