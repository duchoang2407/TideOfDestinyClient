import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSubmit: (data: any) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newsCategory, setNewsCategory] = useState(0);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setNewsCategory(initialData.newsCategory ?? 0);
    } else {
      setTitle("");
      setContent("");
      setNewsCategory(0);
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    const data = {
      id: initialData?.id,
      title,
      content,
      newsCategory,
    };
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

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

        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Update" : "Add Update"}
        </h2>

        {/* Tiêu đề */}
        <div className="mb-3">
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Nội dung */}
        <div className="mb-3">
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-28 focus:ring-2 focus:ring-[#1e293b] outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Loại hiển thị */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Display Type</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none"
            value={newsCategory}
            onChange={(e) => setNewsCategory(Number(e.target.value))}
          >
            <option value={0}>Update</option>
            <option value={1}>News</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-[#1e293b] text-white font-semibold rounded-lg hover:bg-[#0f172a] transition"
          >
            {initialData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
