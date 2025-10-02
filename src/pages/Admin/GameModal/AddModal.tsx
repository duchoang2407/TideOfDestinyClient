import React, { useState } from "react";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void; // 👈 nhận FormData thay vì object string
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [newsCategory, setNewsCategory] = useState(1);

  if (!isOpen) return null;

  // 👉 lấy file ảnh từ input
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // chỉ để preview
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Content", content);
    formData.append("NewsCategory", newsCategory.toString());

    if (imageFile) {
      formData.append("ImageUrl", imageFile); // 👈 backend yêu cầu binary
    } else {
      formData.append("ImageUrl", ""); // 👈 nếu không có file thì gửi rỗng
    }

    onSubmit(formData);
    onClose();

    // reset
    setTitle("");
    setContent("");
    setImageFile(null);
    setPreviewUrl(null);
    setNewsCategory(1);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Chọn ảnh */}
          <div>
            <label className="block font-semibold text-black">Ảnh:</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleImageChange}
              className="mt-2"
            />
          </div>

          {/* Preview ảnh */}
          {previewUrl && (
            <div>
              <p className="text-sm text-black">Xem trước:</p>
              <img
                src={previewUrl}
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
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
