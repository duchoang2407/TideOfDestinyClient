import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onSubmit: (data: { id: string; name: string; price: number }) => void;
}

const EditProductModal: React.FC<Props> = ({
  isOpen,
  onClose,
  product,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = () => {
    if (!name || !price) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    onSubmit({ id: product.id, name, price: Number(price) });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-xl p-6 w-96 shadow-xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-xl font-bold mb-4">✏ Chỉnh sửa sản phẩm</h2>

        <input
          placeholder="Tên game..."
          className="border rounded-lg px-3 py-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Giá..."
          type="number"
          className="border rounded-lg px-3 py-2 w-full mb-3"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <div className="flex justify-end gap-3 mt-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            onClick={handleSubmit}
          >
            Cập nhật
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditProductModal;
