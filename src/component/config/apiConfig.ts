import axios, { AxiosError } from "axios";

const httpsBaseUrl = "https://localhost:7256/api";
const httpBaseUrl = "http://localhost:5168/api";

const axiosInstance = axios.create({
  baseURL: httpsBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

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
