import React, { useState } from "react";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";
import { LogIn, UserPlus } from "lucide-react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login"); // "login" or "register"

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf7f4] font-sans text-[#1a110e]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md bg-white border border-gray-200/60 rounded shadow-sm overflow-hidden">
          
          {/* TAB HEADERS CONTROLLER */}
          <div className="flex border-b border-gray-100 bg-[#fbf7f4]">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === "login"
                  ? "bg-white border-[#ff6b2b] text-[#1a110e]"
                  : "border-transparent text-gray-400 hover:text-[#1a110e]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === "register"
                  ? "bg-white border-[#ff6b2b] text-[#1a110e]"
                  : "border-transparent text-gray-400 hover:text-[#1a110e]"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* FORM CONTAINER PANEL */}
          <div className="p-8">
            {activeTab === "login" ? (
              /* SIGN IN FORM */
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider">
                      Password
                    </label>
                    <a href="#forgot" className="text-[11px] text-[#ff6b2b] hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <input
                    type="password"
                    required
                    className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1a110e] text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded hover:bg-[#ff6b2b] transition duration-150 flex items-center justify-center gap-2 mt-2"
                >
                  <LogIn className="size-4" /> Sign In
                </button>
              </form>
            ) : (
              /* ACCOUNT REGISTRATION FORM */
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full bg-[#fbf7f4] border border-gray-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#ff6b2b]"
                    placeholder="Minimum 8 characters"
                  />
                </div>

                <p className="text-[10px] text-gray-400 leading-normal">
                  By registering, you agree to our Terms of Service and Privacy Policies.
                </p>

                <button
                  type="submit"
                  className="w-full bg-[#ff6b2b] text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded hover:bg-[#e05316] transition duration-150 flex items-center justify-center gap-2 mt-2"
                >
                  <UserPlus className="size-4" /> Create Account
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}