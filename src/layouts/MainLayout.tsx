import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header/Header";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Header chỉ nằm ở đây */}
      <main className="flex-1">
        <Outlet /> {/* Render các page */}
      </main>
    </div>
  );
};

export default MainLayout;
