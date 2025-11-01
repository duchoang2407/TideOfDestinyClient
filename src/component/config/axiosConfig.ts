import axios, { AxiosError } from "axios";

const httpsBaseUrl = "https://localhost:7256/api";
const httpBaseUrl = "http://localhost:5168/api";
const envBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Tạo instance mặc định
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // nếu BE cho phép AllowCredentials
});

// ✅ Thêm token vào tất cả request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Debug log
  console.log("📡 Request:", {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data,
  });

  return config;
});

// ✅ Fallback HTTPS → HTTP
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (
      error.code === "ERR_NETWORK" &&
      error.config?.baseURL === httpsBaseUrl
    ) {
      console.warn("⚠️ HTTPS không chạy, fallback sang HTTP");
      error.config.baseURL = httpBaseUrl;
      return axios.request(error.config);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
