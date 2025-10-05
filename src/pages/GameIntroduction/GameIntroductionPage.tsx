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

const GameIntroductionPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await axiosInstance.get("/News", {
          params: { category: 1 }, // ✅ Game Introduction
        });
        setNews(response.data);
      } catch (error: any) {
        console.error("Error fetching game intro:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIntro();
  }, []);

  // ✅ Tính toán phân trang
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const currentData = news.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-[#c4a875] min-h-screen flex flex-col">
      <main className="max-w-6xl mx-auto py-12 px-6 flex-grow">
        <h1 className="text-center text-4xl font-bold mb-14 text-[#7d4b00] underline decoration-2">
          GIỚI THIỆU
        </h1>

        {loading ? (
          <p className="text-center text-lg">Đang tải dữ liệu...</p>
        ) : currentData.length === 0 ? (
          <p className="text-center text-lg">Không có dữ liệu nào.</p>
        ) : (
          <div className="flex flex-col gap-12">
            {currentData.map((item, index) => (
              <div
                key={item.id}
                onClick={() => navigate(`/game-introduction/${item.id}`)}
                className="border-4 border-[#7d4b00] rounded-3xl p-6 shadow-xl cursor-pointer hover:scale-[1.01] hover:shadow-2xl transition"
              >
                <section className="grid md:grid-cols-2 gap-10 items-center">
                  {/* Ảnh */}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className={`rounded-2xl shadow-lg w-full h-80 object-cover ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}
                    />
                  )}
                  {/* Nội dung */}
                  <div
                    className={`bg-[#d8c4a6] p-6 rounded-2xl shadow-lg min-w-[500px] min-h-[250px] flex flex-col justify-between ${
                      index % 2 === 1 ? "md:order-1" : ""
                    }`}
                  >
                    <h2 className="font-bold text-2xl mb-4 text-[#5a3700]">
                      {item.title.toUpperCase()}
                    </h2>
                    <p className="leading-relaxed text-lg text-gray-800 line-clamp-3">
                      {item.content}
                    </p>
                    <p className="mt-4 text-right text-[#7d4b00] font-semibold underline">
                      Xem chi tiết →
                    </p>
                  </div>
                </section>
              </div>
            ))}

            {/* ✅ Pagination giống trang News */}
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

export default GameIntroductionPage;
