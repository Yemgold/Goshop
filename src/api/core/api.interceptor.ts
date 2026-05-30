import type { AxiosInstance } from "axios";
import { useAuthStore } from "../../store/auth.store";
import { refreshClient } from "../refreshClient";

export const setupInterceptors = (api: AxiosInstance) => {
  /* ================= REQUEST ================= */
  api.interceptors.request.use((config) => {
    const token =
      useAuthStore.getState().accessToken ||
      localStorage.getItem("accessToken"); // ✅ IMPORTANT FALLBACK

    const url = config.url || "";

    const isAuthEndpoint = url.includes("/auth/login");

    if (token && config.headers && !isAuthEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  /* ================= RESPONSE ================= */
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;
      const status = error.response?.status;

      const url = originalRequest?.url || "";

      const isAuthEndpoint =
        url.includes("/auth/login") ||
        url.includes("/auth/register");

      if (isAuthEndpoint) {
        return Promise.reject(error);
      }

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await refreshClient.post(
            "/auth/request-access-token"
          );

          const accessToken = res?.data?.data?.accessToken;

          if (!accessToken) {
            throw new Error("No access token returned");
          }

          const user = useAuthStore.getState().user;

          if (!user) {
            throw new Error("No user in store");
          }

          useAuthStore.getState().login(user, accessToken);

          originalRequest.headers.Authorization =
            `Bearer ${accessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          useAuthStore.getState().logout();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};


