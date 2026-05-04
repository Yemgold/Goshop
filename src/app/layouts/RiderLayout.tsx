import { Outlet, NavLink, Navigate, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import RoleSwitcher from "../../components/shared/RoleSwitcher";
import { useAuthStore } from "../../store/auth.store";
import { useEffect } from "react";

export default function RiderLayout() {
  const logout = useLogout();
  const location = useLocation();

  const user = useAuthStore((s) => s.user);
  const activeRole = user?.activeRole;

  // ❗ MUST NOT render anything before hooks
  const isLoggedOut = !user;
  const wrongRole = user && activeRole !== "rider";

  // 🔁 keep URL synced with role
  useEffect(() => {
    if (!activeRole) return;

    if (!location.pathname.startsWith("/rider")) {
      window.history.replaceState(null, "", "/rider/dashboard");
    }
  }, [activeRole, location.pathname]);

  // 🚨 1. NOT LOGGED IN → LOGIN
  if (isLoggedOut) {
    return <Navigate to="/login" replace />;
  }

  // 🚨 2. WRONG ROLE → REDIRECT
  if (wrongRole) {
    return <Navigate to={`/${activeRole}/dashboard`} replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* HEADER */}
      <header className="h-14 flex items-center justify-between px-4 border-b bg-white">

        <h1 className="font-bold">Rider</h1>

        <RoleSwitcher />

        <div className="flex items-center gap-3">
          <span className="text-green-600 text-sm">● Online</span>

          <button onClick={logout} className="text-sm text-red-500">
            Logout
          </button>
        </div>

      </header>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-4">
        <Outlet />
      </main>

      {/* NAV */}
      <nav className="h-14 flex justify-around items-center border-t bg-white shadow-sm">

        <NavLink
          to="/rider/dashboard"
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/rider/jobs"
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
        >
          Jobs
        </NavLink>

        <NavLink
          to="/rider/earnings"
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
        >
          Earnings
        </NavLink>

      </nav>

    </div>
  );
}




// import { Outlet, NavLink } from "react-router-dom";
// import useLogout from "../../hooks/useLogout";
// import RoleSwitcher from "../../components/shared/RoleSwitcher";

// export default function RiderLayout() {
//   const logout = useLogout();

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">

//       {/* ================= HERO HEADER ================= */}
//       <div className="relative h-32 w-full">

//         {/* HERO IMAGE */}
//         <img
//           src="/images/hero.png"
//           alt="rider hero"
//           className="w-full h-full object-cover"
//         />

//         {/* OVERLAY */}
//         <div className="absolute inset-0 bg-black/50 flex items-center justify-between px-4 text-white">

//           {/* LEFT */}
//           <div className="flex flex-col">
//             <h1 className="font-bold text-lg">
//               Rider App 🚴‍♂️
//             </h1>

//             <span className="text-xs text-green-300 flex items-center gap-1">
//               ● Online
//             </span>
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-3">

//             <RoleSwitcher />

//             <button
//               onClick={logout}
//               className="text-xs text-red-300 hover:text-red-200"
//             >
//               Logout
//             </button>

//           </div>

//         </div>

//       </div>

//       {/* ================= MAIN ================= */}
//       <main className="flex-1 overflow-y-auto">
//         <Outlet />
//       </main>

//       {/* ================= BOTTOM NAV ================= */}
//       <nav className="h-16 flex justify-around items-center border-t bg-white shadow-md">

//         <NavLink
//           to="/rider/dashboard"
//           className={({ isActive }) =>
//             `text-sm font-medium ${
//               isActive ? "text-black" : "text-gray-500"
//             }`
//           }
//         >
//           Jobs
//         </NavLink>

//         <NavLink
//           to="/rider/earnings"
//           className={({ isActive }) =>
//             `text-sm font-medium ${
//               isActive ? "text-black" : "text-gray-500"
//             }`
//           }
//         >
//           Earnings
//         </NavLink>

//         <NavLink
//           to="/rider/jobs"
//           className={({ isActive }) =>
//             `text-sm font-medium ${
//               isActive ? "text-black" : "text-gray-500"
//             }`
//           }
//         >
//           History
//         </NavLink>

//       </nav>

//     </div>
//   );
// }