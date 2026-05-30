
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// type MenuItem = {
//   label: string;
//   path: string;
//   icon?: React.ReactNode;
// };

// type Props = {
//   title: string;
//   menu: MenuItem[];
// };

// export function Sidebar({ title, menu }: Props) {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();

//   return (
//     <div
//       className={`h-screen border-r bg-white transition-all duration-300
//       ${collapsed ? "w-20" : "w-64"}`}
//     >
//       {/* HEADER */}
//       <div className="flex items-center justify-between p-4 border-b">
//         {!collapsed && (
//           <h2 className="font-bold text-lg">{title}</h2>
//         )}

//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="text-sm px-2 py-1 border rounded"
//         >
//           {collapsed ? "➡" : "⬅"}
//         </button>
//       </div>

//       {/* MENU */}
//       <nav className="p-2 space-y-2">
//         {menu.map((item) => {
//           const active = location.pathname === item.path;

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-3 py-2 rounded
//                 hover:bg-gray-100 transition
//                 ${active ? "bg-black text-white" : ""}`}
//             >
//               {/* ICON PLACEHOLDER */}
//               <span className="text-lg">•</span>

//               {!collapsed && <span>{item.label}</span>}
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// }