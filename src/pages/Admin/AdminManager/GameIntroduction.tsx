import React, { useState, useEffect } from "react";
import SideBar from "../../../component/sidebar/Sidebar";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  FileText,
  Users,
  Clock,
} from "lucide-react";
import Pagination from "../../../component/Pagination";
import ConfirmModal from "../GameModal/ConfirmModal";
import axiosInstance from "../../../component/config/axiosConfig";
import EditModal from "../GameModal/EditModal";
import AddModal from "../GameModal/AddModal";
import { motion } from "framer-motion";

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalAuthors: 0,
    latestPost: "",
  });

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

        const authors = new Set(filtered.map((p) => p.authorname));
        const latest = filtered.length
          ? new Date(
              Math.max(
                ...filtered.map((p) => new Date(p.publishedAt).getTime())
              )
            ).toLocaleDateString("vi-VN")
          : "—";

        setStats({
          totalPosts: filtered.length,
          totalAuthors: authors.size,
          latestPost: latest,
        });
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setPosts([]);
    }
  };

  const openEditModal = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/News/${id}`);
      setEditPost(res.data);
      setIsEditModalOpen(true);
    } catch (err) {
      console.error("❌ Fetch detail error:", err);
    }
  };

  const handleUpdate = async (data: {
    id: string;
    title: string;
    content: string;
    imageUrl?: File | null;
    newsCategory: number;
    removeCurrentImage?: boolean;
  }) => {
    try {
      const formData = new FormData();
      formData.append("Title", data.title || "");
      formData.append("Content", data.content || "");
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

  const handleAdd = async (formData: FormData) => {
    try {
      await axiosInstance.post("/News", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchPosts();
    } catch (err) {
      console.error("❌ Add error:", err);
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
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-orange-100">
      <SideBar />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header animation */}
        <motion.div
          className="mb-8 text-gray-800"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">
            🎮 Game Introduction Dashboard
          </h1>
          <p className="text-gray-600">
            Manage and view your game introduction posts easily.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            {
              icon: <FileText className="text-orange-500" size={36} />,
              label: "Total Posts",
              value: stats.totalPosts,
            },
            {
              icon: <Users className="text-blue-500" size={36} />,
              label: "Authors",
              value: stats.totalAuthors,
            },
            {
              icon: <Clock className="text-green-500" size={36} />,
              label: "Latest Post",
              value: stats.latestPost,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:scale-[1.03] transition-transform duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              {item.icon}
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search + Add */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex border rounded-xl overflow-hidden w-[420px] bg-white shadow-sm">
            <input
              type="text"
              placeholder="Search post..."
              className="flex-1 px-3 py-2 outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-orange-500 text-white px-4 flex items-center gap-2 hover:bg-orange-600 transition">
              <Search size={16} /> Search
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition shadow-md"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} /> Add New
          </motion.button>
        </motion.div>

        {/* Table with animation */}
        <motion.div
          className="bg-white shadow-md rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Published</th>
                <th className="px-4 py-2">Content</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="border-b hover:bg-orange-50 transition"
                >
                  <td className="px-4 py-2 font-semibold text-gray-800">
                    {p.title}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(p.publishedAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-2 truncate max-w-[300px] text-gray-600">
                    {p.content}
                  </td>
                  <td className="px-4 py-2 text-gray-700">
                    {p.authorname ?? "Ẩn danh"}
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-blue-600 hover:text-blue-800 transition"
                      onClick={() => openEditModal(p.id)}
                    >
                      <Pencil size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => {
                        setDeleteId(p.id);
                        setIsConfirmOpen(true);
                      }}
                    >
                      <Trash2 size={18} />
                    </motion.button>
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

        {/* Modals */}
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={editPost}
          onSubmit={handleUpdate}
        />

        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDelete}
        />

        <AddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAdd}
        />
      </main>
    </div>
  );
};

export default GameIntroduction;
