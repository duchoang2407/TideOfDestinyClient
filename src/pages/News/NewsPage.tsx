import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../component/Footer/Footer";
import Pagination from "../../component/Pagination";

const updates = [
  {
    version: "v0.2.8",
    items: [
      "Fix lại lỗi khi thay bằng đạn.",
      "Bật bóng góc nhìn.",
      "Thêm quái siêu boss sinh sản.",
      "Thêm kỹ năng của người chơi: Quét cấu hình vết lực.",
      "Thêm hệ thống nhiệm vụ và điểm thưởng sinh.",
    ],
  },
  {
    version: "v0.2",
    items: [
      "Thêm vũ khí mới, bằng đạn.",
      "Thêm các hiệu ứng đặc biệt cho nhân vật.",
      "Fix lỗi về kỹ năng boss.",
      "Fix lỗi map khi load vào game.",
    ],
  },
  {
    version: "v0.1",
    items: [
      "Thiết kế, dựng hình ảnh nhân vật.",
      "Thiết kế bản đồ.",
      "Một số nhân vật có thể tương tác.",
    ],
  },
];

const NewsPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(updates.length / itemsPerPage);
  const navigate = useNavigate();

  const startIndex = page * itemsPerPage;
  const currentData = updates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-[#c4a875] flex flex-col">
      {/* Main */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-center mb-8">
          THÔNG TIN CẬP NHẬT
        </h1>
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {/* ✅ chỉ render 3 item trong trang */}
          {currentData.map((update, i) => (
            <div
              key={i}
              onClick={() => navigate(`/news/${update.version}`)} // 👉 điều hướng sang detail
              className="flex bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
            >
              {/* Version badge */}
              <div className="bg-[#3a4d28] text-yellow-300 font-bold text-xl flex items-center justify-center px-6 py-10">
                {update.version}
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <ul className="list-disc list-inside space-y-2 text-gray-800">
                  {update.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* ✅ Pagination nhận tổng số trang, không phải tổng số sản phẩm */}
          <div className="flex justify-center">
            <Pagination total={totalPages} current={page} onChange={setPage} />
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsPage;
