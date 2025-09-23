import React, { useState } from "react";
import SideBar from "../../../component/sidebar/Sidebar";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import Pagination from "../../../component/Pagination"; // import component bạn viết

const GameIntroduction: React.FC = () => {
  // Mock data (ví dụ dài hơn để test phân trang)
  const [posts] = useState([
    {
      id: 1,
      type: "Bối cảnh",
      date: "25/02/2025",
      desc: "Chiến tranh đang diễn ra vào...",
    },
    {
      id: 2,
      type: "Chế Độ",
      date: "25/02/2025",
      desc: "Game sẽ theo chế độ cốt...",
    },
    { id: 3, type: "Nhân vật", date: "25/02/2025", desc: "Chủ nắm..." },
    { id: 4, type: "Nhân vật", date: "25/02/2025", desc: "Chủ nắm..." },
    { id: 5, type: "Nhân vật", date: "25/02/2025", desc: "Chủ nắm..." },
    { id: 6, type: "Nhân vật", date: "25/02/2025", desc: "Chủ nắm..." },
    { id: 7, type: "Nhân vật", date: "25/02/2025", desc: "Chủ nắm..." },
    { id: 8, type: "Nhân vật", date: "25/02/2025", desc: "Chủ nắm..." },
    { id: 9, type: "Nhân vật", date: "25/02/2025", desc: "Chủ nắm..." },
  ]);

  // State cho pagination
  const [currentPage, setCurrentPage] = useState(0); // index trang
  const pageSize = 10; // số item mỗi trang
  const totalPages = Math.ceil(posts.length / pageSize);

  // Cắt dữ liệu theo trang
  const startIndex = currentPage * pageSize;
  const currentPosts = posts.slice(startIndex, startIndex + pageSize);

  return (
    <div className="flex min-h-screen bg-[#d9b778]">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Search + Add */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex border rounded-lg overflow-hidden w-[400px]">
            <input
              type="text"
              placeholder="search post..."
              className="flex-1 px-3 py-2 outline-none"
            />
            <button className="bg-[#1a2a3d] text-white px-4 flex items-center gap-2">
              <Search size={16} /> Submit
            </button>
          </div>
          <button className="flex items-center gap-2 bg-[#1a2a3d] text-white px-4 py-2 rounded">
            <Plus size={16} /> Add
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Loại</th>
                <th className="px-4 py-2">Ngày</th>
                <th className="px-4 py-2">Mô tả</th>
                <th className="px-4 py-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="px-4 py-2">{p.type}</td>
                  <td className="px-4 py-2">{p.date}</td>
                  <td className="px-4 py-2">{p.desc}</td>
                  <td className="px-4 py-2 flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          total={totalPages}
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
};

export default GameIntroduction;
