import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const location = useLocation();

  // ✅ Get user from localStorage
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || "null");

  // ✅ If no user, redirect to correct login
  if (!loggedUser) {
    return (
      <Navigate
        to={role === "admin" ? "/admin-login" : "/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  // ✅ If role mismatch, block access
  if (loggedUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // ✅ Render child route
};

export default ProtectedRoute;
