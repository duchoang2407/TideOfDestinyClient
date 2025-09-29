import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../component/config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

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

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/Auth/login", {
        username,
        password,
      });
      const data = response.data;
      console.log("Login response:", data);

      const token = data.token;
      localStorage.setItem("token", token);

      // Decode token để lấy role
      const decoded: JwtPayload = jwtDecode(token);
      console.log("Decoded token:", decoded);

      localStorage.setItem("role", decoded.role);
      localStorage.setItem("username", decoded.name);

      // Điều hướng theo role
      if (decoded.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/player/home");
      }

      onClose(); // đóng modal sau khi login thành công
    } catch (err: any) {
      alert(err.message || "Đăng nhập thất bại");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const idToken = credentialResponse.credential;
      try {
        // Gửi ID token của Google về backend
        const response = await fetch(
          `${ENVBASEURL}/Auth/google-login`, // Đảm bảo URL này đúng
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: idToken }), // Gửi đúng DTO
          }
        );

        if (!response.ok) throw new Error("Google login thất bại ở backend.");

        const data = await response.json();
        const token = data.token; // Đây là token của hệ thống bạn
        localStorage.setItem("token", token);

        const decoded: JwtPayload = jwtDecode(token);
        localStorage.setItem("role", decoded.role);
        localStorage.setItem("username", decoded.name);

        if (decoded.role === "Admin") {
          navigate("/admin");
        } else {
          navigate("/player/home");
        }
        onClose(); // Đóng modal sau khi thành công
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleGoogleError = () => {
    alert("Google login thất bại!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#2f3315] text-white p-8 rounded-lg shadow-lg w-[500px] relative">
        {/* nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-sm flex items-center justify-center"
        >
          ✕
        </button>

        <h2 className="text-center text-xl font-bold mb-6">Đăng nhập</h2>

        <form onSubmit={handleLogin}>
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

          <button
            type="submit"
            className="w-1/2 bg-red-600 py-2 rounded font-bold hover:bg-red-700 transition block mx-auto"
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
      </div>
    </div>
  );
};

export default LoginModal;
