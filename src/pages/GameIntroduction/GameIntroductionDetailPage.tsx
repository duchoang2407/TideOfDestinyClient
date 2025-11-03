import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axiosInstance from "../../component/config/axiosConfig";
import SmartImage from "../../component/SmartImage/SmartImage";
import BackGround from "../../assest/Background.png";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  imageUrls?: Array<{ url: string }>;
}

const AnimatedText: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => (
  <p className="leading-relaxed mb-4 text-[#eae6d8]">
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

const GameIntroductionDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data } = await axiosInstance.get(`/News/${id}`);

        const processed: NewsItem = {
          id: data.id,
          title: data.title,
          content: data.content,
          imageUrl:
            data.imageUrls && data.imageUrls.length > 0
              ? data.imageUrls[0].url
              : null,
        };

        setNews(processed);
      } catch (error: any) {
        console.error("Error fetching detail:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-white font-['Cinzel',serif] pt-28 pb-32">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center brightness-[0.55]"
        style={{ backgroundImage: `url(${BackGround})` }}
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0b2239]/90 to-transparent z-0" />

      <main className="max-w-7xl mx-auto py-20 px-6 flex-grow relative z-10">
        {/* Quay lại */}
        <motion.button
          onClick={() => navigate(-1)}
          className="text-[#d8c87a] hover:text-[#fff5c0] hover:underline mb-10 flex items-center gap-2 font-semibold transition-colors"
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
            className="rounded-3xl p-10 bg-white/5 backdrop-blur-md 
                       border border-[rgba(255,255,255,0.25)]
                       shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]
                       transition-all grid md:grid-cols-2 gap-10 items-start"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Ảnh bên trái */}
            <SmartImage
              raw={news.imageUrl}
              alt={news.title}
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
              motionProps={{
                initial: { opacity: 0.6, scale: 0.97 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.6 },
              }}
            />

            {/* Chữ bên phải */}
            <div className="w-full flex flex-col">
              {/* Title nằm trên chữ */}
              <motion.h1
                className="text-5xl font-extrabold mb-8
                          bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text
                          text-transparent drop-shadow-[0_0_35px_rgba(255,230,150,0.55)]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {news.title.toUpperCase()}
              </motion.h1>

              {/* Nội dung text */}
              {news.content
                ?.replace(/\r/g, "")
                ?.split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, idx) => (
                  <AnimatedText
                    key={idx}
                    text={line}
                    delay={0.2 + idx * 0.05}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default GameIntroductionDetailPage;
