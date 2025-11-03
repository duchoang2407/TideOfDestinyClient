import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../component/config/axiosConfig";
import { motion } from "framer-motion";
import BackGround from "../../assest/Background.png";

interface NewsDetail {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const NewsDetailPage: React.FC = () => {
  const { version } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Scroll lên top khi vào trang
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data } = await axiosInstance.get(`/News/${version}`);
        setNews(data);
      } catch (error: any) {
        console.error("Error fetching news detail:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (version) fetchDetail();
  }, [version]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-white font-['Cinzel',serif] pt-28 pb-32">
      {/* ✅ BACKGROUND ĐỒNG BỘ */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center brightness-[0.55]"
        style={{ backgroundImage: `url(${BackGround})` }}
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0b2239]/90 to-transparent z-0" />

      <main className="max-w-6xl mx-auto py-16 px-6 flex-grow relative z-10">
        {/* ✅ Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="text-[#d8c87a] hover:text-[#fff5c0] hover:underline mb-10 flex items-center gap-2 font-semibold transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ← Quay lại
        </motion.button>

        {/* ✅ Title Page */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-center mb-14
                     bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text
                     text-transparent drop-shadow-[0_0_35px_rgba(255,230,150,0.55)]"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          THÔNG TIN CẬP NHẬT
        </motion.h1>

        {loading ? (
          <p className="text-center text-lg text-gray-300 animate-pulse">
            Đang tải dữ liệu...
          </p>
        ) : !news ? (
          <p className="text-center text-lg text-gray-300">
            Không tìm thấy dữ liệu.
          </p>
        ) : (
          <motion.div
            className="rounded-3xl p-10 bg-white/5 backdrop-blur-md 
                       border border-[rgba(255,255,255,0.25)]
                       shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]
                       transition-all w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* ✅ Title của bài viết */}
            <motion.h2
              className="text-3xl font-bold mb-6 text-[#f8f5d2]
                         drop-shadow-[0_0_15px_rgba(255,240,200,0.4)]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {news.title.toUpperCase()}
            </motion.h2>

            {/* ✅ Content giữ UI gốc */}
            <motion.p
              className="leading-relaxed text-[#eae6d8] whitespace-pre-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {news.content}
            </motion.p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default NewsDetailPage;
