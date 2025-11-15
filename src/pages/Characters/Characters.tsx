import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import idleSprite from "../../assest/Idle.png";
import attackSprite from "../../assest/ONG NAM PUNCH.png";

const Character: React.FC = () => {
  const navigate = useNavigate();
  const [animation, setAnimation] = useState<"idle" | "attack">("idle");

  useEffect(() => {
    const canvas = document.getElementById(
      "characterIdle"
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = new Image();

    let cols = 3;
    let rows = 3;
    let totalFrames = 9;
    let frameWidth = 512;
    let frameHeight = 512;

    if (animation === "attack") {
      sprite.src = attackSprite;
      cols = 4;
      rows = 4;
      totalFrames = 16;
    } else {
      sprite.src = idleSprite;
    }

    const renderW = canvas.width;
    const renderH = canvas.height;
    let frame = 0;
    let last = 0;
    const delay = animation === "attack" ? 80 : 120;

    const loop = (t: number) => {
      if (!last) last = t;
      if (t - last >= delay) {
        frame = (frame + 1) % totalFrames;
        last = t;
      }

      const col = frame % cols;
      const row = Math.floor(frame / cols);

      // ✅ Căn nhân vật đúng đáy canvas
      const destWidth = renderW * 0.95;
      const destHeight = renderH * 0.95;
      const destX = (renderW - destWidth) / 2;
      const destY = renderH - destHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        sprite,
        col * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight,
        destX,
        destY,
        destWidth,
        destHeight
      );

      requestAnimationFrame(loop);
    };

    sprite.onload = () => requestAnimationFrame(loop);
  }, [animation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black text-white flex flex-col items-center py-20 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-yellow-300 drop-shadow-lg"
      >
        Lão Tiên Sinh
      </motion.h1>

      <canvas
        id="characterIdle"
        width={350}
        height={350}
        className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]"
      />

      {/* ✅ Buttons đổi animation */}
      <div className="flex gap-4 mt-8">
        {[
          { label: "🧘 Idle", id: "idle" },
          { label: "👊 Attack", id: "attack" },
        ].map((btn) => (
          <motion.button
            key={btn.id}
            onClick={() => setAnimation(btn.id as "idle" | "attack")}
            className={`px-4 py-2 rounded-lg transition font-bold ${
              animation === btn.id
                ? "bg-yellow-400 text-black shadow-lg"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            whileTap={{ scale: 0.9 }}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>

      <motion.p
        className="max-w-3xl text-gray-300 text-center text-lg mt-8 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Một bậc võ sư bí ẩn với sức mạnh cổ xưa. Ông đã dành cả đời để nghiên
        cứu tinh hoa quyền pháp và giờ đây, ông xuất hiện để truyền dạy bí kíp
        cuối cùng cho người được chọn — bạn!
      </motion.p>

      <motion.button
        onClick={() => navigate("/")}
        className="mt-12 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-lg shadow-xl transition"
      >
        ← Quay lại
      </motion.button>
    </div>
  );
};

export default Character;
