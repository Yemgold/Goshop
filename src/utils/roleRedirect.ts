

import type { UserRole } from "../store/auth.store";

export function getRoleRoute(role: UserRole) {
  switch (role) {
    case "buyer":
      return "/buyer/dashboard";
    case "vendor":
      return "/vendor/dashboard";
    case "rider":
      return "/rider/dashboard"; 
    case "promoter":
      return "/promoter/dashboard";
    default:
      return "/";
  }
}