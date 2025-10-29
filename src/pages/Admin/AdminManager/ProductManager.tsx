import React, { useEffect, useState } from "react";
import axiosInstance from "../../../component/config/axiosConfig";
import SideBar from "../../../component/sidebar/Sidebar";
import { Pencil, Trash2, Plus } from "lucide-react";
import AddProductModal from "./ProductModal/AddProductModal";
import EditProductModal from "./ProductModal/EditProductModal";
import ConfirmDeleteModal from "./ProductModal/ConfirmDeleteModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Modal states
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch {
      toast.error("Không tải được danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (data: { name: string; price: number }) => {
    try {
      await axiosInstance.post("/products", data);
      toast.success("✅ Thêm sản phẩm thành công!");
      fetchProducts();
    } catch {
      toast.error("❌ Thêm thất bại!");
    }
  };

  const handleUpdate = async (data: {
    id: string;
    name: string;
    price: number;
  }) => {
    try {
      await axiosInstance.put(`/products/${data.id}`, data);
      toast.success("✅ Cập nhật sản phẩm thành công!");
      fetchProducts();
    } catch {
      toast.error("❌ Cập nhật thất bại!");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axiosInstance.delete(`/products/${deleteId}`);
      toast.success("🗑 Xóa thành công!");
      fetchProducts();
      setDeleteId(null);
    } catch {
      toast.error("❌ Xóa thất bại!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-orange-100">
      <SideBar />

      <main className="flex-1 p-8">
        {/* Title */}
        <motion.h1
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🛍 Quản lý Sản phẩm
        </motion.h1>

        {/* Add button */}
        <motion.button
          className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6 shadow-md hover:bg-orange-600 transition"
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowAdd(true)}
        >
          <Plus size={18} /> Thêm sản phẩm
        </motion.button>

        {/* Table */}
        {loading ? (
          <div className="text-gray-600">Đang tải...</div>
        ) : (
          <motion.table
            className="w-full bg-white shadow-md rounded-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="p-3">Tên game</th>
                <th className="p-3">Giá</th>
                <th className="p-3 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b hover:bg-orange-50 transition"
                >
                  <td className="p-3 font-semibold">{p.name}</td>
                  <td className="p-3 text-orange-600">
                    {p.price.toLocaleString()} VNĐ
                  </td>
                  <td className="p-3 flex justify-center gap-3">
                    <button
                      className="bg-blue-600 p-2 rounded-lg text-white hover:bg-blue-700"
                      onClick={() => setEditItem(p)}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      className="bg-red-600 p-2 rounded-lg text-white hover:bg-red-700"
                      onClick={() => setDeleteId(p.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}

        {/* ✅ Modals */}
        <AddProductModal
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          onSubmit={handleAdd}
        />

        <EditProductModal
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          product={editItem}
          onSubmit={handleUpdate}
        />

        <ConfirmDeleteModal
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      </main>
    </div>
  );
};

export default ProductManager;
