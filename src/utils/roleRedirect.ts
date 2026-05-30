
// src\utils\roleRedirect.ts
import type { UserRole } from "../types/roles"; 

export function getRoleRoute(role: UserRole) {
  switch (role) {
    case "user":
      return "/buyers/dashboard";
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