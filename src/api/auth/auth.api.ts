
import { mockAuthService } from "../../services/mockAuth.service"; 

export const AuthAPI = {
  login: async (data: any) => {
    const res = await mockAuthService.login(data);

    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("user", JSON.stringify(res.user));

    return res;
  },

  me: async () => {
    return mockAuthService.me();
  },

  logout: async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    return mockAuthService.logout();
  },
};