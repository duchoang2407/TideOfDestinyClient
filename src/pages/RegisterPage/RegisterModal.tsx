import React, { useState } from "react";
import axiosInstance from "../../component/config/axiosConfig";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      const response = await axiosInstance.post("/Auth/register", {
        username,
        email,
        password,
        confirmPassword,
      });

      console.log("Đăng ký thành công:", response.data);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");

      onClose();
      onOpenLogin(); // 👉 mở login modal luôn
    } catch (error: any) {
      console.error("Error during register:", error);
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#2f3315] text-white p-8 rounded-lg shadow-lg w-[600px] relative">
        {/* nút đóng */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-sm flex items-center justify-center"
        >
          ✕
        </button>

        <h2 className="text-center text-xl font-bold mb-6">
          Đăng ký tài khoản
        </h2>

        <form onSubmit={handleRegister}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Tên đăng nhập:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-[#1f2010] text-white border border-gray-600 focus:outline-none"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#1f2010] text-white border border-gray-600 focus:outline-none"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {/* Confirm password */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Nhập lại mật khẩu:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded bg-[#1f2010] text-white border border-gray-600 focus:outline-none"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-[#1f2010] text-white border border-gray-600 focus:outline-none"
              placeholder="Nhập email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-1/2 bg-red-600 py-2 rounded font-bold hover:bg-red-700 transition block mx-auto"
          >
            Đăng ký
          </button>
        </form>

        <div className="flex justify-between text-sm mt-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="hover:underline hover:text-blue-300"
          >
            Đã có tài khoản? Đăng nhập
          </button>
          <span className="text-gray-400">Quên mật khẩu? (sẽ làm sau)</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
