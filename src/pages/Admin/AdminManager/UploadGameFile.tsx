import React, { useRef, useState } from "react";
import SideBar from "../../../component/sidebar/Sidebar";
import { motion } from "framer-motion";

const UploadGameFile: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handlePick = () => inputRef.current?.click();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Vui lòng chọn 1 file (.exe hoặc .apk).");
      return;
    }

    try {
      setIsUploading(true);
      setMessage(null);

      const formData = new FormData();
      // backend expects a single file field named "file"
      formData.append("file", selectedFile);

      const response = await fetch("https://localhost:44333/api/Upload/file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Upload failed: ${response.status}`);

      setMessage("Tải lên thành công!");
      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err: unknown) {
      console.error(err);
      setMessage("Tải lên thất bại. Vui lòng thử lại.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-amber-100">
      <SideBar />

      <main className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-orange-100"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            ⬆ Upload File Game
          </h1>

          <p className="text-gray-600 mb-4">
            Chỉ chấp nhận 1 file .exe hoặc .apk để tải lên bản game mới.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePick}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Chọn file
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile}
              className={`px-4 py-2 rounded-lg text-white transition ${
                isUploading || !selectedFile
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {isUploading ? "Đang tải lên..." : "Tải lên"}
            </button>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".exe,.apk"
            onChange={handleChange}
            className="hidden"
          />

          {selectedFile && (
            <div className="mt-4 text-sm text-gray-700">
              <p className="font-semibold mb-2">Sẽ tải lên:</p>
              <div className="pl-1">{selectedFile.name}</div>
            </div>
          )}

          {message && (
            <div className="mt-4 text-sm font-medium text-gray-800">
              {message}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default UploadGameFile;
