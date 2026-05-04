
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

export default function useLogout() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // clears store + localStorage
    navigate("/login"); // redirect
  };

  return handleLogout;
}