import React, { useState } from "react";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    imageUrl?: string;
    newsCategory: number;
  }) => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    newsCategory: 1,
  });

  if (!isOpen) return null;

  // 👉 Hàm lấy file từ máy
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Tạo URL tạm để preview
    const localUrl = URL.createObjectURL(file);
    setFormData({ ...formData, imageUrl: localUrl });

    console.log("File được chọn:", file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({ title: "", content: "", imageUrl: "", newsCategory: 1 });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-[#e8c07a] rounded-xl p-6 w-[400px] shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-red-600 font-bold text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-black">Thêm Bài Viết Mới</h2>

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

          {/* Link ảnh */}
          <div>
            <label className="block font-semibold text-black">Link Ảnh:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              placeholder="Dán link ảnh hoặc chọn file bên dưới"
            />

            {/* Nút chọn file ảnh */}
            <input
              type="file"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleImageChange}
              className="mt-2"
            />
          </div>

          {/* Preview ảnh */}
          {formData.imageUrl && (
            <div>
              <p className="text-sm text-black">Xem trước:</p>
              <img
                src={formData.imageUrl}
                alt="preview"
                className="w-40 h-auto rounded"
              />
            </div>
          )}

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

export default AddModal;
