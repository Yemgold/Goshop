




// import { Outlet, Navigate } from "react-router-dom";
// import { useState } from "react";

// import { useAuthStore } from "../../store/auth.store";
// import AppHeroHeader from "../../components/ui/AppHeroHeader";

// import { VendorSidebar } from "../../components/layout/VendorSidebar";

// import CreatePhysicalProductModal from "../../components/product/CreateProductModal";
// import CreateDigitalProductModal from "../../components/product/CreateDigitalProductModal";

// export default function VendorLayout() {
//   const user = useAuthStore((s) => s.user);
//   const currentRole = useAuthStore((s) => s.user?.activeRole);

//   // ================= MODAL STATE =================
//   const [openPhysicalModal, setOpenPhysicalModal] = useState(false);
//   const [openDigitalModal, setOpenDigitalModal] = useState(false);

//   // ================= AUTH GUARD =================
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!currentRole) {
//     return <div className="p-6">Loading role...</div>;
//   }

//   if (currentRole !== "vendor") {
//     return <Navigate to={`/${currentRole}/dashboard`} replace />;
//   }

//   const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

//   return (
//     <div className="flex h-screen bg-gray-50">

//       {/* ================= SIDEBAR ================= */}
//       <VendorSidebar
//         onAddPhysical={() => setOpenPhysicalModal(true)}
//         onAddDigital={() => setOpenDigitalModal(true)}
//       />

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="flex flex-col flex-1 overflow-hidden">

//         {/* HEADER */}
//         <AppHeroHeader
//           title="Vendor Panel 🏪"
//           subtitle={`Welcome back, ${fullName || "Vendor"} 👋`}
//           online={true}
//         />

//         {/* PAGE CONTENT */}
//         <main className="flex-1 overflow-y-auto p-4">
//           <Outlet />
//         </main>
//       </div>

//       {/* ================= MODALS ================= */}
//       <CreatePhysicalProductModal
//         open={openPhysicalModal}
//         onClose={() => setOpenPhysicalModal(false)}
//       />

//       <CreateDigitalProductModal
//         open={openDigitalModal}
//         onClose={() => setOpenDigitalModal(false)}
//       />
//     </div>
//   );
// }