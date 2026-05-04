import type { AuthUser } from "../store/auth.store";
import type { UserRole } from "../store/auth.store";

/**
 * Extract primary role safely
 */
export const getPrimaryRole = (user: AuthUser): UserRole => {
  if (!user?.roles || user.roles.length === 0) {
    return "buyer";
  }

  return user.roles[0] as UserRole;
};

/**
 * Role-based routing (Uber-style)
 */
export const getRoleRoute = (user: AuthUser): string => {
  const role = getPrimaryRole(user);

  switch (role) {
    case "buyer":
      return "/buyer/home";

    case "rider":
      return "/rider/jobs";

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