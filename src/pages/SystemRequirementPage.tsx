import React from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "../component/config/axiosConfig";

const SystemRequirementPage: React.FC = () => {
  const navigate = useNavigate();

  const handleDownloadClick = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Bạn cần đăng nhập để tải game.");
        navigate("/login");
        return;
      }

      const res = await axiosInstance.get("/payment/purchase-status");
      const hasPurchased = res.data?.hasPurchased ?? res.data?.HasPurchased;

      if (!hasPurchased) {
        toast.warning("Bạn chưa mua game. Mua ngay để tải!");
        setTimeout(() => {
          navigate("/purchase");
        }, 2500);
        return;
      }

      const url = "https://localhost:44333/api/Download/donwload-lastest-file";
      const response = await fetch(url);

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "TideOfDestiny.zip";
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      alert("Không thể tải game. Vui lòng thử lại!");
    }
  };

  const data = [
    { category: "OS", min: "Windows 10 (64-bit)", rec: "Windows 11 (64-bit)" },
    {
      category: "Processor",
      min: "AMD Athlon64 3000+ / Intel Pentium IV 630",
      rec: "AMD Ryzen 3 / Intel Core i3 (4th Gen)+",
    },
    { category: "RAM", min: "2 GB", rec: "8 GB" },
    {
      category: "Video Card",
      min: "NVIDIA GeForce 9800 GT / AMD Radeon HD 2900 XT",
      rec: "NVIDIA GTX 960 / AMD RX 460 or higher",
    },
    { category: "DirectX", min: "Version 11", rec: "Version 12" },
    { category: "Storage", min: "2 GB available", rec: "4 GB SSD recommended" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden font-['Cinzel',serif] pt-28 pb-32">
      {/* 🌌 Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0d0d0d] via-[#1c1c1c] to-[#0b0b0b]" />

      {/* ✨ Light effect */}
      <motion.div
        className="absolute w-[180%] h-[180%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,220,140,0.04),transparent_70%)] blur-2xl opacity-50"
        animate={{ rotate: 360 }}
        transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      />

      {/* 🟡 Download button */}
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#f6c667] to-[#d48b29] hover:from-[#ffd676] hover:to-[#e09c3d]
        text-[#222] font-semibold py-3 px-5 rounded-full shadow-[0_0_20px_rgba(255,220,150,0.4)]
        flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,230,170,0.5)] z-10"
        onClick={handleDownloadClick}
      >
        <Download size={20} />
        <span>Download</span>
      </button>

      {/* 🔸 Title */}
      <h1 className="text-4xl mt-10 font-bold text-[#f8e8b0] mb-12 text-center">
        &gt;&gt; SYSTEM REQUIREMENTS &lt;&lt;
      </h1>

      {/* 🔹 Table */}
      <main className="flex-1 w-full max-w-5xl mx-auto py-12 px-4">
        <motion.table
          className="w-full text-left border-collapse table-auto bg-[#151515]/60 rounded-xl overflow-hidden backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          <thead>
            <tr className="bg-[#2c2c2c]/80">
              <th className="py-3 px-4 text-xl text-[#ffdc88]">Category</th>
              <th className="py-3 px-4 text-xl text-[#f5c76e]">
                &gt; MINIMUM &lt;
              </th>
              <th className="py-3 px-4 text-xl text-[#ffe19e]">
                &gt;&gt; RECOMMENDED &lt;&lt;
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-gray-600/30"
              >
                <td className="py-4 px-4 text-[#ffdc88]">{item.category}</td>
                <td className="py-4 px-4">{item.min}</td>
                <td className="py-4 px-4 text-white">{item.rec}</td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </main>
    </div>
  );
};

export default SystemRequirementPage;
