import React, { useState } from "react";
import axiosInstance from "../../component/config/axiosConfig";
import { motion, AnimatePresence } from "framer-motion";

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
      onOpenLogin();
    } catch (error: any) {
      console.error("Error during register:", error);
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#2f3315] text-white rounded-lg shadow-lg w-[650px] max-h-[90vh] overflow-y-auto p-10 relative"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            {/* nút đóng */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 bg-red-600 text-white w-8 h-8 rounded-full text-sm flex items-center justify-center hover:bg-red-700 transition"
            >
              ✕
            </button>

            <h2 className="text-center text-2xl font-bold mb-8">
              Đăng ký tài khoản
            </h2>

            <form onSubmit={handleRegister}>
              {/* Username */}
              <div className="mb-6">
                <label className="block text-sm mb-2">Tên đăng nhập:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded bg-[#1f2010] text-white border border-gray-600 focus:outline-none"
                  placeholder="Nhập tên đăng nhập"
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm mb-2">Mật khẩu:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded bg-[#1f2010] text-white border border-gray-600 focus:outline-none"
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              {/* Confirm password */}
              <div className="mb-6">
                <label className="block text-sm mb-2">Nhập lại mật khẩu:</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 rounded bg-[#1f2010] text-white border border-gray-600 focus:outline-none"
                  placeholder="Nhập lại mật khẩu"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm mb-2">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded bg-[#1f2010] text-white border border-gray-600 focus:outline-none"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-1/2 bg-red-600 py-3 rounded font-bold hover:bg-red-700 transition block mx-auto mb-4"
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
