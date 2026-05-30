




import { useState } from "react";
import { Info, Menu, X } from "lucide-react";

import RoleSwitcher from "../shared/RoleSwitcher";
import useLogout from "../../hooks/useLogout";

import CartIcon from "../cart/CartIcon";

interface AppHeroHeaderProps {
  title: string;
  subtitle?: string;
  online?: boolean;
}

export default function AppHeroHeader({
  subtitle,
  online = true,
}: AppHeroHeaderProps) {
  const logout = useLogout();

  const [openInfo, setOpenInfo] = useState(false);
  const [openMobileHeader, setOpenMobileHeader] = useState(false);

  return (
    <header className="w-full bg-black text-white relative border-b border-white/10">

      {/* ================= DESKTOP HEADER ================= */}
      <div className="hidden sm:flex items-center justify-between px-4 py-4 bg-black/50">

        {/* LEFT */}
        <div className="flex flex-col">
          

          {subtitle && (
            <p className="text-xs text-gray-200 mt-1">
              {subtitle}
            </p>
          )}

          <span className="text-xs text-green-300 flex items-center gap-1 mt-2">
            ● {online ? "Online" : "Offline"}
          </span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 relative">

          {/* Role Switcher */}
          <RoleSwitcher />

          {/* Info Button */}
          <button
            onClick={() => setOpenInfo((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <Info size={18} />
          </button>

          <div className="flex items-center gap-3">
  <CartIcon />
</div>

          {/* Logout */}
          <button
            onClick={logout}
            className="text-xs text-red-300 hover:text-red-200 transition"
          >
            Logout
          </button>

        </div>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div className="sm:hidden flex items-center justify-between px-4 py-3 bg-black/60">

        {/* LEFT MENU ICON */}
        <button
          onClick={() => setOpenMobileHeader((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          {openMobileHeader ? (
            <X size={20} />
          ) : (
            <Menu size={20} />
          )}
        </button>

        {/* CENTER CONTENT */}
        <div className="flex flex-col items-center text-center px-2">

      

          {subtitle && (
            <p className="text-[10px] text-gray-300 leading-tight mt-1 max-w-[180px] truncate">
              {subtitle}
            </p>
          )}

        </div>

        {/* RIGHT INFO ICON */}
        <button
          onClick={() => setOpenInfo((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <Info size={18} />
        </button>

      </div>

      {/* ================= MOBILE DROPDOWN PANEL ================= */}
      {openMobileHeader && (
        <div className="sm:hidden bg-black/90 border-t border-white/10 px-4 py-4 space-y-4 animate-in fade-in duration-200">

          {/* STATUS */}
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-400">
              Status
            </p>

            <p className="text-sm text-green-300 mt-1">
              ● {online ? "Online" : "Offline"}
            </p>
          </div>

          {/* ROLE */}
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-2">
              Role
            </p>

            <RoleSwitcher />
          </div>

          {/* ACTIONS */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={logout}
              className="text-sm text-red-300 hover:text-red-200 transition"
            >
              Logout
            </button>
          </div>

        </div>
      )}

      {/* ================= INFO PANEL ================= */}
      {openInfo && (
        <div className="absolute right-4 top-16 w-60 bg-white text-black shadow-2xl border rounded-xl p-4 z-50">

          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            System Info
          </p>

          <div className="mt-3 text-xs space-y-2 text-gray-700">

            <div className="flex items-center justify-between">
              <span>Dashboard</span>
              <span className="font-medium text-green-600">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Role System</span>
              <span className="font-medium">
                Enabled
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Session</span>
              <span className="font-medium">
                Secure
              </span>
            </div>

          </div>

        </div>
      )}

    </header>
  );
}
