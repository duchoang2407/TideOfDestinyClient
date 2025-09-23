import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SideBar: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "🎮 Game introduction", path: "/admin/game" },
    { label: "⚙ Update information", path: "/admin/update" },
  ];

  const handleLogout = () => {
    setShowConfirm(false);
    // 👉 Xóa token & quay về login
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="w-150  box-border bg-[#d9b778] text-black flex flex-col p-4 border-r-2 border-black">
        <ul className="flex-1 space-y-2 mt-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap
          ${
            hoveredIndex === index
              ? "bg-white/40 text-red-600"
              : "hover:bg-white/30 hover:text-red-600"
          }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Log out */}
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 transition hover:bg-white/40 whitespace-nowrap"
        >
          ⏻ LOG OUT
        </button>
      </aside>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
