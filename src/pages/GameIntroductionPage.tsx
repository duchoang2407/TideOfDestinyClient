import React from "react";
// Import header chung
import Footer from "../component/Footer/Footer"; // Import footer chung

const GameIntroductionPage: React.FC = () => {
  return (
    <div className="bg-[#f5e9d7] min-h-screen flex flex-col">
      {/* Content */}
      <main className="max-w-5xl mx-auto py-10 px-4 flex-grow">
        <h1 className="text-center text-4xl font-bold mb-10">GIỚI THIỆU</h1>

        {/* Bối cảnh */}
        <section className="grid md:grid-cols-2 gap-6 mb-10 items-center">
          <img
            src="/images/boicanh.png"
            alt="Bối cảnh"
            className="rounded-lg shadow-md"
          />
          <div className="bg-[#d8c4a6] p-6 rounded-lg shadow-md">
            <h2 className="font-bold text-xl mb-2">BỐI CẢNH</h2>
            <p>
              Sau thắng lợi của cuộc kháng chiến chống Pháp năm 1954, đất nước
              ta bước vào thời kỳ xây dựng CNXH. Trong bối cảnh miền Nam vẫn
              dưới chính quyền tay sai Mỹ - Ngụy, nhân dân cả nước bước vào giai
              đoạn mới của cuộc kháng chiến chống Mỹ cứu nước, thống nhất đất
              nước.
            </p>
          </div>
        </section>

        {/* Cốt truyện */}
        <section className="grid md:grid-cols-2 gap-6 mb-10 items-center">
          <div className="bg-[#d8c4a6] p-6 rounded-lg shadow-md order-2 md:order-1">
            <h2 className="font-bold text-xl mb-2">CỐT TRUYỆN</h2>
            <p>
              Ngày 30 tháng 4 năm 2075, bạn trong vai là một nhà khoa học từ quá
              khứ đến trong giấc mơ, chứng kiến những tàn tích chiến tranh. Bối
              cảnh đưa người chơi vào hành trình khám phá, chiến đấu, và khôi
              phục ký ức dân tộc.
            </p>
          </div>
          <img
            src="/images/cottruyen.png"
            alt="Cốt truyện"
            className="rounded-lg shadow-md order-1 md:order-2"
          />
        </section>

        {/* Nhân vật */}
        <section className="grid md:grid-cols-2 gap-6 mb-10 items-center">
          <img
            src="/images/nhanvat.png"
            alt="Nhân vật"
            className="rounded-lg shadow-md"
          />
          <div className="bg-[#d8c4a6] p-6 rounded-lg shadow-md">
            <h2 className="font-bold text-xl mb-2">NHÂN VẬT</h2>
            <p>
              Đây là nhân vật chính trong trò chơi, mang hình ảnh chiến sĩ nhân
              dân với phong thái kiên cường, trí tuệ và lòng quả cảm. Sẵn sàng
              chiến đấu để bảo vệ tương lai dân tộc.
            </p>
          </div>
        </section>
      </main>

      {/* Footer (dùng chung) */}
      <Footer />
    </div>
  );
};

export default GameIntroductionPage;
