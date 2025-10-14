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
    <div className="relative bg-[#2E4B2B] min-h-screen flex flex-col overflow-hidden text-[#E0F0C0]">
      {/* Background animation */}
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

      <main className="max-w-3xl mx-auto py-12 px-4 flex-grow relative z-10">
        {/* Back button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="text-[#C9D7A0] hover:underline mb-6 flex items-center gap-2 font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -6, scale: 1.05 }}
        >
          ← Quay lại
        </motion.button>

        {/* Header */}
        <motion.h1
          className="text-center text-4xl font-extrabold text-[#E0F0C0] mb-10 drop-shadow-[0_0_10px_rgba(200,255,200,0.2)]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          THÔNG TIN CẬP NHẬT
        </motion.h1>

        {loading ? (
          <p className="text-center text-[#C9D7A0] font-semibold animate-pulse">
            Đang tải dữ liệu...
          </p>
        ) : !news ? (
          <p className="text-center text-[#C9D7A0] font-semibold">
            Không tìm thấy dữ liệu.
          </p>
        ) : (
          <motion.div
            className="bg-[#375231] rounded-3xl shadow-2xl p-8 flex flex-col gap-6"
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <motion.div
              className="bg-[#4E653A] rounded-lg text-center py-4 px-6 shadow-inner"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="font-bold text-2xl text-[#E0F0C0] drop-shadow-[0_0_6px_rgba(230,255,180,0.3)]">
                {news.title}
              </span>
            </motion.div>

            {/* Content */}
            <motion.div
              className="bg-[#2E4B2B]/90 text-[#E0F0C0] rounded-xl p-6 leading-relaxed whitespace-pre-line min-h-[300px] shadow-inner"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {news.content}
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default NewsDetailPage;
