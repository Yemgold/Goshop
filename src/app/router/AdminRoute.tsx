


import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

export default function AdminRoute() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin =
    user?.adminRole === "admin" ||
    user?.adminRole === "super_admin";

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}