import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../component/config/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import PagePagination from "../../component/PagePagination";
import BackGround from "../../assest/Background.png";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
}

const GameIntroductionPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await axiosInstance.get("/News", {
          params: { category: 1 },
        });
        setNews(response.data);
      } catch (error: any) {
        console.error("Error fetching game intro:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIntro();
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const currentData = news.slice(startIndex, startIndex + itemsPerPage);

  const handleCardClick = (id: number) => {
    setClickedId(id);
    setTimeout(() => {
      navigate(`/game-introduction/${id}`);
    }, 300);
  };

  const handlePageChange = (newPage: number) => {
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-white font-['Cinzel',serif] pt-28 pb-32">
      {/* 🌌 Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-70 blur-[2px] brightness-[0.85]"
        style={{ backgroundImage: `url(${BackGround})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,220,0.05)] to-[rgba(0,0,0,0.3)]"></div>
      </div>

      {/* 🌫️ Gradient nối header */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0b2239]/90 to-transparent z-0" />

      {/* Nội dung chính */}
      <main className="max-w-7xl mx-auto py-20 px-6 flex-grow relative z-10">
        <motion.h1
          className="text-center text-6xl font-bold mb-20 tracking-widest text-[#f8f5d2] drop-shadow-[0_0_20px_rgba(255,250,200,0.4)]"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          GIỚI THIỆU GAME
        </motion.h1>

        {loading ? (
          <p className="text-center text-lg text-gray-300">
            Đang tải dữ liệu...
          </p>
        ) : currentData.length === 0 ? (
          <p className="text-center text-lg text-gray-300">
            Không có dữ liệu nào.
          </p>
        ) : (
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              className="flex flex-col gap-16 md:gap-20"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              {currentData.map((item, index) => (
                <motion.div
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                  className="relative rounded-3xl p-8 bg-white/5 backdrop-blur-md border border-[rgba(255,255,255,0.25)] shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] cursor-pointer group transition-all duration-500 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
                  animate={
                    clickedId === item.id
                      ? { scale: 1.1, opacity: 0 }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                >
                  <section className="grid md:grid-cols-2 gap-10 items-center relative z-10">
                    {item.imageUrl && (
                      <motion.img
                        loading="lazy"
                        src={item.imageUrl}
                        alt={item.title}
                        className={`rounded-2xl w-full h-80 object-cover shadow-lg ${
                          index % 2 === 1 ? "md:order-2" : ""
                        }`}
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}

                    <div
                      className={`p-8 rounded-2xl bg-gradient-to-br from-[#1f2e27]/70 to-[#2f3d32]/60 backdrop-blur-md border border-[rgba(255,255,255,0.25)] shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] ${
                        index % 2 === 1 ? "md:order-1" : ""
                      }`}
                    >
                      <h2 className="font-bold text-3xl mb-4 text-[#f8f5d2] drop-shadow-[0_0_10px_rgba(255,250,200,0.4)]">
                        {item.title.toUpperCase()}
                      </h2>
                      <p className="leading-relaxed text-[#eae6d8] line-clamp-3">
                        {item.content}
                      </p>
                      <motion.p
                        className="mt-6 text-right text-[#d8c87a] font-semibold underline decoration-[#f5e1a4]/50 hover:text-[#fff5c0]"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        Xem chi tiết →
                      </motion.p>
                    </div>
                  </section>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {totalPages > 1 && (
        <div className="flex justify-center mt-12 relative z-10">
          <PagePagination
            total={totalPages}
            current={page}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default GameIntroductionPage;
