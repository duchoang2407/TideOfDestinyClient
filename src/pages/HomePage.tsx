import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

import BG from "../assest/bg.png";
import bg2 from "../assest/bg2.png";
import bg3 from "../assest/bg3.png";
// import SteamIcon from "../assets/steam.svg";

// import epicgames from "../assest/epicgames.svg";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 🔥 Background cinematic */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />

      {/* ✅ HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center text-center h-[88vh] justify-center px-6">
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-widest text-yellow-300 drop-shadow-[0_0_25px_rgba(255,220,150,0.9)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          TIDE OF DESTINY
        </motion.h1>

        <motion.p
          className="mt-6 max-w-3xl text-lg md:text-xl text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Hành trình huyền thoại, hồi sinh lịch sử Việt Nam theo cách bạn chưa
          từng thấy!
        </motion.p>

        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={() => navigate("/systemrequirements")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 text-lg font-bold rounded-lg shadow-xl flex items-center gap-2 transition"
          >
            <Download size={22} /> Tải bản PC
          </button>
          <button
            onClick={() => navigate("/gameintroduction")}
            className="border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black px-6 py-3 rounded-lg text-lg transition"
          >
            Khám phá game
          </button>
        </motion.div>
      </section>

      {/* ✅ PLATFORM CARDS */}
      <section className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 py-20">
        {[
          { n: "PC", i: <Download size={26} /> },
          // { n: "Epic Games", i: <img src={epicgames} className="w-7" /> },
          // { n: "Steam", i: <img src={SteamIcon} className="w-7" /> },
        ].map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="bg-[#1b1b1b]/85 border border-yellow-500/20 rounded-xl p-6 text-center hover:scale-105 shadow-[0_0_25px_rgba(255,220,150,0.15)] transition"
          >
            <div className="mb-2">{p.i}</div>
            <p className="font-bold tracking-wide text-gray-100">{p.n}</p>
          </motion.div>
        ))}
      </section>

      {/* ✅ GAME SHOWCASE */}
      <section className="relative z-10 flex flex-col md:flex-row items-center px-10 py-24 gap-10 bg-black/85">
        <motion.img
          src={bg2}
          className="w-full md:w-1/2 rounded-lg shadow-2xl object-cover"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        />
        <motion.div
          className="md:w-1/2 space-y-4"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-yellow-300">
            Thế giới Việt Nam cổ đại
          </h2>
          <p className="text-gray-300 text-lg">
            Từ truyền thuyết Lạc Long Quân đến các trận chiến oanh liệt — mọi
            bước đi của bạn là một phần lịch sử.
          </p>
        </motion.div>
      </section>

      {/* ✅ FEATURE SHOWCASE */}
      <section className="bg-black/90 py-20 px-6">
        <h2 className="text-center text-3xl font-bold text-yellow-300 mb-10">
          Những điểm nổi bật
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              t: "Đồ họa hoành tráng",
              d: "Tái hiện Việt Nam cổ xưa cực kỳ chân thật.",
            },
            {
              t: "Cốt truyện sử thi",
              d: "Khơi dậy hào khí dân tộc trong từng nhiệm vụ.",
            },
            {
              t: "Nhân vật truyền thuyết",
              d: "Hóa thân các anh hùng có thật trong lịch sử.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: i * 0.25,
              }}
              className="relative bg-[#161616] border border-yellow-600/20 p-6 rounded-xl text-center 
             shadow-[0_0_15px_rgba(255,215,0,0.08)] 
             hover:shadow-[0_0_30px_rgba(255,215,0,0.4)]
             hover:border-yellow-400 
             will-change-transform
             hover:scale-[1.07]
             transition-transform duration-300"
            >
              {/* Glow vàng nhè nhẹ phía sau card */}
              <div className="absolute inset-0 bg-yellow-500/5 blur-xl rounded-xl -z-10 transition-opacity duration-300 opacity-0 hover:opacity-100" />

              <h3 className="text-yellow-300 text-xl font-extrabold mb-2 drop-shadow-[0_0_6px_rgba(255,220,150,0.7)]">
                {f.t}
              </h3>
              <p className="text-gray-300">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ GALLERY SLIDE */}
      <section className="relative z-10 bg-black py-10 overflow-hidden">
        <div className="flex gap-6 animate-scroll">
          {[bg2, bg3, BG, bg2, bg3].map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-[280px] h-[160px] object-cover rounded-lg shadow-xl"
            />
          ))}
        </div>
      </section>

      {/* ✅ CHARACTER CLASSES */}
      <section className="relative z-10 bg-[#0e0e0e] py-20 px-6">
        <h2 className="text-center text-3xl font-bold text-yellow-300 mb-12">
          Bạn sẽ trở thành ai?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { name: "Chiến Binh", sub: "Sức mạnh & lòng dũng cảm" },
            { name: "Cung Thủ", sub: "Bóng đêm & mũi tên tử thần" },
            { name: "Pháp Sư", sub: "Thần lực linh thiêng" },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center border border-yellow-500/25 p-8 rounded-xl hover:scale-105 shadow-xl transition bg-[#141414]"
            >
              <h3 className="text-xl font-bold text-yellow-300">{c.name}</h3>
              <p className="text-gray-300 mt-2">{c.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ STORY TEASER */}
      <section className="bg-black py-24 px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true, // ❗ Chỉ animate lần đầu
            amount: 0.3, // ❗ Chỉ cần xuất hiện 30% là kích hoạt
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="max-w-4xl mx-auto text-center text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-[0_0_8px_rgba(255,220,150,0.4)]"
        >
          “Nếu lịch sử tái hiện ngay trước mắt bạn… <br />
          liệu bạn có đủ dũng khí để trở thành người viết tiếp nó?”
        </motion.p>
      </section>
    </div>
  );
};

export default HomePage;
