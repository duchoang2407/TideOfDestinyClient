import React, { useState, useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string | null;
    newsCategory?: number; // 👈 thêm newsCategory
  } | null;
  onSubmit: (data: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string | null;
    newsCategory: number;
  }) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
    imageUrl: "",
    newsCategory: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title,
        content: initialData.content,
        imageUrl: initialData.imageUrl ?? "",
        newsCategory: initialData.newsCategory ?? 0,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#e8c07a] rounded-xl p-6 w-[400px] shadow-lg relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-red-600 font-bold text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-black">Edit Information</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block font-semibold text-black">Tiêu Đề:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-black">Ảnh:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block font-semibold text-black">Nội Dung:</label>
            <textarea
              className="w-full px-3 py-2 border rounded h-28"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
            />
          </div>

          {/* 👇 Dropdown chọn loại hiển thị */}
          <div>
            <label className="block font-semibold text-black">
              Loại hiển thị:
            </label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={formData.newsCategory}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newsCategory: Number(e.target.value),
                })
              }
            >
              <option value={0}>Update</option>
              <option value={1}>News</option>
              <option value={2}>Hiển thị cả 2</option>
            </select>
          </div>

          <button
            type="submit"
            className="self-end px-4 py-2 bg-[#1a2a3d] text-white rounded hover:bg-[#243b55]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
