import React from "react";
import { motion } from "framer-motion";
import SideBar from "../../component/sidebar/Sidebar";
import laptop from "../../assest/laptop.png"; // ảnh nền

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#f4f4f4]">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center p-10 relative overflow-hidden">
        {/* Background Shape */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative bg-white shadow-2xl border-2 border-orange-300 rounded-[60px] overflow-hidden w-[1200px] h-[650px] flex flex-col md:flex-row"
        >
          {/* Left Text Section */}
          <div className="flex-1 p-16 flex flex-col justify-center z-10">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-extrabold text-gray-800 mb-6"
            >
              Welcome, Admin 👋
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 leading-relaxed text-xl max-w-lg"
            >
              Manage users, update content, and monitor system activity — all in
              one sleek, modern dashboard. Enjoy a clear, fast, and minimal
              interface that keeps your focus where it matters most.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-full shadow-lg transition"
            >
              Go to Dashboard
            </motion.button>
          </div>

          {/* Right Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 relative"
          >
            <img
              src={laptop}
              alt="Dashboard Illustration"
              className="w-full h-full object-cover grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-white/70 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* Decorative floating circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-10 right-10 w-52 h-52 bg-orange-300 rounded-full blur-2xl"
        ></motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
