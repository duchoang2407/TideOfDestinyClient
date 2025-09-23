import React, { useEffect, useState } from "react";
import Footer from "../../component/Footer/Footer";
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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosInstance.get("/News");
        console.log("News response:", response.data);
        setNews(response.data);
      } catch (error: any) {
        console.error("Error fetching news:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-[#f5e9d7] min-h-screen flex flex-col">
      <main className="max-w-5xl mx-auto py-12 px-4 flex-grow">
        {/* Tiêu đề */}
        <h1 className="text-center text-4xl font-bold mb-14 text-[#7d4b00] underline decoration-2">
          GIỚI THIỆU
        </h1>

        {loading ? (
          <p className="text-center text-lg">Đang tải dữ liệu...</p>
        ) : news.length === 0 ? (
          <p className="text-center text-lg">Không có dữ liệu nào.</p>
        ) : (
          news.map((item, index) => (
            <section
              key={item.id}
              className="grid md:grid-cols-2 gap-10 mb-16 items-center"
            >
              {/* Ảnh (so le) */}
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`rounded-2xl shadow-lg w-full h-72 object-cover ${
                    index % 2 === 1 ? "order-2 md:order-1" : ""
                  }`}
                />
              )}

              {/* Box nội dung */}
              <div
                className={`bg-[#d8c4a6] p-8 rounded-2xl shadow-lg ${
                  index % 2 === 1 ? "order-1 md:order-2" : ""
                }`}
              >
                <h2 className="font-bold text-2xl mb-4 text-[#5a3700]">
                  {item.title.toUpperCase()}
                </h2>
                <p className="leading-relaxed text-lg text-gray-800 whitespace-pre-line">
                  {item.content}
                </p>
              </div>
            </section>
          ))
        )}
      </main>

      <Footer />
    </div>
  );
};

export default GameIntroductionPage;
