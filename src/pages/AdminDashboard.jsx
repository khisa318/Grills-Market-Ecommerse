import { useState, useEffect } from "react";
import { api } from "../data/api";
import { Flame, Users, CreditCard, ShoppingBag, Plus, Trash2 } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pull fresh data from backend on mount
    api.getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard engine initialization fault:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#fcf9f6] flex text-[#1a110e]">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-[#1a110e] text-white flex flex-col p-6 shrink-0">
        <div className="font-serif text-xl font-bold tracking-tight mb-10">
          PITMASTER<span className="text-[#ff6b2b]">HQ</span>
        </div>
        
        <nav className="flex flex-col gap-2 flex-1">
          <button 
            onClick={() => setActiveTab("products")}
            className={`w-full text-left px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition ${activeTab === "products" ? "bg-[#ff6b2b] text-white" : "text-gray-400 hover:bg-white/5"}`}
          >
            Manage Products
          </button>
          <button 
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition ${activeTab === "orders" ? "bg-[#ff6b2b] text-white" : "text-gray-400 hover:bg-white/5"}`}
          >
            Global Orders
          </button>
          <button 
            onClick={() => setActiveTab("users")}
            className={`w-full text-left px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition ${activeTab === "users" ? "bg-[#ff6b2b] text-white" : "text-gray-400 hover:bg-white/5"}`}
          >
            Registered Users
          </button>
        </nav>
        
        <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
          Operational Environment: 2026
        </div>
      </aside>

      {/* MAIN CONTENT SPACE */}
      <main className="flex-1 p-10 overflow-y-auto">
        
        {/* TOP HEADER STATUS ROW */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="font-serif text-3xl font-medium tracking-tight">Administrative Hub</h1>
            <p className="text-xs text-gray-500 mt-1">Real-time system matrix telemetry controls.</p>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-200">
            System Online
          </span>
        </header>

        {/* METRICS SCORECARD GRID */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 border border-gray-200/60 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Store Inventory</span>
              <h3 className="text-2xl font-bold mt-1">{loading ? "..." : products.length} Grills</h3>
            </div>
            <Flame className="text-[#ff6b2b] size-6 shrink-0" />
          </div>

          <div className="bg-white p-6 border border-gray-200/60 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Revenue</span>
              <h3 className="text-2xl font-bold mt-1">$4,946.00</h3>
            </div>
            <CreditCard className="text-gray-400 size-6 shrink-0" />
          </div>

          <div className="bg-white p-6 border border-gray-200/60 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">System Users</span>
              <h3 className="text-2xl font-bold mt-1">2 Accounts</h3>
            </div>
            <Users className="text-gray-400 size-6 shrink-0" />
          </div>

          <div className="bg-white p-6 border border-gray-200/60 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Open Manifests</span>
              <h3 className="text-2xl font-bold mt-1">1 Pending</h3>
            </div>
            <ShoppingBag className="text-gray-400 size-6 shrink-0" />
          </div>
        </section>

        {/* DYNAMIC MANAGEMENT TAB VIEWS */}
        {loading ? (
          <div className="text-center py-12 text-xs font-bold text-gray-400 uppercase tracking-widest">Gathering system variables...</div>
        ) : (
          <div className="bg-white border border-gray-200/60 shadow-sm rounded-sm overflow-hidden">
            
            {activeTab === "products" && (
              <div>
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="font-serif text-lg font-medium">Core Product Catalog Matrix</h2>
                  <button className="bg-[#1a110e] text-white hover:bg-[#ff6b2b] text-[10px] font-bold tracking-wider uppercase px-3 py-2 rounded-sm flex items-center gap-1.5 transition">
                    <Plus className="size-3.5" /> Inject New Grill
                  </button>
                </div>
                
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <tr>
                      <th className="p-4">Grill / Item Name</th>
                      <th className="p-4">Brand</th>
                      <th className="p-4">Category Tag</th>
                      <th className="p-4 text-right">Price Point</th>
                      <th className="p-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/60 transition">
                        <td className="p-4 font-medium text-[#1a110e] max-w-xs truncate">{product.name}</td>
                        <td className="p-4 text-gray-500">{product.brand}</td>
                        <td className="p-4">
                          <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                            {product.tag}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-gray-900">${product.price.toFixed(2)}</td>
                        <td className="p-4 text-center">
                          <button className="text-gray-400 hover:text-red-500 transition mx-auto block" title="Wipe item from inventory">
                            <Trash2 className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="p-8 text-center text-xs text-gray-400 font-bold uppercase tracking-widest py-20">
                Orders Data Streaming Pipeline Intact. No Active checkouts compiled.
              </div>
            )}

            {activeTab === "users" && (
              <div className="p-8 text-center text-xs text-gray-400 font-bold uppercase tracking-widest py-20">
                User Management Node Locked. 2 profiles active inside drills.db
              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}
