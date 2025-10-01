import React, { useState } from "react";

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
    newsCategory: 0, // mặc định là Update
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // reset form
    setFormData({ title: "", content: "", newsCategory: 0 });
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

        <h2 className="text-xl font-bold mb-4 text-black">Thêm Bản Update</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Tiêu đề */}
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

          {/* Nội dung */}
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

          {/* Loại hiển thị */}
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

          {/* Submit */}
          <button
            type="submit"
            className="self-end px-4 py-2 bg-[#1a2a3d] text-white rounded hover:bg-[#243b55]"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddModal;
