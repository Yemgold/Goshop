
// /* =========================
//    3. AUTH HOOK (CLEAN LAYER)
// ========================= */
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/auth.store";
// import { mockAuthService } from "../services/mockAuth.service";
// import { getRoleRoute } from "../utils/roleRedirect";
//  import type { UserRole } from "../store/auth.store";

// export const useAuth = () => {
//   const navigate = useNavigate();
//   const { login, logout } = useAuthStore();

//   const signIn = async (data: {
//     email: string;
//     password: string;
//     role: UserRole;
//   }) => {
//     const res = await mockAuthService.login(data);

//     login(res.user, res.accessToken);
//     navigate(getRoleRoute(res.user.activeRole));

//     return res;
//   };

//   const signOut = async () => {
//     await mockAuthService.logout();
//     logout();
//     navigate("/login");
//   };

//   return { signIn, signOut };
// };