import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SideBar: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "🎮 Game Introduction", path: "/admin/game" },
    { label: "⚙ Update Information", path: "/admin/update" },
    { label: "⬆ Upload File Game", path: "/admin/upload" },
  ];

  const handleLogout = () => {
    setShowConfirm(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-white/90 backdrop-blur-sm border-r border-gray-200 shadow-md flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="text-center py-6 border-b border-gray-200">
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">
              Admin<span className="text-orange-500">Panel</span>
            </h1>
          </div>

          {/* Menu */}
          <ul className="flex-1 mt-6 space-y-2">
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.03 }}
                className={`flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition-all duration-300 
                  ${
                    hoveredIndex === index
                      ? "bg-orange-100 text-orange-600 shadow-sm"
                      : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                  }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <div className="p-5 border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
          >
            ⏻ Logout
          </motion.button>
        </div>
      </aside>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-80 text-center"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Confirm Logout
              </h2>
              <p className="text-gray-500 mb-6">
                Are you sure you want to log out?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideBar;
