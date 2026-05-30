


import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { authService } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { useUIStore } from "../../store/ui.store";
import { getRoleRoute } from "../../utils/roleRedirect";

import type { UserRole } from "../../types/roles";

export function useLogin() {
  const navigate = useNavigate();

  const login = useAuthStore((s) => s.login);

  const startLoading = useUIStore((s) => s.startLoading);
  const stopLoading = useUIStore((s) => s.stopLoading);

  const handleLogin = async (
    email: string,
    password: string
  ) => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    startLoading();

    try {
      // ======================
      // 1. LOGIN
      // ======================
      const res = await authService.login({
        email,
        password,
      });

      const response = res.data?.data;

      const { accessToken, refreshToken } = response || {};

      if (!accessToken) {
        throw new Error("Invalid login response");
      }

      // ======================
      // 2. SAVE TOKENS
      // ======================
      localStorage.setItem("accessToken", accessToken);

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // ======================
      // 3. GET FULL PROFILE
      // ======================
      const meRes = await authService.getMe();
      const profile = meRes.data?.data;

      console.log("👤 FULL PROFILE:", profile);

      const user = profile?.others || profile;
      const rolesObj = profile?.roles || {};

      // ======================
      // 4. ROLE DETECTION
      // ======================
      const roles: UserRole[] = [];

      if (rolesObj.vendor) roles.push("vendor");
      if (rolesObj.rider) roles.push("rider");
      if (rolesObj.promoter) roles.push("promoter");

      if (roles.length === 0) roles.push("user");

      const ROLE_PRIORITY: UserRole[] = [
        "vendor",
        "rider",
        "promoter",
        "user",
      ];

      const activeRole =
        ROLE_PRIORITY.find((role) => roles.includes(role)) || "user";

      // ======================
      // BUSINESS ID (FIXED + SAFE)
      // ======================
      const vendor = rolesObj?.vendor;

      const businessId =
        vendor?.businessId ?? vendor?.business_Id ?? null;

      // ======================
      // 5. STORE AUTH (SINGLE SOURCE OF TRUTH)
      // ======================
      login(
        {
          ...user,
          roles,
          activeRole,
          businessId, // ✅ IMPORTANT FIX
        },
        accessToken
      );

      // ======================
      // 6. NAVIGATION
      // ======================
      const route = getRoleRoute(activeRole);

      console.log("ROLES:", roles);
      console.log("ACTIVE ROLE:", activeRole);
      console.log("BUSINESS ID:", businessId);
      console.log("ROUTE:", route);

      toast.success("Login successful");

      navigate(route, { replace: true });
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Login failed"
      );
    } finally {
      stopLoading();
    }
  };

  return { handleLogin };
}