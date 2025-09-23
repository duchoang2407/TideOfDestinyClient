import React from "react";
import Footer from "../../component/Footer/Footer";
import BG from "../../assest/bg.png";
import epicgames from "../../assest/epicgames.svg";
import steam from "../../assest/steam.svg";
import bg2 from "../../assest/bg2.png";
import bg3 from "../../assest/bg3.png";

const PlayerHomePage: React.FC = () => {
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
        <section className="w-full flex flex-col md:flex-row items-center bg-[#2b2d1d]">
          <div className="md:w-full px-10 text-white">
            <h2 className="text-3xl font-bold mb-4">ABOUT US</h2>
            <p className="text-lg leading-relaxed">
              Chúng tôi là đội ngũ nhỏ mới được phát triển. Chúng tôi mong muốn
              trò chơi này có thể phổ biến được lịch sử Việt Nam đối với mọi
              người theo phương thức mới.
            </p>
          </div>

          {/* Ảnh sát mép phải */}
          <div className="md:w-1/2 flex justify-end">
            <img
              src={bg2}
              alt="About Us"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        </section>

        {/* Subscribe */}
        <section className="w-full text-white">
          {/* Ảnh header phía trên */}
          <div
            className="w-full h-40 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg3})` }}
          ></div>

          {/* Nội dung subscribe */}
          <div className="bg-[#2b2d1d] py-12 px-10 flex flex-col md:flex-row md:items-start md:justify-between">
            {/* Bên trái: Tiêu đề */}
            <h3 className="mb-4 md:mb-0 text-xl font-semibold">
              Theo dõi thông tin mới nhất
            </h3>

            {/* Bên phải: input + button + ghi chú */}
            <div className="flex flex-col items-start">
              {/* Input + Button */}
              <div className="flex items-center  space-x-2 mb-2">
                <input
                  type="email"
                  placeholder="Email:"
                  className="px-4 py-2 border border-gray-300 rounded text-black w-64"
                />
                <button className="bg-blue-600 px-6 py-2 text-white rounded hover:bg-blue-700">
                  Theo dõi ngay
                </button>
              </div>

              {/* Ghi chú nhỏ */}
              <p className="text-xs text-gray-300 text-left">
                ○ Đồng ý thu thập và sử dụng dữ liệu cá nhân để nhận lại mọi sự
                kiện và thông tin trò chơi.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PlayerHomePage;
