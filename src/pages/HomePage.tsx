import React from "react";
import Footer from "../component/Footer/Footer";
import BG from "../assest/bg.png";
import epicgames from "../assest/epicgames.svg";
import steam from "../assest/steam.svg";
import bg2 from "../assest/bg2.png";
import bg3 from "../assest/bg3.png";
import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-gray-100 text-gray-900 flex flex-col overflow-hidden">
      {/* Subtle animated background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-green-900 via-green-700 to-green-900 opacity-20"
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <main className="flex-1">
        {/* Banner */}
        <section
          className="relative w-full h-[400px] flex items-center justify-center text-white"
          style={{
            backgroundImage: `url(${BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <motion.div
            className="relative max-w-5xl w-full flex items-center px-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-2/3 flex flex-col items-start space-y-4">
              <motion.h1
                className="text-2xl md:text-3xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Ra mắt trên các nền tảng
              </motion.h1>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button className="bg-[#2f301e] border-2 border-white px-4 py-2 rounded hover:bg-green-900 transition flex items-center gap-2">
                  Tải xuống PC
                </button>
                <button className="bg-[#2f301e] border-2 border-white px-4 py-2 rounded hover:bg-green-900 transition flex items-center gap-2">
                  <img src={epicgames} alt="Epic Games" className="w-5 h-5" />
                  <span>Epic</span>
                </button>
                <button className="bg-[#2f301e] border-2 border-white px-4 py-2 rounded hover:bg-green-900 transition flex items-center gap-2">
                  <img src={steam} alt="Steam" className="w-5 h-5" />
                  <span>Steam</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* About Us */}
        <section className="w-full flex flex-col md:flex-row items-center bg-[#2b2d1d] py-12">
          <motion.div
            className="md:w-1/2 px-10 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
            <p className="text-lg leading-relaxed">
              Chúng tôi là đội ngũ nhỏ mới được phát triển. Chúng tôi mong muốn
              trò chơi này có thể phổ biến được lịch sử Việt Nam đối với mọi
              người theo phương thức mới.
            </p>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-end mt-6 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src={bg2}
              alt="About Us"
              className="w-full h-80 object-cover rounded-lg"
            />
          </motion.div>
        </section>

        {/* Subscribe */}
        <section className="w-full text-white">
          <div
            className="w-full h-40 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg3})` }}
          ></div>

          <motion.div
            className="bg-[#2b2d1d] py-12 px-10 flex flex-col md:flex-row md:items-start md:justify-between"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="mb-4 md:mb-0 text-xl font-semibold">
              Theo dõi thông tin mới nhất
            </h3>

            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="email"
                  placeholder="Email:"
                  className="px-4 py-2 border border-gray-300 rounded text-black w-64"
                />
                <button className="bg-blue-600 px-6 py-2 text-white rounded hover:bg-blue-700">
                  Theo dõi ngay
                </button>
              </div>

              <p className="text-xs text-gray-300 text-left">
                ○ Đồng ý thu thập và sử dụng dữ liệu cá nhân để nhận lại mọi sự
                kiện và thông tin trò chơi.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
