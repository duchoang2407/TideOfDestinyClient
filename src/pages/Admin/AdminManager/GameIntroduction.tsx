import React, { useState, useEffect } from "react";
import SideBar from "../../../component/sidebar/Sidebar";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import Pagination from "../../../component/Pagination";
import ConfirmModal from "../GameModal/ConfirmModal";
import axiosInstance from "../../../component/config/axiosConfig";
import EditModal from "../GameModal/EditModal";
import AddModal from "../GameModal/AddModal"; // ✅ thêm import

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  publishedAt: string;
  authorId: string;
  newsCategory: number;
  authorname: string;
}

const GameIntroduction: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ✅ Add modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/News", {
        params: { newsCategory: 1 },
      });

      if (Array.isArray(res.data)) {
        const filtered = res.data.filter((p: Post) => p.newsCategory === 1);
        setPosts(filtered);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setPosts([]);
    }
  };

  // mở modal edit
  const openEditModal = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/News/${id}`);
      setEditPost(res.data);
      setIsEditModalOpen(true);
    } catch (err) {
      console.error("❌ Fetch detail error:", err);
    }
  };

  const handleUpdate = async (data: Post) => {
    try {
      await axiosInstance.put(`/News/${data.id}`, data);
      fetchPosts();
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axiosInstance.delete(`/News/${deleteId}`);
      fetchPosts();
      setIsConfirmOpen(false);
      setDeleteId(null);
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  // ✅ Thêm mới
  const handleAdd = async (data: {
    title: string;
    content: string;
    newsCategory: number;
  }) => {
    try {
      await axiosInstance.post("/News", {
        ...data,
        imageUrl: null, // cái này modal add không có ảnh
      });
      fetchPosts();
    } catch (err) {
      console.error("❌ Add error:", err);
    }
  };

  const filteredPosts = posts.filter((p) => {
    const keywords = search.toLowerCase().trim().split(/\s+/);
    const text = (p.title + " " + p.content).toLowerCase();
    return keywords.some((word) => text.includes(word)); // chỉ cần 1 từ match là được
  });

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const startIndex = currentPage * pageSize;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  return (
    <div className="flex min-h-screen bg-[#d9b778]">
      <SideBar />

      <main className="flex-1 p-6">
        {/* Search + Add */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex border rounded-lg overflow-hidden w-[400px]">
            <input
              type="text"
              placeholder="search post..."
              className="flex-1 px-3 py-2 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-[#1a2a3d] text-white px-4 flex items-center gap-2"
              onClick={() => console.log("🔍 Search keyword:", search)}
            >
              <Search size={16} /> Submit
            </button>
          </div>
          <button
            className="flex items-center gap-2 bg-[#1a2a3d] text-white px-4 py-2 rounded"
            onClick={() => setIsAddModalOpen(true)} // ✅ mở modal add
          >
            <Plus size={16} /> Add
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Tiêu đề</th>
                <th className="px-4 py-2">Ngày đăng</th>
                <th className="px-4 py-2">Nội dung</th>
                <th className="px-4 py-2">Tác giả</th>
                <th className="px-4 py-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="px-4 py-2 font-bold">{p.title}</td>
                  <td className="px-4 py-2">
                    {new Date(p.publishedAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2 truncate max-w-[300px]">
                    {p.content}
                  </td>
                  <td className="px-4 py-2">{p.authorname ?? "Ẩn danh"}</td>
                  <td className="px-4 py-2 flex justify-center gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => openEditModal(p.id)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        setDeleteId(p.id);
                        setIsConfirmOpen(true);
                      }}
                    >
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

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={editPost}
        onSubmit={handleUpdate}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
      />

      {/* ✅ Add Modal */}
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
      />
    </div>
  );
};

export default GameIntroduction;
