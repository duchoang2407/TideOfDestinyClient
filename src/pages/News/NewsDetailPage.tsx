import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "../../component/Footer/Footer";
// import { Link } from "react-router-dom";

// 🔹 Data giả (sau này bạn có thể import từ file chung)
const updates = [
  {
    version: "v0.2.8",
    date: "25-02-2025",
    items: [
      "Fix lỗi khi thay bằng đạn.",
      "Fix bug góc lag.",
      "Thêm hướng dẫn khi bắn súng.",
      "Thay đổi một quest và main quest của nhân vật Lập.",
      "Thêm hệ thống hồi máu và tự điểm hồi sinh.",
    ],
  },
  {
    version: "v0.2",
    date: "10-01-2025",
    items: [
      "Thêm vũ khí mới, bảng đạn.",
      "Thêm các kỹ năng đặc trưng của nhân vật.",
      "Fix lỗi khi vào Quest.",
      "Fix lỗi map khi load vào game.",
    ],
  },
];

const NewsDetailPage: React.FC = () => {
  const { version } = useParams<{ version: string }>(); // lấy param từ URL
  const navigate = useNavigate();

  // tìm dữ liệu theo version
  const update = updates.find((u) => u.version === version);

  if (!update) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#c4a875]">
        <p className="text-xl">Không tìm thấy thông tin cập nhật</p>
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
          THÔNG TIN CẬP NHẬT
        </h1>

        {/* Card */}
        <div className="bg-[#2f3315] p-6 rounded-2xl shadow-lg">
          {/* Version */}
          <div className="bg-[#3a4d28] text-yellow-300 font-bold text-xl text-center py-3 rounded-md mb-6">
            {update.version}
          </div>

          {/* Content */}
          <div className="bg-white p-6 rounded-xl">
            <p className="text-right text-sm text-gray-600 mb-4">
              {update.date}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              {update.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsDetailPage;
