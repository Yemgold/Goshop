



import { create } from "zustand";
import type { UserRole } from "../types/roles";
import type { AdminRole } from "../types/admin.type";
import { authService } from "../services/auth.service";

/* ================= TYPES ================= */

export interface RoleRequest {
  role: UserRole;
  status: "pending" | "approved" | "rejected";
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;

  phone?: string;

  roles: UserRole[];
  activeRole: UserRole;

  roleRequests: RoleRequest[];

  isVendor?: boolean;
  isRider?: boolean;
  isPromoter?: boolean;

  hasAllPartnerRoles?: boolean;

  adminRole?: AdminRole;

  businessId?: string | null;
  businessName?: string;
}

/* ================= STORE ================= */

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;

  login: (user: AuthUser, token: string) => void;
  logout: () => void;

  hydrate: () => void;
  rehydrateAuth: () => Promise<void>;

  setRole: (role: UserRole) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,

  /* ================= LOGIN ================= */
  login: (user, token) => {
    const safeUser: AuthUser = {
      ...user,
      roles: user.roles || [],
      roleRequests: user.roleRequests || [],
    };

    localStorage.setItem("accessToken", token);
    localStorage.setItem("auth_user", JSON.stringify(safeUser));

    set({
      user: safeUser,
      accessToken: token,
    });
  },

  /* ================= LOGOUT ================= */
  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("auth_user");

    set({
      user: null,
      accessToken: null,
    });
  },

  /* ================= FAST HYDRATE (UI ONLY) ================= */
  hydrate: () => {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("auth_user");

    if (!token || !user) return;

    try {
      set({
        accessToken: token,
        user: JSON.parse(user),
      });
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("auth_user");
    }
  },

  /* ================= REAL AUTO LOGIN (BACKEND SYNC) ================= */
  rehydrateAuth: async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return;

  // set token immediately for interceptor
  set({ accessToken: token });

  try {
    const res = await authService.getMe();
    const profile = res.data?.data;

    if (!profile) {
      console.log("No profile returned → logging out");
      get().logout();
      return;
    }

    const user = profile?.others || profile;
    const rolesObj = profile?.roles || {};

    const roles: UserRole[] = [];

    if (rolesObj.vendor) roles.push("vendor");
    if (rolesObj.rider) roles.push("rider");
    if (rolesObj.promoter) roles.push("promoter");

    if (roles.length === 0) roles.push("user");

    const activeRole: UserRole =
      roles.includes("vendor")
        ? "vendor"
        : roles.includes("rider")
        ? "rider"
        : roles.includes("promoter")
        ? "promoter"
        : "user";

    const vendor = rolesObj?.vendor;

    const businessId =
      vendor?.businessId ?? vendor?.business_Id ?? null;

    const hydratedUser: AuthUser = {
      id: user.id || user._id,
      firstName: user.firstName,
      lastName: user.lastName,

      roles,
      activeRole,

      roleRequests: [],

      isVendor: roles.includes("vendor"),
      isRider: roles.includes("rider"),
      isPromoter: roles.includes("promoter"),

      hasAllPartnerRoles: roles.length > 1,

      adminRole: user.adminRole,

      businessId,
      businessName: vendor?.businessName || null,
    };

    set({
      user: hydratedUser,
      accessToken: token,
    });

    localStorage.setItem("auth_user", JSON.stringify(hydratedUser));
  } catch (err) {
    console.log(
      "Auth rehydrate failed → KEEPING SESSION (no logout)",
      err
    );

    // ❌ DO NOT LOG OUT HERE
    // Only log for debugging

    // Optional fallback: try to keep local session alive
    const cachedUser = localStorage.getItem("auth_user");

    if (cachedUser) {
      try {
        set({
          user: JSON.parse(cachedUser),
          accessToken: token,
        });
      } catch {
        get().logout();
      }
    }
  }
},

  /* ================= ROLE SWITCH ================= */
  setRole: (role) => {
    const user = get().user;
    if (!user) return;

    const updatedUser = {
      ...user,
      activeRole: role,
    };

    set({ user: updatedUser });

    localStorage.setItem("auth_user", JSON.stringify(updatedUser));
  },
}));