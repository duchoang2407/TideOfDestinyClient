import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../component/config/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import PagePagination from "../../component/PagePagination";
import BackGround from "../../assest/Background.png";
import { Clock } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt?: string;
}

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosInstance.get("/News", {
          params: { category: 0 },
        });
        setNews(response.data);
      } catch (error) {
        console.error("❌ Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const currentData = news.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative min-h-screen flex flex-col text-white font-['Cinzel',serif] pt-32 pb-28">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center brightness-[0.55]"
        style={{ backgroundImage: `url(${BackGround})` }}
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      {/* HEADER */}
      <motion.h1
        className="text-5xl md:text-6xl font-extrabold text-center mb-14
                   bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text
                   text-transparent drop-shadow-[0_0_35px_rgba(255,230,150,0.55)]"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        THÔNG TIN MỚI NHẤT
      </motion.h1>

      <main className="w-full max-w-[90%] mx-auto space-y-10">
        {loading ? (
          // ✅ Skeleton loading
          <div className="space-y-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-white/10 rounded-2xl" />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.35 }}
              className="space-y-10"
            >
              {currentData.map((item) => (
                <motion.div
                  key={item.id}
                  onClick={() => navigate(`/news/${item.id}`)}
                  className="flex items-stretch cursor-pointer overflow-hidden
                             max-w-5xl mx-auto bg-[#203125]/90 
                             rounded-3xl backdrop-blur-md
                             border border-yellow-500/25 shadow-[0_0_20px_rgba(255,230,130,0.05)]
                             min-h-[190px] transition-all"
                  whileHover={{
                    scale: 1.015,
                    boxShadow: "0 0 45px rgba(255,220,110,0.35)",
                  }}
                >
                  {/* IMAGE */}
                  {item.imageUrl && (
                    <div className="w-56 h-full overflow-hidden flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        className="w-full h-full object-cover transition-transform duration-[1.2s]"
                      />
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className="flex flex-col justify-between flex-1 p-6">
                    <div>
                      <h3 className="text-2xl font-bold text-yellow-300 line-clamp-2 drop-shadow-md">
                        {item.title}
                      </h3>

                      <p className="text-gray-200 text-base mt-2 line-clamp-2">
                        {item.content}
                      </p>
                    </div>

                    {/* DATE + READ MORE */}
                    <div className="flex justify-between items-center mt-4">
                      {item.publishedAt && (
                        <span className="flex items-center gap-2 text-sm text-yellow-200/70">
                          <Clock size={15} />
                          {new Date(item.publishedAt).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                      )}

                      <motion.span
                        whileHover={{ x: 6 }}
                        className="text-yellow-300 font-semibold text-sm"
                      >
                        Xem chi tiết →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* PAGINATION ✅ */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <PagePagination
            total={totalPages}
            current={page}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default NewsPage;
