import React, { useState } from "react";
import { X } from "lucide-react";

interface UpdateAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    newsCategory: number;
  }) => void;
}

const UpdateAddModal: React.FC<UpdateAddModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    newsCategory: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({ title: "", content: "", newsCategory: 0 });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-[#fff2e0] to-[#ffe9cc] text-[#1e293b] rounded-2xl p-6 w-[480px] shadow-xl border border-[#f7d9b0] relative">
        {/* Nút đóng */}
        <button
          className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition text-xl"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-4">Add Update</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Tiêu đề */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* Nội dung */}
          <div>
            <label className="block font-semibold mb-1">Content</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-28 focus:ring-2 focus:ring-[#1e293b] outline-none"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-[#1e293b] text-white font-semibold rounded-lg hover:bg-[#0f172a] transition"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddModal;
