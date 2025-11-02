import React from "react";

import { Navigate } from "react-router-dom";

// Giả lập auth (sau này thay bằng context hoặc redux)
const isAuthenticated = false;

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
