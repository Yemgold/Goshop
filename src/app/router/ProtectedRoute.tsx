

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { UserRole } from "../../store/auth.store";

interface Props {
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: Props) {
  const user = useAuthStore((state) => state.user);

  // 👇 THIS IS WHERE IT GOES
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.activeRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}