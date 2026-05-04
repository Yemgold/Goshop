import { Outlet, NavLink, Navigate, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import RoleSwitcher from "../../components/shared/RoleSwitcher";
import { useAuthStore } from "../../store/auth.store";
import { useEffect } from "react";

export default function PromoterLayout() {
  const logout = useLogout();
  const location = useLocation();

  const user = useAuthStore((s) => s.user);
  const activeRole = user?.activeRole;

  // =========================
  // 1. ALL HOOKS FIRST (SAFE)
  // =========================
  useEffect(() => {
    if (!activeRole) return;

    if (!location.pathname.startsWith("/promoter")) {
      window.history.replaceState(null, "", "/promoter/dashboard");
    }
  }, [activeRole, location.pathname]);

  // =========================
  // 2. AUTH GUARDS AFTER HOOKS
  // =========================
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (activeRole && activeRole !== "promoter") {
    return <Navigate to={`/${activeRole}/dashboard`} replace />;
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm px-3 py-1 rounded transition ${
      isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* HEADER */}
      <header className="h-14 flex items-center justify-between px-4 border-b bg-white">

        <div>
          <h1 className="font-bold">Promoter 📢</h1>
          <p className="text-xs text-gray-500">Share & earn</p>
        </div>

        <RoleSwitcher />

        <button
          onClick={logout}
          className="text-sm text-red-500"
        >
          Logout
        </button>

      </header>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>

      {/* MOBILE NAV */}
      <nav className="h-14 flex justify-around items-center border-t bg-white">

        <NavLink to="/promoter/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/promoter/share" className={linkClass}>
          Share
        </NavLink>

        <NavLink to="/promoter/campaigns" className={linkClass}>
          Campaigns
        </NavLink>

      </nav>

    </div>
  );
}