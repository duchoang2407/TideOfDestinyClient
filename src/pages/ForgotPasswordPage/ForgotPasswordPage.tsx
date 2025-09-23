import React, { useState } from "react";
import { Link } from "react-router-dom";

import LoginFooter from "../../component/Footer/LoginFooter";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Send reset password email to:", email);
    // TODO: gọi API gửi email reset password
  };

  return (
    <div className="w-full min-h-screen bg-[#c4a875] flex flex-col">
      {/* Nội dung chính */}
      <div className="flex flex-1 relative">
        {/* Form forgot password */}
        <div className="flex-1 flex items-center justify-center">
          <form
            onSubmit={handleForgotPassword}
            className="bg-[#2f3315] text-white p-8 rounded-lg shadow-lg w-[600px]  relative"
          >
            {/* Nút X (close) */}
            <Link to="/">
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-sm flex items-center justify-center"
              >
                ✕
              </button>
            </Link>

            <h2 className="text-center text-xl font-bold mb-6">
              Quên mật khẩu
            </h2>

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
              className="w-2/3 bg-red-600 py-2 rounded font-bold hover:bg-red-700 transition block mx-auto"
            >
              Gửi yêu cầu đặt lại mật khẩu
            </button>

            {/* Extra links */}
            <div className="flex justify-between text-sm mt-4">
              <Link to="/login" className="hover:underline hover:text-blue-300">
                Quay lại đăng nhập
              </Link>
              <Link
                to="/RegisterPage"
                className="hover:underline hover:text-blue-300"
              >
                Đăng kí
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <LoginFooter />
    </div>
  );
};

export default ForgotPasswordPage;
