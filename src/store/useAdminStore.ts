


import { create } from "zustand";

type AdminUserRole =
  | "user"
  | "vendor"
  | "pickup_center"
  | "promoter"
  | "staff"
  | "admin"
  | "super_admin";

interface AdminState {
  selectedUser: any | null;
  users: any[];

  rolesFilter: AdminUserRole | "all";

  setUsers: (users: any[]) => void;
  setSelectedUser: (user: any | null) => void;
  setRolesFilter: (role: AdminState["rolesFilter"]) => void;
}

export const useAdminStore = create<AdminState>(
  (set) => ({
    selectedUser: null,
    users: [],
    rolesFilter: "all",

    setUsers: (users) => set({ users }),

    setSelectedUser: (user) =>
      set({ selectedUser: user }),

    setRolesFilter: (role) =>
      set({ rolesFilter: role }),
  })
);