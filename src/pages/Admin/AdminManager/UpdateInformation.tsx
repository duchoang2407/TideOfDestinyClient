import React, { useEffect, useState } from "react";
import SideBar from "../../../component/sidebar/Sidebar";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  Clock,
  FileText,
  Users,
} from "lucide-react";
import Pagination from "../../../component/Pagination";
import axiosInstance from "../../../component/config/axiosConfig";
import UpdateModal from "../GameModal/UpdateModal";
import UpdateAddModal from "../GameModal/UpdateAddModal";
import ConfirmModal from "../GameModal/ConfirmModal";
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  authorId: string;
  newsCategory: number;
  authorname: string;
}

const UpdateInformation: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  // Modal states
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/News", {
        params: { newsCategory: 0 },
      });
      if (Array.isArray(res.data)) {
        const filtered = res.data.filter((p: Post) => p.newsCategory === 0);
        setPosts(filtered);
      } else setPosts([]);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setPosts([]);
    }
  };

  const openEditModal = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/News/${id}`);
      setEditingPost(res.data);
      setIsEditOpen(true);
    } catch (err) {
      console.error("❌ Fetch detail error:", err);
    }
  };

  const handleAdd = async (data: {
    title: string;
    content: string;
    newsCategory: number;
    imageUrl?: File | null;
  }) => {
    try {
      const formData = new FormData();
      formData.append("Title", data.title);
      formData.append("Content", data.content);
      formData.append("NewsCategory", data.newsCategory.toString());
      if (data.imageUrl instanceof File)
        formData.append("ImageUrl", data.imageUrl);
      await axiosInstance.post("/News", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchPosts();
      setIsAddOpen(false);
    } catch (err) {
      console.error("❌ Add error:", err);
    }
  };

  const handleEdit = async (data: {
    id: string;
    title: string;
    content: string;
    imageUrl?: File | null;
    newsCategory: number;
    removeCurrentImage?: boolean;
  }) => {
    try {
      const formData = new FormData();
      formData.append("Title", data.title);
      formData.append("Content", data.content);
      formData.append("NewsCategory", data.newsCategory.toString());
      if (data.imageUrl instanceof File) {
        formData.append("ImageUrl", data.imageUrl);
        formData.append("RemoveCurrentImage", "false");
      } else {
        formData.append(
          "RemoveCurrentImage",
          data.removeCurrentImage ? "true" : "false"
        );
      }
      await axiosInstance.put(`/News/${data.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchPosts();
      setIsEditOpen(false);
      setEditingPost(null);
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

  const filteredPosts = posts.filter((p) => {
    const keywords = search.toLowerCase().trim().split(/\s+/);
    const text = (p.title + " " + p.content).toLowerCase();
    return keywords.some((word) => text.includes(word));
  });

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const startIndex = currentPage * pageSize;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-amber-100">
      <SideBar />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <motion.div
          className="mb-8 text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">🛠️ Game Update Dashboard</h1>
          <p className="text-gray-600">
            Manage and track all update posts for your game.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FileText className="text-orange-500" size={36} />
            <div>
              <p className="text-sm text-gray-500">Total Updates</p>
              <p className="text-2xl font-bold">{posts.length}</p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Users className="text-blue-500" size={36} />
            <div>
              <p className="text-sm text-gray-500">Authors</p>
              <p className="text-2xl font-bold">
                {new Set(posts.map((p) => p.authorname)).size}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Clock className="text-green-500" size={36} />
            <div>
              <p className="text-sm text-gray-500">Latest Update</p>
              <p className="text-2xl font-bold">
                {posts.length
                  ? new Date(
                      Math.max(
                        ...posts.map((p) => new Date(p.publishedAt).getTime())
                      )
                    ).toLocaleDateString("vi-VN")
                  : "—"}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Search + Add */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex border rounded-lg overflow-hidden w-[400px] bg-white shadow-sm">
            <input
              type="text"
              placeholder="Search update..."
              className="flex-1 px-3 py-2 outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-orange-500 text-white px-4 flex items-center gap-2 hover:bg-orange-600 transition">
              <Search size={16} /> Search
            </button>
          </div>
          <button
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
            onClick={() => setIsAddOpen(true)}
          >
            <Plus size={16} /> Add New
          </button>
        </div>

        {/* Table */}
        <motion.div
          className="bg-white shadow-md rounded-2xl overflow-hidden animate-fadeInUp border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Published</th>
                <th className="px-4 py-3">Content</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((p, i) => (
                <motion.tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {p.title}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(p.publishedAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-3 truncate max-w-[300px] text-gray-600">
                    {p.content}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {p.authorname ?? "Ẩn danh"}
                  </td>
                  <td className="px-4 py-3 flex justify-center gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      onClick={() => openEditModal(p.id)}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => {
                        setDeleteId(p.id);
                        setIsConfirmOpen(true);
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <div className="mt-4 flex justify-center">
          <Pagination
            total={totalPages}
            current={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </main>

      {/* Modals */}
      <UpdateAddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAdd}
      />
      <UpdateModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={editingPost}
        onSubmit={handleEdit}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UpdateInformation;
