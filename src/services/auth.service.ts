
// services/auth.service.ts
import API from "../api/axios";
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
    const res = await API.post("/auth/login", data);
    return res.data;
  },

  logout: async () => {
    return API.post("/auth/logout");
  },

  me: async (): Promise<AuthUser> => {
    const res = await API.get("/auth/me");
    return res.data;
  },
};