import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../component/config/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";
import PagePagination from "../../component/PagePagination";
import BackGround from "../../assest/Background.png";

/* =========================
   Types
========================= */
interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string; // FE-processed first image url (from imageUrls[0] or BE imageUrl)
  imageUrls?: string[]; // raw array from BE (if any)
}

/* =========================
   Image Fallback Helper
========================= */
const API_BASE = import.meta.env.VITE_API_BASE_URL || ""; // e.g. https://localhost:44333/api
const API_ROOT = API_BASE.replace(/\/api\/?$/, ""); // e.g. https://localhost:44333
const isHttp = (s?: string) => !!s && /^https?:\/\//i.test(s || "");

const buildImageCandidates = (raw?: string) => {
  if (!raw) return [] as string[];
  if (isHttp(raw)) return [raw];

  // If backend returns just an id/filename, try common patterns:
  return [
    `${API_BASE}/News/image/${raw}`,
    `${API_BASE}/News/image?fileName=${encodeURIComponent(raw)}`,
    `${API_ROOT}/${raw}`,
    `${API_ROOT}/uploads/${raw}`,
  ];
};

const SmartImage: React.FC<{
  raw: string | undefined;
  alt: string;
  className?: string;
  motionProps?: any; // pass framer-motion props here
}> = ({ raw, alt, className = "", motionProps = {} }) => {
  const candidates = buildImageCandidates(raw);
  const [idx, setIdx] = React.useState(0);

  if (!candidates.length) return null;

  const src = candidates[Math.min(idx, candidates.length - 1)];
  return (
    <motion.img
      {...motionProps}
      src={src}
      alt={alt}
      className={className}
      onError={() => setIdx((i) => i + 1)} // try next url when failed
      onLoad={() => console.debug("🖼 loaded:", src)}
    />
  );
};

/* =========================
   Page Component
========================= */
const GameIntroductionPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await axiosInstance.get("/api/News", {
          params: { category: 1 }, // hoặc enum bạn dùng
        });

        console.log("✅ API DATA:", response.data);

        // Chuẩn hoá ảnh: ưu tiên imageUrls[0] nếu có
        const processed: NewsItem[] = (response.data || []).map((it: any) => ({
          id: it.id,
          title: it.title,
          content: it.content,
          imageUrl:
            it.imageUrls && it.imageUrls.length > 0
              ? it.imageUrls[0].url
              : null,
        }));

        setNews(processed);

        setNews(processed);

        // Chỉ hiển thị bài có ảnh để không vỡ layout
        const filtered = processed.filter(
          (x) => x.imageUrl && x.imageUrl !== ""
        );
        setNews(filtered);
      } catch (error) {
        console.error("❌ Error fetching game intro:", error);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden text-white font-['Cinzel',serif] pt-28 pb-32">
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center brightness-[0.55]"
        style={{ backgroundImage: `url(${BackGround})` }}
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      {/* Gradient nối header */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0b2239]/90 to-transparent z-0" />

      {/* Gradient nối header */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0b2239]/90 to-transparent z-0" />

      {/* Nội dung */}
      <main className="max-w-7xl mx-auto py-20 px-6 flex-grow relative z-10">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-center mb-14
                   bg-gradient-to-b from-yellow-200 to-yellow-600 bg-clip-text
                   text-transparent drop-shadow-[0_0_35px_rgba(255,230,150,0.55)]"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          GIỚI THIỆU GAME
        </motion.h1>

        {loading ? (
          // Skeleton khi tải
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white/10 rounded-3xl p-6 h-72 animate-pulse"
              />
            ))}
          </div>
        ) : currentData.length === 0 ? (
          <p className="text-center text-lg text-gray-300">
            Không có dữ liệu nào.
          </p>
        ) : (
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={page}
              className="flex flex-col gap-16 md:gap-20"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              variants={variants}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              {currentData.map((item, index) => (
                <motion.div
                  key={item.id}
                  onClick={() => handleCardClick(item.id)}
                  className="relative rounded-3xl p-8 bg-white/5 backdrop-blur-md border border-[rgba(255,255,255,0.25)]
                             shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] cursor-pointer group
                             transition-all duration-500 hover:shadow-[0_0_35px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
                  animate={
                    clickedId === item.id
                      ? { scale: 1.1, opacity: 0 }
                      : { scale: 1, opacity: 1 }
                  }
                  transition={{ type: "spring", stiffness: 180, damping: 15 }}
                >
                  <section className="grid md:grid-cols-2 gap-10 items-center relative z-10">
                    <SmartImage
                      raw={item.imageUrl}
                      alt={item.title}
                      className={`rounded-2xl w-full h-80 object-cover shadow-lg ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}
                      motionProps={{
                        loading: "lazy",
                        initial: { opacity: 0.6, scale: 0.97 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { duration: 0.6 },
                      }}
                    />

                    <div
                      className={`p-8 rounded-2xl bg-gradient-to-br from-[#1f2e27]/70 to-[#2f3d32]/60 backdrop-blur-md
                                  border border-[rgba(255,255,255,0.25)] shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]
                                  ${index % 2 === 1 ? "md:order-1" : ""}`}
                    >
                      <h2 className="font-bold text-3xl mb-4 text-[#f8f5d2] drop-shadow-[0_0_10px_rgba(255,250,200,0.4)]">
                        {item.title?.toUpperCase()}
                      </h2>
                      <p className="leading-relaxed text-[#eae6d8] line-clamp-3">
                        {item.content}
                      </p>
                      <motion.p
                        className="mt-6 text-right text-[#d8c87a] font-semibold underline decoration-[#f5e1a4]/50 hover:text-[#fff5c0]"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        Xem chi tiết →
                      </motion.p>
                    </div>
                  </section>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {totalPages > 1 && (
        <div className="flex justify-center mt-12 relative z-10">
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
