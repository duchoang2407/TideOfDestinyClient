// ✅ FULL UpdateInformation.tsx (Layout Updated Exactly As Requested)

import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../../../component/sidebar/Sidebar";
import {
  Pencil,
  Trash2,
  Plus,
  Search,
  Clock,
  FileText,
  Users,
  Upload,
} from "lucide-react";
import Pagination from "../../../component/Pagination";
import axiosInstance from "../../../component/config/axiosConfig";
import UpdateModal from "../GameModal/UpdateModal";
import UpdateAddModal from "../GameModal/UpdateAddModal";
import ConfirmModal from "../GameModal/ConfirmModal";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

/* ------------ TYPES ------------ */
interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  authorId: string;
  newsCategory: number;
  authorname: string;
}

interface FileItem {
  id: string;
  fileName: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

const UpdateInformation: React.FC = () => {
  /* ------------- UPDATE POSTS ------------- */
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 10;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  /* ------------- FILES ------------- */
  const [files, setFiles] = useState<FileItem[]>([]);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  /* ------------- PRODUCTS CRUD ------------- */
  const [products, setProducts] = useState<Product[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null); // ✅ C-only modal
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  /* ------------- FETCH DATA ------------- */
  useEffect(() => {
    fetchPosts();
    fetchFiles();
    fetchProducts();
  }, []);

  const fetchPosts = async () => {
    const res = await axiosInstance.get("/News");
    setPosts(res.data.filter((p: Post) => p.newsCategory === 0));
  };

  const fetchFiles = async () => {
    const res = await axiosInstance.get("/FileGame");
    setFiles(res.data);
  };
  const deleteFile = async (id: string) => {
    await axiosInstance.delete(`/FileGame/${id}`);
    fetchFiles();
    toast.success("🗑 File deleted!");
  };

  const fetchProducts = async () => {
    const res = await axiosInstance.get("/Products");
    setProducts(res.data);
  };

  /* ✅ ADD / EDIT / DELETE PRODUCTS */
  const saveProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    await axiosInstance.post("/Products", {
      name: newProduct.name,
      price: Number(newProduct.price),
    });
    fetchProducts();
    setNewProduct({ name: "", price: "" });
    toast.success("✅ Product added!");
  };

  const updateProduct = async () => {
    if (!modalProduct) return;
    await axiosInstance.put(`/Products/${modalProduct.id}`, modalProduct);
    fetchProducts();
    setModalProduct(null);
    toast.success("✅ Product updated!");
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete product?")) return;
    await axiosInstance.delete(`/Products/${id}`);
    fetchProducts();
    toast.success("🗑 Deleted!");
  };

  /* ------------- POST ACTIONS ------------- */
  const openEditModal = async (id: string) => {
    const res = await axiosInstance.get(`/News/${id}`);
    setEditingPost(res.data);
    setIsEditOpen(true);
  };

  const handleDeletePost = async () => {
    if (!deleteId) return;
    await axiosInstance.delete(`/News/${deleteId}`);
    fetchPosts();
    setIsConfirmOpen(false);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((p) =>
      (p.title + p.content).toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  const currentPosts = filteredPosts.slice(
    currentPage * pageSize,
    currentPage * pageSize + pageSize
  );

  const totalPages = Math.ceil(filteredPosts.length / pageSize);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-amber-100">
      <SideBar />

      <main className="flex-1 p-8 space-y-10 overflow-auto">
        {/* ✅ Top: STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard
            icon={<FileText />}
            label="Total Updates"
            value={posts.length}
          />
          <StatCard
            icon={<Users />}
            label="Authors"
            value={new Set(posts.map((p) => p.authorname)).size}
          />
          <StatCard
            icon={<Clock />}
            label="Latest Update"
            value={
              posts.length
                ? new Date(
                    Math.max(
                      ...posts.map((p) => new Date(p.publishedAt).getTime())
                    )
                  ).toLocaleDateString("vi-VN")
                : "—"
            }
          />
        </div>

        {/* ✅ Update Posts Table */}
        <UpdateInfoTable
          search={search}
          setSearch={setSearch}
          currentPosts={currentPosts}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          openEditModal={openEditModal}
          setDeleteId={setDeleteId}
          setIsConfirmOpen={setIsConfirmOpen}
        />

        {/* ✅ Upload Game + Products Section SONG SONG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UploadFileSection
            fileUpload={fileUpload}
            setFileUpload={setFileUpload}
            handleUploadFile={async () => {
              if (!fileUpload) return;
              const form = new FormData();
              form.append("file", fileUpload);
              await axiosInstance.post("/FileGame", form);
              fetchFiles();
              toast.success("✅ Uploaded!");
            }}
            files={files}
            deleteFile={deleteFile}
          />

          {/* ✅ Product List & Add */}
          <motion.div className="bg-white p-6 rounded-2xl shadow-md border">
            <h2 className="font-bold text-xl mb-4">📦 Products</h2>

            {/* Input fields */}
            <div className="flex gap-3 mb-4">
              <input
                placeholder="Product name"
                className="border rounded-lg p-2 flex-1"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="border rounded-lg p-2 w-32"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <button
                className="bg-orange-500 text-white px-4 rounded-lg"
                onClick={saveProduct}
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Table */}
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-orange-50">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3 text-orange-600">
                      {p.price.toLocaleString()} VNĐ
                    </td>
                    <td className="p-3 text-center space-x-3">
                      <button
                        className="text-blue-600"
                        onClick={() => setModalProduct(p)}
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => deleteProduct(p.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        {/* ✅ CUỐI CÙNG: CRUD MODALS */}
        {modalProduct && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-2xl space-y-3">
              <h3 className="font-semibold text-lg">✏ Edit Product</h3>
              <input
                className="border p-2 rounded-lg w-full"
                value={modalProduct.name}
                onChange={(e) =>
                  setModalProduct({ ...modalProduct, name: e.target.value })
                }
              />
              <input
                type="number"
                className="border p-2 rounded-lg w-full"
                value={modalProduct.price}
                onChange={(e) =>
                  setModalProduct({
                    ...modalProduct,
                    price: Number(e.target.value),
                  })
                }
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setModalProduct(null)}>Cancel</button>
                <button
                  className="bg-orange-600 text-white px-3 py-2 rounded-lg"
                  onClick={updateProduct}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ✅ UPDATE POST MODALS */}
        <UpdateAddModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSubmit={() => fetchPosts()}
        />
        <UpdateModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          initialData={editingPost}
          onSubmit={() => fetchPosts()}
        />
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDeletePost}
        />
      </main>
    </div>
  );
};

/* ✅ SUB UI Component */
const StatCard = ({ icon, label, value }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow flex gap-4 items-center border-l-4 border-orange-500">
    <span className="text-orange-500">{icon}</span>
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const UpdateInfoTable = ({
  search,
  setSearch,
  currentPosts,
  totalPages,
  currentPage,
  setCurrentPage,
  openEditModal,
  setDeleteId,
  setIsConfirmOpen,
}: any) => (
  <motion.div className="bg-white shadow-md rounded-2xl border overflow-hidden">
    <div className="flex gap-3 p-4 border-b">
      <input
        className="border p-2 rounded-lg flex-1"
        placeholder="Search update..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="bg-orange-500 text-white px-4 rounded-lg flex items-center gap-2">
        <Search size={16} /> Search
      </button>
    </div>

    <table className="w-full text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3">Title</th>
          <th className="p-3">Published</th>
          <th className="p-3">Content</th>
          <th className="p-3">Author</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentPosts.map((p: Post) => (
          <tr key={p.id} className="border-b hover:bg-orange-50">
            <td className="p-3">{p.title}</td>
            <td className="p-3">
              {new Date(p.publishedAt).toLocaleDateString("vi-VN")}
            </td>
            <td className="p-3 truncate max-w-[300px]">{p.content}</td>
            <td className="p-3">{p.authorname}</td>
            <td className="p-3 text-center space-x-2">
              <button
                className="text-blue-600"
                onClick={() => openEditModal(p.id)}
              >
                <Pencil size={18} />
              </button>
              <button
                className="text-red-600"
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

    {/* Pagination */}
    <div className="p-4 flex justify-center">
      <Pagination
        total={totalPages}
        current={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  </motion.div>
);

const UploadFileSection = ({
  fileUpload,
  setFileUpload,
  handleUploadFile,
  files,
  deleteFile,
}: any) => (
  <motion.div className="bg-white p-6 rounded-2xl shadow-md border">
    <h3 className="font-semibold text-lg mb-4">📁 Upload Game File</h3>

    <div className="flex gap-3 mb-4">
      <input
        type="file"
        className="border p-2 rounded-lg flex-1"
        onChange={(e) => setFileUpload(e.target.files?.[0] ?? null)}
      />
      <button
        className="bg-green-600 px-4 text-white rounded-lg flex items-center gap-2"
        onClick={handleUploadFile}
      >
        <Upload size={16} /> Upload
      </button>
    </div>

    <table className="w-full text-left">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3">File name</th>
          <th className="p-3 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {files.map((f: FileItem) => (
          <tr key={f.id} className="border-b hover:bg-orange-50">
            <td className="p-3">{f.fileName}</td>
            <td className="p-3 text-center">
              <button className="text-red-600" onClick={() => deleteFile(f.id)}>
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

export default UpdateInformation;
