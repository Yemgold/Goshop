






import type { UserRole } from "../types/roles";

export function getRoleRoute(role: UserRole) {
  switch (role) {
    case "user":
      return "/buyers/dashboard";

    case "vendor":
      return "/vendor/dashboard";


    case "promoter":
      return "/promoter/dashboard";

    case "admin":
      return "/admin/dashboard";

    case "partner_pickup_center":
      return "/pickup/dashboard";

    default:
      return "/";
  }
}