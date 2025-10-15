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
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
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

  // Animation for page transitions
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const pageTransition = { type: "spring", stiffness: 200, damping: 30 };

  const handlePageChange = (newPage: number) => {
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
  };

  return (
    <div className="relative min-h-screen mb-1 bg-[#2E4B2B] text-[#E0F0C0] flex flex-col overflow-hidden">
      {/* Background subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(144,189,144,0.15),transparent_70%)] blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-full h-full bg-[url('/images/smoke.png')] bg-cover opacity-10"
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <main className="flex-1 p-6 relative z-10">
        <motion.h1
          className="text-4xl font-extrabold text-center mb-5"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
          <div className="overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={pageTransition}
                className="flex flex-col gap-12 max-w-5xl mx-auto"
              >
                {currentData.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 40px rgba(230, 255, 180, 0.6)",
                      zIndex: 10, // ✅ nổi lên khi hover
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 15,
                    }}
                    className="relative flex flex-col md:flex-row flex-wrap cursor-pointer rounded-3xl shadow-xl overflow-hidden transition-all duration-300 bg-[#375231] p-8"
                    onClick={() => navigate(`/news/${item.id}`)}
                  >
                    {/* Left title box */}
                    <div className="flex-shrink-0 w-full md:w-64 mb-4 md:mb-0 md:mr-6 bg-[#4E653A] text-[#C9D7A0] font-bold text-xl flex items-center justify-center rounded-2xl shadow-md p-6 text-center">
                      {item.title}
                    </div>

                    {/* Right content box */}
                    <div className="flex-1 bg-[#2E4B2B]/90 p-6 rounded-2xl shadow-inner break-words max-w-full overflow-hidden">
                      <p className="text-[#E0F0C0] text-lg leading-relaxed break-words whitespace-pre-line">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* PagePagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex justify-center mt-12 mb-16 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
