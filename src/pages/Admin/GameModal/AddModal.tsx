import React, { useState } from "react";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Content", content);
    formData.append("NewsCategory", "1");
    if (imageFile) formData.append("ImageUrl", imageFile);
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#fff4e6] to-[#ffe4c4] border border-[#d9b778]/30 rounded-2xl p-6 w-[480px] shadow-xl shadow-black/10 relative animate-scaleUp">
        <button
          className="absolute top-3 right-4 text-red-600 text-xl font-bold hover:scale-110 transition"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-5 text-center text-[#1a2a3d]">
          📝 Add New Article
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="font-semibold text-[#1a2a3d]">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-[#d9b778]/40 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#d9b778]"
            required
          />

          <label className="font-semibold text-[#1a2a3d]">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block text-sm"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              className="w-40 h-auto rounded-lg mt-2 shadow-md"
            />
          )}

          <label className="font-semibold text-[#1a2a3d]">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-[#d9b778]/40 rounded-lg shadow-inner h-28 focus:outline-none focus:ring-2 focus:ring-[#d9b778]"
            required
          />

          <button
            type="submit"
            className="mt-3 bg-[#1a2a3d] text-white font-semibold py-2 rounded-lg hover:bg-[#243b55] transition shadow-md"
          >
            Add Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
