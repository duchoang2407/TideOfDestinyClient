// src/pages/News/NewsDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../component/config/axiosConfig";

interface NewsDetail {
  id: number;
  title: string; // ví dụ: "v0.2.8"
  content: string; // danh sách update
  createdAt: string; // ngày đăng
}

const NewsDetailPage: React.FC = () => {
  const { version } = useParams(); // lấy version từ url
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
    <div className="bg-[#c4a875] min-h-screen flex flex-col">
      {/* Header + Nội dung chính */}
      <main className="max-w-3xl h-full mx-auto py-12 px-4 flex-grow">
        <button
          onClick={() => navigate(-1)}
          className="text-[#5a3700] hover:underline mb-6 flex items-center gap-2"
        >
          ← Quay lại
        </button>

        <h1 className="text-center text-3xl md:text-4xl font-bold text-[#7d4b00] mb-10">
          THÔNG TIN CẬP NHẬT
        </h1>

        {loading ? (
          <p className="text-center">Đang tải dữ liệu...</p>
        ) : !news ? (
          <p className="text-center">Không tìm thấy dữ liệu.</p>
        ) : (
          <div className="bg-[#353515] text-[#f2c94c] rounded-2xl  shadow-lg p-6">
            {/* Version */}
            <div className="bg-[#2b2b0f] rounded-lg text-center py-3 mb-6">
              <span className="font-bold text-lg">{news.title}</span>
            </div>

            {/* Nội dung chi tiết */}
            <div className="bg-[#f5e9d7] text-[#5a3700] rounded-lg p-6 leading-relaxed whitespace-pre-line min-h-[300px]">
              {news.content}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NewsDetailPage;
