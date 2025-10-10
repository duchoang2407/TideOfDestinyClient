import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../component/config/axiosConfig";
import { motion } from "framer-motion";

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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axiosInstance.get(`/News/${version}`);
        setNews(response.data);
      } catch (error: any) {
        console.error("Error fetching news detail:", error.message);
      } finally {
        setLoading(false);
      }
    };
    if (version) fetchDetail();
  }, [version]);

  return (
    <div className="relative bg-[#c4a875] min-h-screen flex flex-col overflow-hidden">
      {/* Subtle animated background */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#f9f3e6] via-[#d1c499] to-[#c4a875] opacity-30"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <main className="max-w-3xl h-full mx-auto py-12 px-4 flex-grow">
        {/* Back button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="text-[#5a3700] hover:underline mb-6 flex items-center gap-2 font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -6, scale: 1.05 }}
        >
          ← Quay lại
        </motion.button>

        {/* Header */}
        <motion.h1
          className="text-center text-3xl md:text-4xl font-bold text-[#7d4b00] mb-10 drop-shadow-[0_0_5px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          THÔNG TIN CẬP NHẬT
        </motion.h1>

        {loading ? (
          <p className="text-center text-[#5a3700] font-semibold animate-pulse">
            Đang tải dữ liệu...
          </p>
        ) : !news ? (
          <p className="text-center text-[#5a3700] font-semibold">
            Không tìm thấy dữ liệu.
          </p>
        ) : (
          <motion.div
            className="bg-[#353515] rounded-3xl shadow-2xl p-8 flex flex-col gap-6"
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <motion.div
              className="bg-[#2b2b0f] rounded-lg text-center py-4 px-6"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="font-bold text-xl md:text-2xl text-[#f2c94c] drop-shadow-[0_0_5px_rgba(0,0,0,0.4)]">
                {news.title}
              </span>
            </motion.div>

            {/* Content */}
            <motion.div
              className="bg-[#f5e9d7] text-[#5a3700] rounded-xl p-6 leading-relaxed whitespace-pre-line min-h-[300px] shadow-inner"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {news.content}
            </motion.div>

            {/* Date */}
            <motion.div
              className="text-right text-sm text-[#7d4b00] italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Ngày cập nhật: {news.createdAt}
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default NewsDetailPage;
