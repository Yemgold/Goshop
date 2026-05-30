

// import { Navigate } from "react-router-dom";
// import type{ ReactNode } from "react";
// import type { UserRole } from "../store/auth.store";
// import { useAuthStore } from "../store/auth.store";

// type Props = {
//   children: ReactNode;
//   allowedRoles?: UserRole[];
// };

// export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
//   const user = useAuthStore((s) => s.user);

//   if (!user) return <Navigate to="/login" replace />;

//   if (allowedRoles && !allowedRoles.includes(user.activeRole)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };