import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import BG from "../assest/bg.png";
import bg2 from "../assest/bg2.png";
import bg3 from "../assest/bg3.png";
import idleSprite from "../assest/Idle.png";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.getElementById(
      "characterIdle"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = new Image();
    sprite.src = idleSprite;

    const cols = 3;
    const rows = 3;
    const FRAME_W = 512;
    const FRAME_H = 512;
    const TOTAL = cols * rows;

    const renderW = canvas.width;
    const renderH = canvas.height;
    const dx = 0;
    const dy = 0;

    let frame = 0;
    let last = 0;
    const frameDelay = 110;

    const loop = (t: number) => {
      if (!last) last = t;
      const elapsed = t - last;

      if (elapsed >= frameDelay) {
        frame = (frame + 1) % TOTAL;
        last = t;
      }

      const col = frame % cols;
      const row = Math.floor(frame / cols);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;

      ctx.drawImage(
        sprite,
        col * FRAME_W,
        row * FRAME_H,
        FRAME_W,
        FRAME_H,
        dx,
        dy,
        renderW,
        renderH
      );

      requestAnimationFrame(loop);
    };

    sprite.onload = () => requestAnimationFrame(loop);
  }, []);

  return (
    // 🚨 FIXED → removed overflow-hidden
    <section className="relative w-full min-h-screen bg-black text-white">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />

      {/* =================== HERO SECTION =================== */}
      <div className="relative z-10 flex flex-col items-center text-center pt-[18vh] pb-[12vh] px-6">
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-wide text-yellow-300 drop-shadow-[0_0_25px_rgba(255,220,150,0.9)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          TIDE OF DESTINY
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-200 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Hành trình huyền thoại, hồi sinh lịch sử Việt Nam theo cách bạn chưa từng thấy!
        </motion.p>

        <motion.button
          onClick={() => navigate("/gameintroduction")}
          className="mt-10 border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black 
                     px-8 py-3 rounded-lg text-lg transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Khám phá game
        </motion.button>
      </div>

      {/* =================== CHARACTER SECTION =================== */}
      <section className="relative z-10 bg-black/85 py-24 px-6">
        <h2 className="text-center text-3xl font-bold text-yellow-300 mb-12 drop-shadow">
          Nhân Vật Chính
        </h2>

        <motion.div
          onClick={() => navigate("/character")}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            group cursor-pointer select-none max-w-sm mx-auto
            text-center border border-yellow-500/25 p-8 rounded-xl 
            bg-gradient-to-b from-[#1a1a1a] to-black shadow-xl
            hover:scale-105 transition
          "
        >
          <div
            className="w-32 h-32 mx-auto mb-4 rounded-full bg-yellow-400/10 
                          group-hover:bg-yellow-400/20 transition"
          />

          <h3 className="text-xl font-bold text-yellow-300">Ông Năm</h3>
          <p className="text-gray-300 mt-2">Nông dân</p>

          <p className="text-yellow-400 text-sm mt-3 opacity-0 group-hover:opacity-100 transition">
            ➜ Xem chi tiết
          </p>
        </motion.div>
      </section>

      {/* =================== GAME SHOWCASE =================== */}
      <section className="relative z-10 flex flex-col md:flex-row items-center gap-10 px-10 py-24 bg-black">
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
        >
          <h2 className="text-3xl font-bold text-yellow-300">
            Thế giới Việt Nam cổ đại
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Từ truyền thuyết Lạc Long Quân đến các trận chiến oanh liệt — mọi
            bước đi của bạn đều là một phần lịch sử.
          </p>
        </motion.div>
      </section>

      {/* =================== FEATURES =================== */}
      <section className="relative z-10 bg-black py-20 px-6">
        <h2 className="text-center text-3xl font-bold text-yellow-300 mb-10" style={{ opacity: 1, display: 'block' }}>
          Những điểm nổi bật
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { t: "Đồ họa hoành tráng", d: "Tái hiện Việt Nam cổ xưa cực kỳ chân thật." },
            { t: "Cốt truyện sử thi", d: "Khơi dậy hào khí dân tộc trong từng nhiệm vụ." },
            { t: "Nhân vật truyền thuyết", d: "Hóa thân các anh hùng có thật trong lịch sử." }
          ].map((f, i) => (
            <div
              key={i}
              className="bg-[#161616] border border-yellow-600/20 p-6 rounded-xl text-center shadow-xl 
                         hover:scale-105 transition"
            >
              <h3 className="text-yellow-300 text-xl font-bold mb-2">{f.t}</h3>
              <p className="text-gray-300">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =================== SLIDER =================== */}
      <section className="relative z-10 bg-black py-14">
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {[bg2, bg3, BG, bg2, bg3, BG, bg2, bg3, BG, bg2, bg3, BG].map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-[260px] h-[150px] object-cover rounded-lg shadow-xl"
              />
            ))}
          </div>
        </div>
      </section>

      {/* =================== STORY TEASER =================== */}
      <section className="relative z-10 bg-black py-24 px-6">
        <motion.p
          className="max-w-4xl mx-auto text-center text-lg md:text-xl text-gray-200 leading-relaxed"
          style={{ opacity: 1, display: 'block' }}
        >
          “Nếu lịch sử tái hiện ngay trước mắt bạn… liệu bạn có đủ dũng khí để trở thành người viết tiếp nó?”
          </motion.p>
      </section>

    </section>
  );
};

export default HomePage;

// Fixed closing tag