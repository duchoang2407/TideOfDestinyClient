import React from "react";
import laptop from "../../assest/laptop.png";
import SideBar from "../../component/sidebar/Sidebar";

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex  flex-col min-h-screen bg-[#d9b778]">
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Main content */}
        <main className="flex items-center justify-center p-6 w-full">
          <div className="relative w-[1000px] h-[500px] rounded-lg overflow-hidden ">
            {/* Background Image */}
            <img
              src={laptop}
              alt="Laptop"
              className="w-full h-full object-cover"
            />

            {/* Overlay nhẹ để chữ nổi bật */}
            <div className="absolute inset-0"></div>

            {/* Text nằm trên ảnh */}
            <div className="absolute left-5 top-1/4 text-[#7d4b00]">
              <h2 className="text-4xl font-bold ">Admin page version 1.0</h2>
              <h1 className="text-5xl font-extrabold mt-5">WELCOME</h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
