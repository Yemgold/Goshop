import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

import AppHeroHeader from "../../components/ui/AppHeroHeader";

export default function PromoterLayout() {
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
        title="Promoter 📢"
        subtitle={`Welcome, ${fullName || "Promoter"} — Share & earn rewards`}
        online={true}
      />

      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-y-auto p-3 sm:p-4 pb-24">
        <Outlet />
      </main>

      {/* ================= BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center pb-[env(safe-area-inset-bottom)] z-40 shadow-sm">

        <NavLink
          to="/promoter/dashboard"
          className={linkClass}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/promoter/share"
          className={linkClass}
        >
          Share
        </NavLink>

        <NavLink
          to="/promoter/campaigns"
          className={linkClass}
        >
          Campaigns
        </NavLink>

      </nav>

    </div>
  );
}




// import { Outlet, NavLink, Navigate } from "react-router-dom";
// import { useAuthStore } from "../../store/auth.store";
// import AppHeroHeader from "../../components/ui/AppHeroHeader";

// export default function PromoterLayout() {
//   const user = useAuthStore((s) => s.user);

//   // ================= AUTH GUARD =================
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   const linkClass = ({ isActive }: { isActive: boolean }) =>
//     `text-sm px-3 py-1 rounded transition ${
//       isActive
//         ? "bg-black text-white"
//         : "text-gray-600 hover:bg-gray-100"
//     }`;

//   const fullName =
//     `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">

//       {/* ================= HERO HEADER ================= */}
//       <AppHeroHeader
//         title="Promoter 📢"
//         subtitle={`Welcome, ${fullName || "Promoter"} — Share & earn rewards`}
//         online={true}
//       />

//       {/* ================= MAIN ================= */}
//       <main className="flex-1 overflow-y-auto p-4">
//         <Outlet />
//       </main>

//       {/* ================= BOTTOM NAV ================= */}
//       <nav className="h-14 flex justify-around items-center border-t bg-white">

//         <NavLink to="/promoter/dashboard" className={linkClass}>
//           Dashboard
//         </NavLink>

//         <NavLink to="/promoter/share" className={linkClass}>
//           Share
//         </NavLink>

//         <NavLink to="/promoter/campaigns" className={linkClass}>
//           Campaigns
//         </NavLink>

//       </nav>

//     </div>
//   );
// }