import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { api } from "../data/api"; // <-- Import your fresh api instance here

export default function CategoryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const selectedCategory = searchParams.get("category") || "";

  useEffect(() => {
    api.getCategories()
      .then((payload) => {
        setCategories(Array.isArray(payload?.categories) ? payload.categories : []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    api.getProducts(selectedCategory ? { category: selectedCategory } : {})
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not retrieve the inventory matrix.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    if (!category) {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="font-serif text-2xl font-medium tracking-tight">Premium Cookers Catalog</h1>
            <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">
              {products.length} Models Active
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange("")}
              className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider border rounded transition ${
                !selectedCategory
                  ? "bg-[#1a110e] text-white border-[#1a110e]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-[#ff6b2b] hover:text-[#ff6b2b]"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider border rounded transition ${
                  selectedCategory === category
                    ? "bg-[#ff6b2b] text-white border-[#ff6b2b]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#ff6b2b] hover:text-[#ff6b2b]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-10">
        {loading ? (
          <div className="text-center py-24 text-xs font-bold uppercase tracking-widest text-gray-400">
            Stoking the firebox (Loading)...
          </div>
        ) : error ? (
          <div className="text-center py-24 text-xs text-red-500 font-bold uppercase tracking-wider">
            {error}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-xs text-gray-400 font-bold uppercase tracking-widest">
            No products found in this category.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
