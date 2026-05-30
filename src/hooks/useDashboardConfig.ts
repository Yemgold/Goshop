


import { useAuthStore } from "../store/auth.store";
import { dashboardConfig } from "../config/dashboard.config";

export function useDashboardConfig() {
  const user = useAuthStore((s) => s.user);

  const role = user?.activeRole;

  if (!role) return null;

  return dashboardConfig[role];
}