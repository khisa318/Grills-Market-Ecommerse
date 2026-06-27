import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// === 1. GUEST-ONLY ROUTE GUARD ===
// Kicks logged-in users out of the authentication portal back to their dashboards
export function PublicOnlyRoute() {
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (userString && token) {
    try {
      const user = JSON.parse(userString);
      if (user.is_admin === true || user.is_admin === "true") {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        return <Navigate to="/account/profile" replace />;
      }
    } catch (e) {
      localStorage.clear();
    }
  }

  return <Outlet />;
}

// === 2. CUSTOMER PROTECTED ROUTE LAYER ===
export function CustomerProtectedRoute() {
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  
  if (!userString || !token) {
    return <Navigate to="/account" replace />;
  }

  try {
    return <Outlet />;
  } catch (e) {
    localStorage.clear();
    return <Navigate to="/account" replace />;
  }
}

// === 3. ADMIN PROTECTED ROUTE LAYER ===
export function AdminProtectedRoute() {
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!userString || !token) {
    return <Navigate to="/account" replace />;
  }

  try {
    const user = JSON.parse(userString);
    if (user && (user.is_admin === true || user.is_admin === "true")) {
      return <Outlet />;
    }
    return <Navigate to="/account/profile" replace />;
  } catch (e) {
    localStorage.clear();
    return <Navigate to="/account" replace />;
  }
}