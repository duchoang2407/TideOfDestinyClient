import React, { useEffect, useState } from "react";

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any; // dữ liệu để edit
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

  // 🟢 Khi mở modal, nếu có initialData thì set sẵn dữ liệu vào form
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setNewsCategory(initialData.newsCategory ?? 0);
    } else {
      // Nếu không có initialData => reset form (trường hợp Add)
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#e5bb69] p-6 rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? "Sửa Update" : "Thêm Update"}
          </h2>
          <button className="text-red-500 font-bold" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Tiêu đề */}
        <div className="mb-3">
          <label className="block mb-1">Tiêu Đề:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Nội dung */}
        <div className="mb-3">
          <label className="block mb-1">Nội Dung:</label>
          <textarea
            className="w-full px-3 py-2 border rounded min-h-[100px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Loại hiển thị */}
        <div className="mb-3">
          <label className="block mb-1">Loại hiển thị:</label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={newsCategory}
            onChange={(e) => setNewsCategory(Number(e.target.value))}
          >
            <option value={0}>Update</option>
            <option value={1}>News</option>
            <option value={2}>Cả 2</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-[#1a2a3d] text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {initialData ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
