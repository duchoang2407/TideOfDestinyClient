import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../component/config/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import PagePagination from "../../component/PagePagination";

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
  const [direction, setDirection] = useState<1 | -1>(1); // 1: next, -1: prev
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
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#2E4B2B] text-white">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
        <motion.div
          className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(144,189,144,0.1),transparent_70%)] blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-full h-full bg-[url('/images/smoke.png')] bg-cover opacity-10"
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <main className="max-w-6xl mx-auto py-16 px-6 pb-48 flex-grow relative z-10">
        <motion.h1
          className="text-center text-5xl font-extrabold mb-16 text-[#c9d7a0] drop-shadow-[0_0_10px_rgba(200,230,160,0.5)]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          GIỚI THIỆU
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
              className="flex flex-col gap-16"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              {currentData.map((item, index) => (
                <motion.div
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                  className="relative rounded-3xl p-6 bg-gradient-to-br from-[#375231] to-[#1f3a1f] border border-[#a0b080]/60 shadow-[0_0_20px_rgba(160,200,128,0.1)] cursor-pointer group"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 30px rgba(160,200,128,0.3)",
                  }}
                  animate={
                    clickedId === item.id
                      ? { scale: 1.1, opacity: 0 }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-3xl border border-[#c9d7a0]/30 opacity-0 group-hover:opacity-100 pointer-events-none"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <section className="grid md:grid-cols-2 gap-10 items-center relative z-10">
                    {item.imageUrl && (
                      <motion.img
                        src={item.imageUrl}
                        alt={item.title}
                        className={`rounded-2xl shadow-lg w-full h-80 object-cover ${
                          index % 2 === 1 ? "md:order-2" : ""
                        }`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}

                    <motion.div
                      className={`p-6 rounded-2xl min-w-[300px] md:min-w-[500px] min-h-[250px] flex flex-col justify-between bg-[#375231]/70 backdrop-blur-sm border border-[#a0b080]/40 ${
                        index % 2 === 1 ? "md:order-1" : ""
                      }`}
                    >
                      <h2 className="font-bold text-2xl mb-3 text-[#c9d7a0] drop-shadow-[0_0_6px_rgba(200,230,160,0.4)]">
                        {item.title.toUpperCase()}
                      </h2>
                      <p className="leading-relaxed text-[#e0f0c0] line-clamp-3">
                        {item.content}
                      </p>
                      <motion.p
                        className="mt-4 text-right text-[#a0b080] font-semibold underline decoration-[#a0b080]/70"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        Xem chi tiết →
                      </motion.p>
                    </motion.div>
                  </section>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10  relative z-10">
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
