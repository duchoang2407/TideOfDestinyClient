import React, { useState } from "react";
import { motion } from "framer-motion";
import BackGround from "../../assest/Background.png";

const ContactPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đơn hỗ trợ đã được gửi!");
    setTitle("");
    setContent("");
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-white font-['Cinzel',serif] pt-28 pb-32">
      {/* 🌌 Background giống NewsPage */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-70 blur-[2px] brightness-[0.85]"
        style={{ backgroundImage: `url(${BackGround})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,220,0.05)] to-[rgba(0,0,0,0.3)]"></div>
      </div>

      {/* 🌫️ Gradient header nối */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0b2239]/90 to-transparent z-0" />

      <main className="flex flex-col justify-center items-center flex-1 px-6 md:px-10 relative z-10 w-full max-w-[86%] mx-auto">
        <motion.div
          className="bg-white/5 backdrop-blur-md border border-[rgba(255,255,255,0.25)] shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] 
                     hover:shadow-[0_0_30px_rgba(255,255,220,0.15)] transition-all duration-500 
                     rounded-3xl p-10 md:p-12 w-full max-w-2xl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <h1 className="text-4xl font-extrabold text-center mb-10 text-[#f8f5d2] drop-shadow-[0_0_10px_rgba(255,250,200,0.5)] tracking-widest">
            GỬI ĐƠN HỖ TRỢ
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 text-[#eae6d8]"
          >
            {/* Tiêu đề */}
            <div>
              <label className="text-lg font-semibold block mb-2 text-[#f8f5d2]">
                Tiêu đề
              </label>
              <input
                type="text"
                placeholder="Nhập tiêu đề tại đây..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 rounded-lg bg-gradient-to-b from-[#3e5739]/90 to-[#253c30]/80 
                           text-[#f8f5d2] border border-[rgba(255,255,255,0.15)]
                           focus:outline-none focus:ring-2 focus:ring-[#d8c87a] placeholder:text-[#d8d4b0]"
                required
              />
            </div>

            {/* Nội dung */}
            <div>
              <label className="text-lg font-semibold block mb-2 text-[#f8f5d2]">
                Nội dung
              </label>
              <textarea
                placeholder="Mô tả chi tiết vấn đề bạn gặp phải..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full p-4 rounded-lg bg-gradient-to-b from-[#3e5739]/90 to-[#253c30]/80 
                           text-[#f8f5d2] border border-[rgba(255,255,255,0.15)]
                           focus:outline-none focus:ring-2 focus:ring-[#d8c87a] placeholder:text-[#d8d4b0] resize-none"
                required
              />
            </div>

            {/* Nút gửi */}
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255,255,220,0.25)",
              }}
              whileTap={{ scale: 0.95 }}
              className="self-end mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-[#d8c87a] to-[#c0b36b]
                         text-[#222] font-bold hover:from-[#f1e29a] hover:to-[#e5c76d] transition-all
                         border border-[rgba(255,255,255,0.25)] shadow-[0_0_20px_rgba(255,255,200,0.1)]"
            >
              Gửi đơn
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default ContactPage;
