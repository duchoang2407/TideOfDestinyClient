import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axiosInstance from "../../component/config/axiosConfig";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt?: string;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // lấy id từ URL
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (!id) return;
        const res = await axiosInstance.get(`/News/${id}`);
        setNewsItem(res.data);
      } catch (err) {
        console.error("❌ Fetch detail error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#c4a875]">
        <p className="text-xl">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#c4a875]">
        <p className="text-xl">Không tìm thấy thông tin</p>
      </div>
    );
  }

  return (
    <div className="bg-[#c4a875] min-h-screen flex flex-col">
      <main className="max-w-3xl mx-auto py-10 px-4 flex-grow">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-800 mb-4 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại
        </button>

        {/* Title */}
        <h1 className="text-center text-3xl font-bold mb-8">
          {newsItem.title}
        </h1>

        {/* Card */}
        <div className="bg-[#2f3315] p-6 rounded-2xl shadow-lg">
          {/* Content */}
          <div className="bg-white p-6 rounded-xl">
            {newsItem.publishedAt && (
              <p className="text-right text-sm text-gray-600 mb-4">
                {new Date(newsItem.publishedAt).toLocaleDateString("vi-VN")}
              </p>
            )}

            {newsItem.imageUrl && (
              <img
                src={newsItem.imageUrl}
                alt={newsItem.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}

            <p className="text-gray-800 whitespace-pre-line">
              {newsItem.content}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsDetailPage;
