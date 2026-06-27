import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerProfile from "./pages/CustomerProfile";
import { AdminProtectedRoute, CustomerProtectedRoute } from "./components/ProtectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes anyone can see */}
        <Route path="/shop" element={<CategoryPage />} />

        {/* Protected Customer Routes (Profile, Order History) */}
        <Route element={<CustomerProtectedRoute />}>
          <Route path="/account/profile" element={<CustomerProfile />} />
        </Route>

        {/* Protected Admin Routes (Products Management, Global Tracking) */}
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}