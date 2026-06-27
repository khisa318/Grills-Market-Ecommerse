import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// 1. Guard component just for the Admin Dashboard
export function AdminProtectedRoute() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  // If not logged in, or logged in but NOT an admin, block access!
  if (!user || !user.is_admin) {
    return <Navigate to="/shop" replace />;
  }
  
  return <Outlet />; // Allows entry to the dashboard layout
}

// 2. Guard component for standard customer tracking pages
export function CustomerProtectedRoute() {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}