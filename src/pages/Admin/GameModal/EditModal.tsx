import React, { useEffect, useState } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string | null;
    newsCategory?: number;
  } | null;
  onSubmit: (data: {
    id: string;
    title: string;
    content: string;
    imageUrl?: File | null;
    newsCategory: number;
    removeCurrentImage?: boolean;
  }) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) => {
  const [form, setForm] = useState({
    id: "",
    title: "",
    content: "",
    imageUrl: null as File | null,
    newsCategory: 1,
    removeCurrentImage: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id,
        title: initialData.title,
        content: initialData.content,
        imageUrl: null,
        newsCategory: initialData.newsCategory ?? 1,
        removeCurrentImage: false,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#fff4e6] to-[#ffe4c4] border border-[#d9b778]/30 rounded-2xl p-6 w-[480px] shadow-xl shadow-black/10 animate-scaleUp relative">
        <button
          className="absolute top-3 right-4 text-red-600 text-xl font-bold hover:scale-110 transition"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-5 text-center text-[#1a2a3d]">
          ✏️ Edit Article
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="font-semibold text-[#1a2a3d]">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border border-[#d9b778]/40 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-[#d9b778]"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="font-semibold text-[#1a2a3d]">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  imageUrl: e.target.files?.[0] || null,
                  removeCurrentImage: false,
                })
              }
              className="block text-sm mt-1"
            />
            {initialData?.imageUrl && (
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={initialData.imageUrl}
                  alt="current"
                  className="w-40 h-28  object-cover rounded-lg shadow-md border border-[#d9b778]/30"
                />
                <label className="flex items-center gap-1 text-sm text-red-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.removeCurrentImage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        removeCurrentImage: e.target.checked,
                      })
                    }
                  />
                  Remove current
                </label>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="font-semibold text-[#1a2a3d]">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 border border-[#d9b778]/40 rounded-lg shadow-inner h-28 focus:outline-none focus:ring-2 focus:ring-[#d9b778]"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold text-[#1a2a3d]">Category</label>
            <select
              value={form.newsCategory}
              onChange={(e) =>
                setForm({
                  ...form,
                  newsCategory: parseInt(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-[#d9b778]/40 rounded-lg shadow-inner focus:ring-2 focus:ring-[#d9b778]"
            >
              <option value={0}>Update</option>
              <option value={1}>News</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-3 bg-[#1a2a3d] text-white font-semibold py-2 rounded-lg hover:bg-[#243b55] transition shadow-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
