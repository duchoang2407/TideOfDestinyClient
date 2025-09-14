import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: string; // "admin" | "player"
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role")?.toLowerCase();

  // Nếu chưa login thì về /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Nếu có yêu cầu role nhưng không đúng thì về trang chủ
  if (role && userRole !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
