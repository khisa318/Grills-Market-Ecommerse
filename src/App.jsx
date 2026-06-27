import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; 

// YOUR EXISTING STOREFRONT PAGES
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

// SECURITY DASHBOARD CORRIDORS
import AdminDashboard from "./pages/AdminDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import NotFoundPage from "./pages/NotFoundPage";

// IMPORT PROTECTION FILTERS
import { AdminProtectedRoute, CustomerProtectedRoute, PublicOnlyRoute } from "./components/ProtectedRoutes";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="selection:bg-[#ff6b2b]/20">
          <Routes>
            
            {/* PUBLIC OPEN STOREFRONT VIEWS */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/shop" element={<CategoryPage />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/track-order" element={<OrderTracking />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/search" element={<SearchResults />} />

            {/* GUEST ONLY ACCESS GATEWAY (Intercepts and runs role navigation checks) */}
            <Route element={<PublicOnlyRoute />}>
              <Route path="/account" element={<AuthPage />} />
            </Route>

            {/* SECURE CUSTOMER DOMAIN */}
            <Route element={<CustomerProtectedRoute />}>
              <Route path="/account/profile" element={<CustomerProfile />} />
            </Route>

            {/* SECURE ADMINISTRATIVE CONTROL PANEL */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            {/* ERROR CATCH-ALL */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}