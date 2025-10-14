import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tiêu đề:", title);
    console.log("Nội dung:", content);
    alert("Đơn hỗ trợ đã được gửi!");
    setTitle("");
    setContent("");
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#2E4B2B] text-white overflow-hidden">
      {/* 🌫️ Background subtle */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
        <motion.div
          className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(144,189,144,0.05),transparent_70%)] blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <main className="flex flex-col justify-center items-center flex-1 px-6 py-12">
        <motion.div
          className="bg-[#375231]/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-2xl"
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            duration: 0.6,
          }}
        >
          <h1 className="text-3xl font-bold mb-8 text-[#c9d7a0] text-center drop-shadow-[0_0_6px_rgba(200,230,160,0.4)]">
            Gửi đơn hỗ trợ
          </h1>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-lg bg-[#2f3b22] text-white border border-[#a0b080]/50 focus:outline-none focus:ring-2 focus:ring-[#a0b080]"
              required
            />

            <textarea
              placeholder="Nội dung"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full p-4 rounded-lg bg-[#2f3b22] text-white border border-[#a0b080]/50 focus:outline-none focus:ring-2 focus:ring-[#a0b080] resize-none"
              required
            />

            <button
              type="submit"
              className="self-end px-6 py-2 rounded-lg bg-[#3a4d28] text-yellow-300 font-bold hover:bg-[#2d3c1f] transition"
            >
              Gửi đơn
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default ContactPage;
