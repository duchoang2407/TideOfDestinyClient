import React from "react";
import { toast } from "react-toastify";

import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: string; // "admin" | "player"
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role")?.toLowerCase();

  if (!token) {
    toast.warning("Bạn cần đăng nhập để tiếp tục!");
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role.toLowerCase()) {
    toast.error("Bạn không có quyền truy cập!");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
