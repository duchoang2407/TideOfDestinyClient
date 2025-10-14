import React from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../component/Footer/Footer";

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
    <div className="relative min-h-screen flex flex-col bg-[#2E4B2B] text-white overflow-hidden">
      {/* Background subtle */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
        <motion.div
          className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(144,189,144,0.05),transparent_70%)] blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Download button */}
      <button
        className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-5 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
        onClick={() => {
          const link = document.createElement("a");
          link.href = "/assets/SystemRequirements.pdf";
          link.download = "SystemRequirements.pdf";
          link.click();
        }}
      >
        <Download size={20} />
        <span>Download</span>
      </button>

      <h1 className="text-4xl mt-10 font-bold text-orange-400 mb-12 text-center w-full drop-shadow-[0_0_10px_rgba(255,200,150,0.6)]">
        &gt;&gt; SYSTEM REQUIREMENTS &lt;&lt;
      </h1>

      <main className="flex-1 w-full max-w-5xl mx-auto py-12 px-4">
        <motion.section
          className="bg-[#1f2b1c]/95 text-[#E0F0C0] p-8 rounded-3xl shadow-2xl backdrop-blur-md border border-[#a0b080]/30"
          initial="hidden"
          animate="visible"
          variants={tableVariants}
        >
          <div className="">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="border-b-2 border-[#a0b080]">
                  <th className="w-1/4 py-3 px-4 text-2xl font-bold">
                    Category
                  </th>
                  <th className="w-1/4 py-3 px-4 text-2xl font-bold">
                    &gt; MINIMUM &lt;
                  </th>
                  <th className="w-1/2 py-3 px-4 text-2xl font-bold">
                    &gt;&gt; RECOMMENDED &lt;&lt;
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    category: "OS",
                    min: "Windows 10 (64-bit)",
                    rec: "Windows 10 (64-bit)",
                  },
                  {
                    category: "Processor",
                    min: "AMD Athlon64 3000+ @ 1.8 GHz or Intel Pentium IV 630 @ 3.0 GHz",
                    rec: "AMD Athlon64 X2 3800+ or Intel Core 2 Duo E4400",
                  },
                  { category: "RAM", min: "2 GB", rec: "4 GB" },
                  {
                    category: "Video card",
                    min: "AMD Radeon HD 2900 XT / NVIDIA GeForce 9800 GT",
                    rec: "AMD Radeon HD 3650 / NVIDIA GeForce 9600 GT",
                  },
                  { category: "DirectX", min: "June 2010", rec: "June 2010" },
                  {
                    category: "Storage",
                    min: "2 GB available",
                    rec: "2 GB available",
                  },
                ].map((item, index) => (
                  <motion.tr
                    key={item.category}
                    className={`border-b border-[#a0b080]/50`}
                    custom={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="py-4 px-4 font-bold">{item.category}</td>
                    <td className="py-4 px-4">{item.min}</td>
                    <td className="py-4 px-4">{item.rec}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default SystemRequirementPage;
