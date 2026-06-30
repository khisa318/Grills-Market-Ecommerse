import { Navigate, Outlet } from "react-router-dom";

const getStoredSession = () => {
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("authToken") || localStorage.getItem("token");

  if (!userString || !token) {
    return { user: null, token: null };
  }

  try {
    return { user: JSON.parse(userString), token };
  } catch {
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { user: null, token: null };
  }
};

const isAdminUser = (user) => user?.is_admin === true || user?.is_admin === "true";

// === 1. GUEST-ONLY ROUTE GUARD ===
// Kicks logged-in users out of the authentication portal back to their dashboards
export function PublicOnlyRoute() {
  const { user, token } = getStoredSession();

  if (user && token) {
    return <Navigate to={isAdminUser(user) ? "/admin/dashboard" : "/account/profile"} replace />;
  }

  return <Outlet />;
}

// === 2. CUSTOMER PROTECTED ROUTE LAYER ===
export function CustomerProtectedRoute() {
  const { user, token } = getStoredSession();
  
  if (!user || !token) {
    return <Navigate to="/account" replace />;
  }

  return <Outlet />;
}

// === 3. ADMIN PROTECTED ROUTE LAYER ===
export function AdminProtectedRoute() {
  const { user, token } = getStoredSession();

  if (!user || !token) {
    return <Navigate to="/account" replace />;
  }

  if (isAdminUser(user)) {
    return <Outlet />;
  }

  return <Navigate to="/account/profile" replace />;
}
