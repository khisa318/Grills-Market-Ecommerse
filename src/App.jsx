import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // <-- Import Provider
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import CheckOut from "./pages/CheckOut";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OrderTracking from "./pages/OrderTracking";
import FAQ from "./pages/FAQ";
import Policies from "./pages/Policies";
import SearchResults from "./pages/SearchResults";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="selection:bg-[#ff6b2b]/20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/shop" element={<CategoryPage />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/account" element={<AuthPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track-order" element={<OrderTracking />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}