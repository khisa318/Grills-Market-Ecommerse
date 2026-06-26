import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import CheckOut from "./pages/CheckOut";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About";

export default function App() {
  // Simple layout tracking router state ('home', 'detail', 'category', 'checkout', 'auth', 'about')
  const [currentScreen, setCurrentScreen] = useState("home");

  // Quick listener to allow clicking your footer anchors (#about, #account, etc.) to jump screen states natively
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#about") setCurrentScreen("about");
      else if (hash === "#account" || hash === "#signin" || hash === "#register") setCurrentScreen("auth");
      else if (hash === "#checkout") setCurrentScreen("checkout");
      else if (hash.includes("grills") || hash.includes("smokers") || hash.includes("charcoal")) setCurrentScreen("category");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Structural dynamic view switcher matrix
  const renderCurrentPage = () => {
    switch (currentScreen) {
      case "home":
        return <Home />;
      case "detail":
        return <ProductDetail />;
      case "category":
        return <CategoryPage />;
      case "checkout":
        return <CheckOut />;
      case "auth":
        return <AuthPage />;
      case "about":
        return <About />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-[#ff6b2b]/20">
      
      {/* 🛠️ QUICK DEVELOPMENT DEV BAR - Allows you to manually click and hop between pages instantly */}
      <div className="fixed bottom-4 left-4 z-50 bg-[#1a110e] border border-white/10 px-3 py-2 rounded shadow-2xl flex items-center gap-2 text-[10px] text-white/70 font-sans tracking-wider uppercase font-bold">
        <span className="text-[#ff6b2b]">Dev Controls:</span>
        {["home", "detail", "category", "checkout", "auth", "about"].map((screen) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`px-2 py-1 rounded transition-colors ${
              currentScreen === screen ? "bg-[#ff6b2b] text-white" : "hover:bg-white/5 text-gray-400"
            }`}
          >
            {screen}
          </button>
        ))}
      </div>

      {/* Render the current tracked page component screen stack view */}
      {renderCurrentPage()}
      
    </div>
  );
}