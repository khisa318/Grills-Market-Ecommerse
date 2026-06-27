import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { api } from "../data/api"; // <-- Import your fresh api instance here
import { SlidersHorizontal, Grid, List } from "lucide-react";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call the Flask server on mount
    api.getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not retrieve the inventory matrix.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="font-serif text-2xl font-medium tracking-tight">Premium Cookers Catalog</h1>
          <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">
            {products.length} Models Active
          </span>
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}