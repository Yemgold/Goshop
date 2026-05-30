


// import { Outlet, NavLink } from "react-router-dom";
// import { useAuthStore } from "../../store/auth.store";
// import AppHeroHeader from "../../components/ui/AppHeroHeader";
// import { useDashboardConfig } from "../../hooks/useDashboardConfig";

// export default function AppLayout() {
//   const user = useAuthStore((s) => s.user);
//   const config = useDashboardConfig();

//   if (!user || !config) return null;

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">

//       {/* ================= HEADER ================= */}
//       <AppHeroHeader
//         title={config.title}
//         subtitle={config.subtitle}
//         online={true}
//       />

//       {/* ================= MAIN ================= */}
//       <main className="flex-1 overflow-y-auto">
//         <Outlet />
//       </main>

//       {/* ================= BOTTOM NAV ================= */}
//       <nav className="h-14 flex justify-around items-center border-t bg-white">

//         {config.nav.map((item) => (
//           <NavLink
//             key={item.to}
//             to={item.to}
//             className={({ isActive }) =>
//               isActive ? "font-bold text-black" : "text-gray-500"
//             }
//           >
//             {item.label}
//           </NavLink>
//         ))}

//       </nav>

//     </div>
//   );
// }



