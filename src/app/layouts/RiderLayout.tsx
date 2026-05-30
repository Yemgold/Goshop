

import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

import AppHeroHeader from "../../components/ui/AppHeroHeader";

export default function RiderLayout() {
  const user = useAuthStore((s) => s.user);

  // ================= AUTH GUARD =================
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const fullName =
    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center text-xs sm:text-sm px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* ================= HERO HEADER ================= */}
      <AppHeroHeader
        title="Rider Panel 🚴‍♂️"
        subtitle={`Welcome back, ${fullName || "Rider"} 👋`}
        online={true}
      />

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 pb-24">
        <Outlet />
      </main>

      {/* ================= BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t shadow-md flex justify-around items-center pb-[env(safe-area-inset-bottom)] z-40">

        <NavLink
          to="/rider/dashboard"
          className={linkClass}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/rider/jobs"
          className={linkClass}
        >
          Jobs
        </NavLink>

        <NavLink
          to="/rider/earnings"
          className={linkClass}
        >
          Earnings
        </NavLink>

      </nav>

    </div>
  );
}