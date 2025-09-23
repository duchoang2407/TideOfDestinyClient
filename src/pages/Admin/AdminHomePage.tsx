import React from "react";

import AdminDashboard from "./AdminDashBoard";

const AdminHomePage: React.FC = () => {
  return (
    <div className="min-h-screen w-full  flex flex-col">
      <AdminDashboard />
    </div>
  );
};

export default AdminHomePage;
