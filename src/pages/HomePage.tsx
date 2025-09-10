import React from "react";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";

const HomePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1">
        {/* Banner */}
        <section className="w-full bg-black flex flex-col items-center justify-center py-10">
          <div className="w-3/4 h-64 bg-gray-700 flex items-center justify-center">
            <span className="text-xl">BANNER GAME</span>
          </div>
          <div className="mt-4 flex space-x-4">
            <button className="bg-red-600 px-4 py-2 rounded">Tải về PC</button>
            <button className="bg-green-600 px-4 py-2 rounded">
              Tải về Mobile
            </button>
            <button className="bg-gray-500 px-4 py-2 rounded">Share</button>
          </div>
        </section>

        {/* About Us */}
        <section className="w-full flex flex-col md:flex-row items-center bg-gray-100 text-gray-900 py-12">
          <div className="md:w-1/2 px-8">
            <h2 className="text-2xl font-bold mb-4">ABOUT US</h2>
            <p>
              Chúng tôi là đội ngũ sáng tạo phát triển trò chơi. Chúng tôi mang
              những trải nghiệm thú vị đến với game thủ trên toàn cầu với một
              hành trình nhập vai sống động.
            </p>
          </div>
          <div className="md:w-1/2 px-8">
            <div className="w-full h-48 bg-yellow-400 flex items-center justify-center">
              HÌNH ẢNH ABOUT
            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section className="w-full bg-gray-200 text-gray-900 py-10 flex flex-col items-center">
          <h3 className="mb-4 text-lg font-semibold">
            Theo dõi thông tin mới nhất
          </h3>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="px-4 py-2 border border-gray-400 rounded w-64"
            />
            <button className="bg-blue-600 px-4 py-2 text-white rounded">
              Theo dõi ngay
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
