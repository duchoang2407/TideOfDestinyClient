import React from "react";
import { Link } from "react-router-dom";

const AdminHeader: React.FC = () => {
  return (
    <header className="w-full h-12 bg-[#1e293b] text-white flex items-center justify-between px-6">
      <h1 className="font-bold">
        <Link to="/admin"> </Link>
      </h1>
      <div className="flex items-center gap-3">
        <span>Hello, Admin</span>
        <div className="w-8 h-8 rounded-full bg-white text-[#1e293b] flex items-center justify-center">
          👤
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
