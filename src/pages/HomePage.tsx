import React from "react";
import Footer from "../component/Footer/Footer";

const HomePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Nội dung trang */}
      <main className="flex-1">
        {/* Banner */}
        <section className="relative w-full h-[400px] bg-[url('/banner.jpg')] bg-cover bg-center flex flex-col items-center justify-center text-white">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-2xl font-bold mb-4">
              Ra mắt trên các nền tảng
            </h1>
            <div className="flex space-x-4 justify-center">
              <button className="bg-gray-700 px-4 py-2 rounded">
                Tải về PC
              </button>
              <button className="bg-gray-700 px-4 py-2 rounded">
                Tải về Mobile
              </button>
              <button className="bg-gray-700 px-4 py-2 rounded">Share</button>
            </div>
          </div>
        </section>

        {/* About Us */}
        <section className="w-full flex flex-col md:flex-row items-center py-16 bg-white">
          <div className="md:w-1/2 px-10">
            <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
            <p className="text-lg leading-relaxed">
              Chúng tôi là đội ngũ sáng tạo phát triển. Chúng tôi mang những
              trải nghiệm thú vị đến với game thủ tại Việt Nam để lại một hành
              trình nhập vai sống động.
            </p>
          </div>
          <div className="md:w-1/2 px-10">
            <div className="w-full h-56 bg-yellow-400 flex items-center justify-center text-xl font-bold">
              HÌNH ẢNH ABOUT
            </div>
          </div>
        </section>

        {/* Subscribe */}
        <section className="w-full bg-gray-200 text-gray-900 py-12 text-center">
          <h3 className="mb-4 text-xl font-semibold">
            Theo dõi thông tin mới nhất
          </h3>
          <div className="flex justify-center space-x-2">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 border border-gray-400 rounded w-64"
            />
            <button className="bg-blue-600 px-6 py-2 text-white rounded">
              Theo dõi ngay
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
