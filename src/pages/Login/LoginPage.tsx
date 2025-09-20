import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginFooter from "../../component/Footer/LoginFooter";
import { jwtDecode } from "jwt-decode";

// import { GoogleLogin } from "@react-oauth/google";
import axiosInstance from "../../component/config/axiosConfig";

interface JwtPayload {
  name: string;
  role: string;
  exp: number;
  iat: number;
}

const LoginPage: React.FC = () => {
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
        navigate("/admin/dashboard");
      } else {
        navigate("/player/home");
      }
    } catch (err: any) {
      alert(err.message || "Đăng nhập thất bại");
    }
  };

  // const handleGoogleSuccess = async (credentialResponse: any) => {
  //   if (credentialResponse.credential) {
  //     try {
  //       // Gửi ID token của Google về backend
  //       const response = await fetch(
  //         "http://localhost:5168/api/Auth/google-login",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ token: credentialResponse.credential }),
  //         }
  //       );

  //       if (!response.ok) throw new Error("Google login thất bại");

  //       const data = await response.json();
  //       localStorage.setItem("token", data.token);

  //       const decoded: JwtPayload = jwtDecode(data.token);
  //       localStorage.setItem("role", decoded.role);

  //       if (decoded.role === "Admin") navigate("/admin/dashboard");
  //       else navigate("/player/home");
  //     } catch (err: any) {
  //       alert(err.message);
  //     }
  //   }
  // };

  // const handleGoogleError = () => {
  //   alert("Google login thất bại!");
  // };

  return (
    <div className="w-full min-h-screen bg-[#c4a875] flex flex-col">
      <div className="flex flex-1 relative">
        <div className="flex-1 flex items-center justify-center">
          <form
            onSubmit={handleLogin}
            className="bg-[#2f3315] text-white p-8 rounded-lg shadow-lg w-[600px] relative"
          >
            <Link to="/">
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-sm flex items-center justify-center"
              >
                ✕
              </button>
            </Link>

            <h2 className="text-center text-xl font-bold mb-6">Tên game</h2>

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
            {/* Nút login bằng Google */}
            {/* <div className="flex justify-center mb-4 mt-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div> */}

            <div className="flex justify-between text-sm mt-4">
              <Link
                to="/ForgotPasswordPage"
                className="hover:underline hover:text-blue-300"
              >
                Quên mật khẩu
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
      <LoginFooter />
    </div>
  );
};

export default LoginPage;
