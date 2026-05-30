

// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthStore } from "../../store/auth.store";
// import type { UserRole } from "../../types/roles"; 

// interface Props {
//   allowedRoles?: UserRole[];
// }

// export default function ProtectedRoute({ allowedRoles }: Props) {
//   const user = useAuthStore((state) => state.user);

//   // 👇 THIS IS WHERE IT GOES
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.activeRole)) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }





import { Navigate } from "react-router-dom";
import type{ ReactNode } from "react";
import type { UserRole } from "../../types/roles"; 
import { useAuthStore } from "../../store/auth.store"; 

type Props = {
  children: ReactNode;
  allowedRoles?: UserRole[];
};

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.activeRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};