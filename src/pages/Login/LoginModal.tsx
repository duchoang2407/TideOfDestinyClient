import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../component/config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";

interface JwtPayload {
  name: string;
  role: string;
  exp: number;
  iat: number;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
  onOpenForgotPassword: () => void;
}

const ENVBASEURL = import.meta.env.VITE_API_BASE_URL;

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onOpenRegister,
  onOpenForgotPassword,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/Auth/login", {
        username,
        password,
      });
      const data = response.data;
      const token = data.token;
      localStorage.setItem("token", token);

      const decoded: JwtPayload = jwtDecode(token);
      localStorage.setItem("role", decoded.role);
      localStorage.setItem("username", decoded.name);

      if (decoded.role === "Admin") navigate("/admin");
      else navigate("/player/home");

      onClose();
    } catch (err: any) {
      alert(err.message || "Đăng nhập thất bại");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const idToken = credentialResponse.credential;
      try {
        const response = await fetch(`${ENVBASEURL}/Auth/google-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });

        if (!response.ok) throw new Error("Google login thất bại ở backend.");
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);

        const decoded: JwtPayload = jwtDecode(token);
        localStorage.setItem("role", decoded.role);
        localStorage.setItem("username", decoded.name);

        if (decoded.role === "Admin") navigate("/admin");
        else navigate("/player/home");

        onClose();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleGoogleError = () => {
    alert("Google login thất bại!");
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
              onClick={onClose}
              className="absolute top-3 right-3 bg-red-600 text-white w-8 h-8 rounded-full text-sm flex items-center justify-center hover:bg-red-700 transition"
            >
              ✕
            </button>

            <h2 className="text-center text-2xl font-bold mb-8">Đăng nhập</h2>

            <form onSubmit={handleLogin}>
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

              <button
                type="submit"
                className="w-1/2 bg-red-600 py-3 rounded font-bold hover:bg-red-700 transition block mx-auto mb-4"
              >
                Đăng nhập
              </button>
            </form>

            <div className="flex justify-center my-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>

            <div className="flex justify-between text-sm mt-4">
              <button
                onClick={() => {
                  onClose();
                  onOpenForgotPassword();
                }}
                className="hover:underline hover:text-blue-300"
              >
                Quên mật khẩu
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenRegister();
                }}
                className="hover:underline hover:text-blue-300"
              >
                Đăng kí
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
