import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../component/config/axiosConfig";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
}

// Helper để render từng ký tự với animation
const AnimatedText: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  return (
    <p className="leading-relaxed mb-4 text-[#E0F0C0]">
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + idx * 0.02, duration: 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </p>
  );
};

const GameIntroductionDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axiosInstance.get(`/News/${id}`);
        setNews(response.data);
      } catch (error: any) {
        console.error("Error fetching detail:", error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetail();
  }, [id]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#2E4B2B] text-[#E0F0C0]">
      {/* Background động */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(144,189,144,0.1),transparent_70%)] blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-full h-full bg-[url('/images/smoke.png')] bg-cover opacity-15"
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <main className="max-w-6xl mx-auto py-16 px-6 flex-grow relative">
        {/* Button quay lại */}
        <motion.button
          onClick={() => navigate(-1)}
          className="text-[#C9D7A0] hover:text-[#E0F0C0] hover:underline mb-8 flex items-center gap-2 font-semibold transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ← Quay lại
        </motion.button>

        {loading ? (
          <p className="text-center text-lg text-gray-300">
            Đang tải dữ liệu...
          </p>
        ) : !news ? (
          <p className="text-center text-lg text-gray-300">
            Không tìm thấy dữ liệu.
          </p>
        ) : (
          <motion.div
            className="bg-[#375231]/90 backdrop-blur-md rounded-3xl shadow-[0_0_30px_rgba(160,200,128,0.3)] border border-[#C9D7A0] p-10 flex flex-col md:flex-row gap-10 items-start
                       hover:shadow-[0_0_50px_rgba(200,230,160,0.5)] transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Ảnh */}
            {news.imageUrl && (
              <motion.img
                src={news.imageUrl}
                alt={news.title}
                className="rounded-2xl shadow-lg w-full md:w-[50%] object-cover hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            )}

            {/* Text content */}
            <div className="w-full md:w-[50%] flex flex-col">
              {/* Tiêu đề gradient + glow */}
              <motion.h1
                className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#C9D7A0] via-[#E0F0C0] to-[#C9D7A0] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(200,230,160,0.6)]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {news.title.toUpperCase()}
              </motion.h1>

              {/* Nội dung fade-in từng ký tự */}
              {news.content.split("\n").map((line, idx) => (
                <AnimatedText key={idx} text={line} delay={0.2 + idx * 0.1} />
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default GameIntroductionDetailPage;
