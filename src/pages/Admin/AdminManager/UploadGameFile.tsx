import React, { useEffect, useState } from "react";
import axiosInstance from "../../../component/config/axiosConfig";
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/Products");
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Error fetching products", error);
      toast.error("Lỗi khi tải danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      await axiosInstance.delete(`/Products/${id}`);
      toast.success("Đã xóa sản phẩm!");
      fetchProducts();
    } catch (error) {
      console.error("❌ Delete failed", error);
      toast.error("Không thể xóa sản phẩm!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="px-6 py-6 bg-neutral-50 min-h-screen">
      {/* ✅ Header + Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          📦 Quản lý Sản phẩm
        </h2>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition-all flex items-center gap-2">
          <AiOutlinePlus size={20} />
          Thêm sản phẩm
        </button>
      </div>

      {/* ✅ Table UI */}
      <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-md bg-white">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-800 font-semibold">
            <tr className="text-center">
              <th className="py-3 px-4 border-r w-2/5">Tên game</th>
              <th className="py-3 px-4 border-r w-2/5">Giá</th>
              <th className="py-3 px-4 w-1/5">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="text-center py-5 text-gray-500">
                  Đang tải sản phẩm...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  Không có sản phẩm nào!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="text-center border-t hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium text-gray-800 w-2/5">
                    {product.name}
                  </td>

                  <td className="py-3 px-4 text-orange-600 font-semibold w-2/5">
                    {product.price.toLocaleString()} VNĐ
                  </td>

                  <td className="py-3 px-4 w-1/5 flex justify-center gap-3">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded shadow-md">
                      <AiFillEdit size={18} />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded shadow-md"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <AiFillDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;
