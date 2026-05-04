
import type { AxiosInstance } from "axios";

export const setupInterceptors = (api: AxiosInstance) => {
  /* ================= REQUEST INTERCEPTOR ================= */
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  /* ================= RESPONSE INTERCEPTOR ================= */
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Global error handling (Uber-style central control)
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
};