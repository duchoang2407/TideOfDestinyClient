import React from "react";
import Footer from "../component/Footer/Footer";
import BG from "../assest/bg.png";
import epicgames from "../assest/epicgames.svg";
import steam from "../assest/steam.svg";

const HomePage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Nội dung trang */}
      <main className="flex-1">
        {/* Banner */}
        <section
          className="relative w-full h-[400px] flex items-center justify-center text-white"
          style={{
            backgroundImage: `url(${BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay để chữ dễ đọc */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Nội dung */}
          <div className="relative max-w-5xl w-full flex items-center px-8">
            {/* Logo bên trái
            <div className="w-1/3 flex justify-center">
              <img
                src={Logo}
                alt="Logo"
                className="w-40 h-40 object-contain bg-white/80 rounded"
              />
            </div> */}

            {/* Tiêu đề + nút bên phải */}
            <div className="w-2/3 flex flex-col items-start space-y-4">
              <h1 className="text-2xl md:text-3xl font-bold">
                Ra mắt trên các nền tảng
              </h1>
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#2f301e] border-solid border-[white] border-2 px-4 py-2 rounded hover:bg-green-900 transition flex items-center gap-2">
                  Tải xuống PC
                </button>
                <button className="bg-[#2f301e] border-solid border-[white] border-2 px-4 py-2 rounded hover:bg-green-900 transition flex items-center gap-2">
                  <img
                    src={epicgames}
                    alt="Epic Games"
                    className="w-5 h-5 object-contain"
                  />
                  <span>Epic</span>
                </button>

                <button className="bg-[#2f301e] border-solid border-[white] border-2 px-4 py-2 rounded hover:bg-green-900 transition flex items-center gap-2">
                  <img
                    src={steam}
                    alt="Steam"
                    className="w-5 h-5 object-contain"
                  />
                  <span>Steam</span>
                </button>
              </div>
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
