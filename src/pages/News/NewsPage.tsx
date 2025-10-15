import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../component/config/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import PagePagination from "../../component/PagePagination";

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

  // 🔄 Animation fade mượt, không làm co layout
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
    <div className="relative min-h-screen bg-[#2E4B2B] text-[#E0F0C0] flex flex-col overflow-hidden">
      {/* Hiệu ứng nền */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(144,189,144,0.1),transparent_70%)] blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <main className="flex-1 p-10 md:p-16 relative z-10 w-full max-w-[86%] mx-auto">
        <motion.h1
          className="text-5xl font-extrabold text-center mb-12 text-[#c9d7a0] drop-shadow-[0_0_10px_rgba(200,230,160,0.5)]"
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
                <div className="flex flex-col gap-12">
                  {currentData.map((item) => (
                    <motion.div
                      key={item.id}
                      onClick={() => navigate(`/news/${item.id}`)}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 40px rgba(230,255,180,0.5)",
                        zIndex: 10,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="relative flex flex-col md:flex-row cursor-pointer rounded-3xl shadow-xl overflow-hidden
                                 transition-all duration-300 bg-[#375231]/95 border border-[#a0b080]/50
                                 min-h-[260px] max-h-[260px]"
                    >
                      {/* Tiêu đề */}
                      <div className="flex-shrink-0 w-full md:w-64 mb-4 md:mb-0 md:mr-6 bg-[#4E653A] text-[#C9D7A0] font-bold text-xl flex items-center justify-center rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-md p-6 text-center">
                        {item.title}
                      </div>

                      {/* Nội dung */}
                      <div
                        className="flex-1 bg-[#2E4B2B]/90 p-6 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none shadow-inner overflow-y-auto"
                        style={{
                          scrollbarWidth: "none",
                          msOverflowStyle: "none",
                        }}
                      >
                        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                        <p className="text-[#E0F0C0] text-lg leading-relaxed whitespace-pre-line">
                          {item.content}
                        </p>

                        <motion.span
                          className="block text-right mt-4 text-[#a0b080] font-semibold underline decoration-[#a0b080]/70"
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

      {/* Pagination */}
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
