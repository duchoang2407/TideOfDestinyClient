// src/component/config/axiosConfig.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.0.2.2:5067/api", // Android emulator
  // baseURL: "http://localhost:5067/api", // chạy web
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
