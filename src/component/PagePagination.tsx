import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

const PagePagination: React.FC<PaginationProps> = ({
  total,
  current,
  onChange,
}) => {
  const [hideAll, setHideAll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 🔍 Lấy vị trí footer
      const footer =
        document.querySelector("footer") ||
        document.querySelector(".footer") ||
        document.getElementById("footer");

      if (!footer) return;

      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 📏 Nếu footer sắp hiện trong 120px cuối màn hình → ẩn pagination
      setHideAll(rect.top < windowHeight - 120);
    };

    handleScroll(); // chạy 1 lần khi load
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goPrev = () => onChange(current > 0 ? current - 1 : total - 1);
  const goNext = () => onChange(current < total - 1 ? current + 1 : 0);

  return (
    <>
      {/* ⬅️ Mũi tên trái */}
      <motion.button
        onClick={goPrev}
        className={`fixed left-8 top-1/2 -translate-y-1/2 text-[#e5b55b]
                    drop-shadow-[0_0_15px_rgba(255,200,120,0.4)]
                    hover:text-[#fff3b0]
                    hover:drop-shadow-[0_0_25px_rgba(255,200,120,0.8)]
                    transition-all duration-300 z-30
                    ${
                      hideAll
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100 pointer-events-auto"
                    }`}
        whileHover={{ scale: 1.2, rotate: -10 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={90} strokeWidth={2.5} />
      </motion.button>

      {/* ➡️ Mũi tên phải */}
      <motion.button
        onClick={goNext}
        className={`fixed right-8 top-1/2 -translate-y-1/2 text-[#e5b55b]
                    drop-shadow-[0_0_15px_rgba(255,200,120,0.4)]
                    hover:text-[#fff3b0]
                    hover:drop-shadow-[0_0_25px_rgba(255,200,120,0.8)]
                    transition-all duration-300 z-30
                    ${
                      hideAll
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100 pointer-events-auto"
                    }`}
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={90} strokeWidth={2.5} />
      </motion.button>

      {/* 🔘 Dots nhỏ ở dưới */}
      <motion.div
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-[9999] transition-opacity duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: hideAll ? 0 : 1 }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <motion.span
            key={i}
            onClick={() => onChange(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              i === current
                ? "bg-[#f1c86a] scale-125 shadow-[0_0_10px_rgba(255,220,140,0.6)]"
                : "bg-[#4b3b22]"
            }`}
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </motion.div>
    </>
  );
};

export default PagePagination;
