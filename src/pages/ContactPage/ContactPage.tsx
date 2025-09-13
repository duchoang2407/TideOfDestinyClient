import React, { useState } from "react";
import Footer from "../../component/Footer/Footer";

const ContactPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Tiêu đề:", title);
    console.log("Nội dung:", content);
    alert("Đơn hỗ trợ đã được gửi!");
    setTitle("");
    setContent("");
  };

  return (
    <div className="w-full min-h-screen bg-[#c4a875] flex flex-col">
      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-bold mb-10 text-[#2c1c0e]">
          Gửi đơn hỗ trợ
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-transparent flex flex-col gap-6 w-full max-w-2xl"
        >
          {/* Tiêu đề */}
          <input
            type="text"
            placeholder="Tiêu đề:"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Nội dung */}
          <textarea
            placeholder="Nội dung:"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full p-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          {/* Button */}
          <button
            type="submit"
            className="self-end px-6 py-2 rounded-lg bg-[#3a4d28] text-yellow-300 font-bold hover:bg-[#2d3c1f] transition"
          >
            Gửi đơn
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
