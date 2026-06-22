import type { AuthUser } from "../store/auth.store";
import type { UserRole } from "../types/roles";

/**
 * Extract primary role safely
 */
export const getPrimaryRole = (user: AuthUser): UserRole => {
  if (!user?.roles || user.roles.length === 0) {
    return "user";
  }

  return user.roles[0] as UserRole;
};

/**
 * Role-based routing (Uber-style)
 */
export const getRoleRoute = (user: AuthUser): string => {
  const role = getPrimaryRole(user);

  switch (role) {
    case "user":
      return "/buyers/home";

    case "promoter":
      return "/promoter/dashboard";

    case "vendor":
      return "/admin/dashboard";

    default:
      return "/";
  }
};

/**
 * Role check
 */
export const hasRole = (
  user: AuthUser,
  role: UserRole
): boolean => {
  return user?.roles?.includes(role);
};