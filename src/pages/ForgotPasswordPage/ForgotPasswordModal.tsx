// pages/ForgotPasswordPage/ForgotPasswordModal.tsx
import React, { useState } from "react";

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

  if (!isOpen) return null; // không render khi modal đóng

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-[#2f3315] text-white p-8 rounded-lg shadow-lg w-[400px] relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-sm flex items-center justify-center"
        >
          ✕
        </button>

        <h2 className="text-center text-xl font-bold mb-6">Quên mật khẩu</h2>

        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label className="block text-sm mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-[#1f2010] text-white border border-gray-600 focus:outline-none"
              placeholder="Nhập email đã đăng kí"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 py-2 rounded font-bold hover:bg-red-700 transition"
          >
            Gửi yêu cầu đặt lại mật khẩu
          </button>
        </form>

        <div className="flex justify-between text-sm mt-4">
          <button
            type="button"
            onClick={onOpenLogin}
            className="hover:underline hover:text-blue-300"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
