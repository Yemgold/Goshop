import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { getRoleRoute } from "../../utils/helpers";

export default function AuthRedirect() {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/login" />;

  return <Navigate to={getRoleRoute(user)} replace />;
}