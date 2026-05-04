

import { Outlet, NavLink, Navigate, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import RoleSwitcher from "../../components/shared/RoleSwitcher";
import { useAuthStore } from "../../store/auth.store";
import { useEffect } from "react";

export default function BuyerLayout() {
  const logout = useLogout();
  const location = useLocation();

  const user = useAuthStore((s) => s.user);
  const activeRole = user?.activeRole;

  // 1. DERIVED STATE (NO EARLY RETURN YET)
  const isWrongRole = !!activeRole && activeRole !== "buyer";
  const redirectTo = activeRole ? `/${activeRole}/dashboard` : "/login";

  // 2. URL SYNC ONLY (SIDE EFFECT)
  useEffect(() => {
    if (!activeRole) return;

    if (!location.pathname.startsWith("/buyer")) {
      window.history.replaceState(null, "", "/buyer/dashboard");
    }
  }, [activeRole, location.pathname]);

  // 3. AFTER HOOKS → SAFE REDIRECT
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isWrongRole) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* TOP BAR */}
      <header className="h-14 flex items-center justify-between px-4 border-b bg-white">
        <h1 className="font-bold">Buyer Store</h1>

        <div className="flex items-center gap-3">
          <RoleSwitcher />

          <NavLink
            to="/profile"
            className="text-sm text-gray-600 hover:text-black"
          >
            Profile
          </NavLink>

          <button
            onClick={logout}
            className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>

      {/* BOTTOM NAV */}
      <nav className="h-14 flex justify-around items-center border-t bg-white">
        <NavLink
          to="/buyer/home"
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/buyer/products"
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
        >
          Shop
        </NavLink>

        <NavLink
          to="/buyer/cart"
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
        >
          Cart
        </NavLink>
      </nav>

    </div>
  );
}