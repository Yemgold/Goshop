




import { apiClient } from "../api/core/api.client";

/* ================= AUTH ================= */
export const authService = {
  login: (payload: { email: string; password: string }) => {
    return apiClient.post("/auth/login", payload);
  },

   getMe: () => apiClient.get("/users/me"),

  register: (payload: any) => {
    return apiClient.post("/auth/register", payload);
  },

  verifyEmail: (token: string) => {
    return apiClient.get(`/auth/email-verification/${token}`);
  },

  resendVerification: (email: string) => {
    return apiClient.post("/auth/resend-verification", { email });
  },

  forgotPassword: (data: { email: string }) => {
    return apiClient.post("/auth/forgot-password", data);
  },

  resetPassword: (data: {
    password: string;
    confirmPassword: string;
    token: string;
  }) => {
    return apiClient.post("/auth/reset-password", data);
  },

  /* ================= TOKEN REFRESH ================= */
  requestAccessToken: () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    return apiClient.post("/auth/request-access-token", {
      refreshToken,
    });
  },

  /* ================= LOGOUT ================= */
  logout: () => {
    const refreshToken = localStorage.getItem("refreshToken");

    return apiClient.post("/auth/logout", {
      refreshToken: refreshToken || null,
    });
  },

 
};