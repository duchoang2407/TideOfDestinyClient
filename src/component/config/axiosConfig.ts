import axios, { AxiosError } from "axios";

const httpsBaseUrl = "https://localhost:7256/api";
const httpBaseUrl = "http://localhost:5168/api";
const envBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Tạo instance mặc định HTTPS
const axiosInstance = axios.create({
  baseURL: envBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để fallback HTTP khi HTTPS lỗi
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (
      error.code === "ERR_NETWORK" &&
      error.config?.baseURL === httpsBaseUrl
    ) {
      console.warn("⚠️ HTTPS không chạy, fallback sang HTTP");
      error.config.baseURL = httpBaseUrl;
      return axios.request(error.config); // gọi lại bằng HTTP
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
