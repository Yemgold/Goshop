
// services/auth.service.ts
import apiClient from "../api";
import type { AuthUser, UserRole } from "../store/auth.store";

export type LoginDTO = {
  email: string;
  password: string;
  role: UserRole;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

export const authService = {
  login: async (data: LoginDTO): Promise<AuthResponse> => {
    const res = await apiClient.post("/auth/login", data);
    return res.data;
  },

  logout: async () => {
    return apiClient.post("/auth/logout");
  },

  me: async (): Promise<AuthUser> => {
    const res = await apiClient.get("/auth/me");
    return res.data;
  },
};