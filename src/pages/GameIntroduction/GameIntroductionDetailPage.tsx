// src/pages/GameIntroductionDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../component/config/axiosConfig";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
}

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
    <div className="bg-[#c4a875] min-h-screen flex flex-col">
      <main className="max-w-5xl mx-auto py-12 px-4 flex-grow">
        <button
          onClick={() => navigate(-1)}
          className="text-[#5a3700] hover:underline mb-6 flex items-center gap-2"
        >
          ← Quay lại
        </button>

        {loading ? (
          <p className="text-center">Đang tải dữ liệu...</p>
        ) : !news ? (
          <p className="text-center">Không tìm thấy dữ liệu.</p>
        ) : (
          <div className="bg-[#d8c4a6] p-10 rounded-2xl shadow-lg border-2 border-[#7d4b00]">
            <h1 className="text-3xl font-bold text-[#5a3700] mb-10 text-center">
              {news.title}
            </h1>

            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Ảnh giữ nguyên độ to */}
              {news.imageUrl && (
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  className="rounded-xl shadow-md w-full md:w-[55%] max-h-[500px] object-cover"
                />
              )}

              {/* Nội dung sang phải, vẫn full size */}
              <div className="w-full max-h-[250px]  md:w-[45%]">
                <p className="text-lg text-gray-800 whitespace-pre-line min-w-[500px] leading-relaxed">
                  {news.content}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GameIntroductionDetailPage;
