import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRoutProps {
  requiredRole?: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRoutProps> = ({ requiredRole }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    console.warn(`User with role '${user?.role}' attempted to access role-restricted content.`);
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Outlet />
};

export default ProtectedRoute;
