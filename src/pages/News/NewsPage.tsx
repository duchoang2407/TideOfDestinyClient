import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination";
import axiosInstance from "../../component/config/axiosConfig";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
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
        console.log("API data:", response.data);
        setNews(response.data);
      } catch (error: any) {
        console.error("Error fetching news:", error.message);
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
    <div className="w-full min-h-screen bg-[#c4a875] flex flex-col">
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-center mb-8">
          THÔNG TIN CẬP NHẬT
        </h1>

        {loading ? (
          <p className="text-center text-lg">Đang tải dữ liệu...</p>
        ) : currentData.length === 0 ? (
          <p className="text-center text-lg">Không có dữ liệu nào.</p>
        ) : (
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {currentData.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/news/${item.id}`)}
                className="relative flex items-stretch cursor-pointer"
              >
                <div className="relative bg-[#3a4d28] text-yellow-300 font-bold text-lg flex items-center justify-center px-6 py-8 rounded-l-2xl shadow-md">
                  {item.title}
                  <div className="absolute right-0 top-0 h-full w-6 bg-[#3a4d28] rounded-r-2xl"></div>
                </div>

                <div className="flex-1 bg-white p-6 rounded-r-2xl shadow-lg hover:shadow-2xl transition">
                  <p className="text-gray-800">{item.content}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <Pagination
                total={totalPages}
                current={page}
                onChange={setPage}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NewsPage;
