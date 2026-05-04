

import { create } from "zustand";

export type UserRole = "buyer" | "vendor" | "rider" | "promoter";

export type RoleRequestStatus = "pending" | "approved" | "rejected";

export interface RoleRequest {
  role: UserRole;
  status: RoleRequestStatus;
}

export interface AuthUser {
  id: string;
  name: string;

  roles: UserRole[];           // approved roles only
  activeRole: UserRole;

  roleRequests: RoleRequest[]; // pending/approved tracking
}

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;

  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  hydrate: () => void;

  switchRole: (role: UserRole) => void;

  // 👇 NEW: request upgrade (NOT instant upgrade anymore)
  upgradeRole: (role: UserRole) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,

  /* =========================
     LOGIN
  ========================= */
  login: (user, token) => {
    const safeUser: AuthUser = {
      ...user,
      roleRequests: user.roleRequests || [],
    };

    localStorage.setItem("mock_user", JSON.stringify(safeUser));
    localStorage.setItem("mock_token", token);

    set({
      user: safeUser,
      accessToken: token,
    });
  },

  /* =========================
     LOGOUT
  ========================= */
  logout: () => {
    localStorage.removeItem("mock_user");
    localStorage.removeItem("mock_token");

    set({
      user: null,
      accessToken: null,
    });
  },

  /* =========================
     HYDRATE
  ========================= */
  hydrate: () => {
    const user = localStorage.getItem("mock_user");
    const token = localStorage.getItem("mock_token");

    if (user && token) {
      set({
        user: JSON.parse(user),
        accessToken: token,
      });
    }
  },

  /* =========================
     SWITCH ROLE (ONLY APPROVED)
  ========================= */
  switchRole: (role) => {
    const user = get().user;
    if (!user) return;

    if (!user.roles.includes(role)) return;

    const updated = {
      ...user,
      activeRole: role,
    };

    localStorage.setItem("mock_user", JSON.stringify(updated));

    set({ user: updated });
  },

  /* =========================
     UPGRADE ROLE (REQUEST SYSTEM)
  ========================= */
upgradeRole: (role: UserRole) => {
  const user = get().user;
  if (!user) return;

  // already approved role
  if (user.roles.includes(role)) return;

  // already requested
  if (user.roleRequests?.some(r => r.role === role)) return;

  const isAutoApproved = role === "vendor" || role === "promoter";

  const newRequest: RoleRequest = {
    role,
    status: isAutoApproved ? "approved" : "pending",
  };

  const updated = {
    ...user,

    // if auto-approved → add to roles immediately
    roles: isAutoApproved
      ? [...user.roles, role]
      : user.roles,

    roleRequests: [
      ...(user.roleRequests || []),
      newRequest,
    ],
  };

  localStorage.setItem("mock_user", JSON.stringify(updated));

  set({ user: updated });
},
}));