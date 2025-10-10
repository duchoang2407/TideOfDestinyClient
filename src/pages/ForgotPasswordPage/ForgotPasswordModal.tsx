// pages/ForgotPasswordPage/ForgotPasswordModal.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
}) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Send reset password email to:", email);
    alert("Nếu email tồn tại, bạn sẽ nhận được link đặt lại mật khẩu!");
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
            className="bg-[#2f3315] text-white rounded-lg shadow-lg w-[550px] max-h-[90vh] overflow-y-auto p-10 relative"
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
              Quên mật khẩu
            </h2>

            <form onSubmit={handleForgotPassword}>
              <div className="mb-6">
                <label className="block text-sm mb-2">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded bg-[#1f2010] text-white border border-gray-600 focus:outline-none"
                  placeholder="Nhập email đã đăng kí"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 py-3 rounded font-bold hover:bg-red-700 transition mb-4"
              >
                Gửi yêu cầu đặt lại mật khẩu
              </button>
            </form>

            <div className="flex justify-end text-sm mt-4">
              <button
                type="button"
                onClick={onOpenLogin}
                className="hover:underline hover:text-blue-300"
              >
                Quay lại đăng nhập
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;
