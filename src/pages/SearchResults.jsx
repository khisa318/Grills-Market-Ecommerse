import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { api } from "../data/api";
import { Search, Loader2 } from "lucide-react";

export default function SearchResults() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract query string parameter (?search=xyz)
  const searchParams = new URLSearchParams(location.search);
  const currentQuery = searchParams.get("search") || "";

  useEffect(() => {
    setLoading(true);
    api.getProducts({ search: currentQuery })
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Telemetry link failed during catalog search filter evaluation.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      {/* SEARCH BANNER */}
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
              {currentQuery ? (
                <>Showing matches for &ldquo;<span className="text-[#ff6b2b]">{currentQuery}</span>&rdquo;</>
              ) : (
                "Full Equipment Catalog Exploration"
              )}
            </h1>
          </div>
          {!loading && (
            <span className="text-xs text-gray-400 font-medium ml-auto hidden sm:inline">
              {products.length} models found
            </span>
          )}
        </div>
      </div>

      {/* DYNAMIC RESULTS DISPLAY CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            <Loader2 className="size-6 animate-spin text-[#ff6b2b]" />
            Sifting inventory nodes...
          </div>
        ) : error ? (
          <div className="text-center py-24 text-xs text-red-500 font-bold uppercase tracking-wider bg-white border border-gray-200 rounded p-6 max-w-md mx-auto">
            {error}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 p-16 text-center rounded max-w-md mx-auto shadow-sm">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">No Matching Equipment</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              We couldn't find any direct matches for "{currentQuery}". Try searching for broader parameters like "Grill", "Smoker", "Weber", or "Traeger".
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
