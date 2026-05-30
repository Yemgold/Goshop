// import { Outlet, NavLink, Navigate } from "react-router-dom";
// import { useState } from "react";

// import { useAuthStore } from "../../store/auth.store";

// import AppHeroHeader from "../../components/ui/AppHeroHeader";

// import { BuyerSidebar } from "../../components/layout/BuyerSidebar";

// import UpgradeModal from "../../components/partner/UpgradeModal";

// export default function UserLayout() {
//   const user = useAuthStore((s) => s.user);

//   const hasBusiness = !!user?.businessId;

//   const [openUpgradeModal, setOpenUpgradeModal] =
//     useState(false);

//   // ================= AUTH =================

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   const fullName =
//     `${user.firstName ?? ""} ${
//       user.lastName ?? ""
//     }`.trim();

//   const linkClass = ({
//     isActive,
//   }: {
//     isActive: boolean;
//   }) =>
//     `flex flex-col items-center justify-center text-xs sm:text-sm px-3 py-2 rounded-lg transition ${
//       isActive
//         ? "bg-black text-white"
//         : "text-gray-600 hover:bg-gray-100"
//     }`;

//   return (
//     <div className="h-screen bg-gray-50 overflow-hidden">

//       {/* ================= HEADER ================= */}

//       <AppHeroHeader
//         title="User Dashboard 🛍️"
//         subtitle={`Welcome back, ${
//           fullName || "User"
//         } 👋`}
//         online={true}
//       />

//       {/* ================= BODY ================= */}

//       <div className="flex h-[calc(100vh-72px)]">

//         {/* ================= SIDEBAR ================= */}

//         <BuyerSidebar
//           onAddPartner={() =>
//             setOpenUpgradeModal(true)
//           }
//         />

//         {/* ================= CONTENT ================= */}

//         <div className="flex-1 overflow-y-auto">

//           <main className="p-4 md:p-6 pb-24">
//             <Outlet />
//           </main>

//         </div>

//       </div>

//       {/* ================= MOBILE NAV ================= */}

//       <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center z-40">

//         <NavLink
//           to="/buyer/home"
//           className={linkClass}
//         >
//           Home
//         </NavLink>

//         <NavLink
//           to="/buyer/products"
//           className={linkClass}
//         >
//           Shop
//         </NavLink>

//         <NavLink
//           to="/buyer/cart"
//           className={linkClass}
//         >
//           Cart
//         </NavLink>

//       </nav>

//       {/* ================= MODAL ================= */}

//       <UpgradeModal
//         open={openUpgradeModal}
//         hasBusiness={hasBusiness}
//         existingBusinessName=""
//         existingRoles={user?.roles || []}
//         onClose={() =>
//           setOpenUpgradeModal(false)
//         }
//       />

//     </div>
//   );
// }




// import { Outlet, NavLink, Navigate } from "react-router-dom";
// import { useState } from "react";

// import { useAuthStore } from "../../store/auth.store";
// import AppHeroHeader from "../../components/ui/AppHeroHeader";

// import { BuyerSidebar } from "../../components/layout/BuyerSidebar";
// import UpgradeModal from "../../components/partner/UpgradeModal";

// export default function UserLayout() {
//   const user = useAuthStore((s) => s.user);

//   const hasBusiness = !!user?.businessId;

//   const [openUpgradeModal, setOpenUpgradeModal] = useState(false);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   const fullName =
//     `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

//   const linkClass = ({ isActive }: { isActive: boolean }) =>
//     `flex flex-col items-center justify-center text-xs sm:text-sm px-3 py-2 rounded-lg transition ${
//       isActive
//         ? "bg-black text-white"
//         : "text-gray-600 hover:bg-gray-100"
//     }`;

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">

//       {/* HEADER */}
//       <AppHeroHeader
//         title="User Dashboard 🛍️"
//         subtitle={`Welcome back, ${fullName || "User"} 👋`}
//         online={true}
//       />

//       {/* SIDEBAR */}
//       <BuyerSidebar
//         onAddPartner={() => setOpenUpgradeModal(true)}
//       />

//       {/* MAIN */}
//       <main className="flex-1 overflow-y-auto p-3 sm:p-4 pb-24">
//         <Outlet />
//       </main>

//       {/* BOTTOM NAV */}
//       <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t flex justify-around items-center pb-[env(safe-area-inset-bottom)] z-40">

//         <NavLink to="/buyer/home" className={linkClass}>
//           Home
//         </NavLink>

//         <NavLink to="/buyer/products" className={linkClass}>
//           Shop
//         </NavLink>

//         <NavLink to="/buyer/cart" className={linkClass}>
//           Cart
//         </NavLink>

//       </nav>

//       {/* MODAL FIXED */}
//       <UpgradeModal
//         open={openUpgradeModal}
//         onClose={() => setOpenUpgradeModal(false)}
//         hasBusiness={hasBusiness}
//         existingBusinessName={user?.businessName ?? ""}
//         existingRoles={user?.roles ?? []}
//       />

//     </div>
//   );
// }