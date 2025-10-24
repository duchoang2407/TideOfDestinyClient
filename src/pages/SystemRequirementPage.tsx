import React from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const SystemRequirementPage: React.FC = () => {
  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden font-['Cinzel',serif] pt-28 pb-32">
      {/* 🌌 Background gradient đen xám + ánh vàng sang trọng */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0d0d0d] via-[#1c1c1c] to-[#0b0b0b]" />

      {/* ✨ Hiệu ứng ánh sáng động nhẹ */}
      <div className="absolute inset-0 pointer-events-none -z-0">
        <motion.div
          className="absolute w-[180%] h-[180%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,220,140,0.04),transparent_70%)] blur-2xl opacity-50"
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,240,180,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,230,140,0.04),transparent_70%)]" />
      </div>

      {/* 🌫️ Gradient nối header */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0b2239]/80 to-transparent z-0" />

      {/* 🟡 Nút tải */}
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#f6c667] to-[#d48b29] hover:from-[#ffd676] hover:to-[#e09c3d] 
                   text-[#222] font-semibold py-3 px-5 rounded-full shadow-[0_0_20px_rgba(255,220,150,0.4)] 
                   flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,230,170,0.5)]"
        onClick={async () => {
          try {
            const url =
              "https://localhost:44323/api/Download/donwload-lastest-file";
            const response = await fetch(url, { method: "GET" });
            if (!response.ok)
              throw new Error(`Download failed: ${response.status}`);
            const blob = await response.blob();
            const disposition =
              response.headers.get("content-disposition") || "";
            const match = disposition.match(
              /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i
            );
            const filename = decodeURIComponent(
              match?.[1] || match?.[2] || "download"
            );
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(blobUrl);
          } catch (err) {
            console.error(err);
            window.location.href =
              "https://localhost:44323/api/Download/donwload-lastest-file";
          }
        }}
      >
        <Download size={20} />
        <span>Download</span>
      </button>

      {/* 🔸 Tiêu đề */}
      <h1 className="text-4xl mt-10 font-bold text-[#f8e8b0] mb-12 text-center w-full drop-shadow-[0_0_10px_rgba(255,230,150,0.4)] tracking-widest">
        &gt;&gt; SYSTEM REQUIREMENTS &lt;&lt;
      </h1>

      {/* 🔹 Bảng yêu cầu hệ thống */}
      <main className="flex-1 w-full max-w-5xl mx-auto py-12 px-4 relative z-10">
        <motion.section
          className="bg-gradient-to-br from-[#141414]/95 to-[#1e1e1e]/90 
                     text-[#E0E0E0] p-8 rounded-3xl 
                     border border-[rgba(255,230,150,0.15)] 
                     shadow-[0_0_40px_rgba(255,230,150,0.08)] 
                     backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          variants={tableVariants}
        >
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="border-b border-[rgba(255,230,150,0.2)]">
                <th className="w-1/4 py-3 px-4 text-2xl font-bold text-[#ffdc88]">
                  Category
                </th>
                <th className="w-1/4 py-3 px-4 text-2xl font-bold text-[#f5c76e]">
                  &gt; MINIMUM &lt;
                </th>
                <th className="w-1/2 py-3 px-4 text-2xl font-bold text-[#ffe19e]">
                  &gt;&gt; RECOMMENDED &lt;&lt;
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  category: "OS",
                  min: "Windows 10 (64-bit)",
                  rec: "Windows 11 (64-bit)",
                },
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
                {
                  category: "Storage",
                  min: "2 GB available",
                  rec: "4 GB SSD recommended",
                },
              ].map((item, index) => (
                <motion.tr
                  key={item.category}
                  className="border-b border-[rgba(255,230,150,0.1)] hover:bg-[rgba(255,220,150,0.03)] transition-all duration-200"
                  custom={index}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <td className="py-4 px-4 font-semibold text-[#ffdc88]">
                    {item.category}
                  </td>
                  <td className="py-4 px-4 text-gray-300">{item.min}</td>
                  <td className="py-4 px-4 text-gray-100">{item.rec}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.section>
      </main>
    </div>
  );
};

export default SystemRequirementPage;
