// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (requiredRole) {
    if (Array.isArray(requiredRole)) {
      if (!requiredRole.includes(user.role)) {
        return <Navigate to="/dashboard" />;
      }
    } else if (user.role !== requiredRole) {
      return <Navigate to="/dashboard" />;
    }
  }

  return children;
};

export default PrivateRoute;
