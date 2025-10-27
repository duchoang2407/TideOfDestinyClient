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
}

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosInstance.get("/News", {
          params: { category: 0 },
        });
        setNews(response.data);
      } catch (error: any) {
        console.error("Error fetching news:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const currentData = news.slice(startIndex, startIndex + itemsPerPage);

  const pageVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handlePageChange = (newPage: number) => {
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
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

      <main className="flex-1 p-10 md:p-16 relative z-10 w-full max-w-[86%] mx-auto">
        <motion.h1
          className="text-5xl font-extrabold text-center mb-12 text-[#f8f5d2] drop-shadow-[0_0_10px_rgba(255,250,200,0.5)]"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          THÔNG TIN CẬP NHẬT
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
          <div className="relative min-h-[900px] flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute top-0 left-0 w-full"
                layout
              >
                <div className="flex flex-col gap-14">
                  {currentData.map((item) => (
                    <motion.div
                      key={item.id}
                      onClick={() => navigate(`/news/${item.id}`)}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 35px rgba(255,255,220,0.25)",
                        zIndex: 10,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="relative flex flex-col md:flex-row cursor-pointer rounded-3xl overflow-hidden
                                 bg-white/5 backdrop-blur-md 
                                 border border-[rgba(255,255,255,0.25)] shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]
                                 hover:shadow-[0_0_30px_rgba(255,255,220,0.15)] transition-all duration-500
                                 min-h-[260px]"
                    >
                      <div
                        className="flex-shrink-0 w-full md:w-72 mb-4 md:mb-0 md:mr-6 bg-gradient-to-b from-[#3e5739]/90 to-[#253c30]/80 
                                      text-[#f8f5d2] font-bold text-xl flex items-center justify-center 
                                      rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-inner p-6 text-center
                                      border-r border-[rgba(255,255,255,0.15)]"
                      >
                        {item.title}
                      </div>

                      <div
                        className="flex-1 p-6 bg-gradient-to-br from-[#233528]/80 to-[#2e4930]/80 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none shadow-inner overflow-y-auto"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                        <p className="text-[#eae6d8] text-lg leading-relaxed whitespace-pre-line">
                          {item.content}
                        </p>

                        <motion.span
                          className="block text-right mt-4 text-[#d8c87a] font-semibold underline decoration-[#d8c87a]/70"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          Xem chi tiết →
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>

      {totalPages > 1 && (
        <motion.div
          className="flex justify-center mt-10 mb-20 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PagePagination
            total={totalPages}
            current={page}
            onChange={handlePageChange}
          />
        </motion.div>
      )}
    </div>
  );
};

export default NewsPage;
