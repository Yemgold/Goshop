import { Outlet, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Menu, X, ShoppingCart } from "lucide-react";

import { useAuthStore } from "../../store/auth.store";
import { useCartStore } from "../../store/cart.store";

import AppHeroHeader from "../../components/ui/AppHeroHeader";

import { BuyerSidebar } from "../../components/layout/BuyerSidebar";
import { VendorSidebar } from "../../components/layout/VendorSidebar";
import { PromoterSidebar } from "../../components/layout/PromoterSidebar";
import { RiderSidebar } from "../../components/layout/RiderSidebar";

import UpgradeModal from "../../components/partner/UpgradeModal";

import CreatePhysicalProductModal from "../../components/product/CreateProductModal";
import CreateDigitalProductModal from "../../components/product/CreateDigitalProductModal";

import { partnersService } from "../../services/partners.services";
import type { PartnerRole } from "../../types/roles";

import CartToastUI from "../ui/CartToast";
// import MiniCartPreview from "../cart/MiniCartPreview";

/* ================= TYPES ================= */

type PartnerStatus = {
  success: boolean;
  message: string;
  data: {
    isBusinessPartner: boolean;
    hasBusiness: boolean;
    business?: {
      businessName: string;
      businessRoles: string[];
      _id: string;
    };
  };
};

export default function AppLayout() {
  const user = useAuthStore((s) => s.user);
  const currentRole = useAuthStore((s) => s.user?.activeRole);

  // ================= CART =================
const cartItems = useCartStore((state) => state.items) || [];

const cartCount =
  Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + (item?.quantity || 0),
        0
      )
    : 0;

  // ================= STATE =================
  const [status, setStatus] = useState<PartnerStatus | null>(null);
  const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
  const [openPhysicalModal, setOpenPhysicalModal] = useState(false);
  const [openDigitalModal, setOpenDigitalModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ================= FETCH PARTNER STATUS =================
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const res = await partnersService.getPartnerStatus();
        setStatus(res);
      } catch (err) {
        console.error("Failed to load partner status", err);
      }
    };

    if (user) loadStatus();
  }, [user]);

  // ================= AUTH =================
  if (!user) return <Navigate to="/login" replace />;
  if (!currentRole) return <div className="p-6">Loading...</div>;

  // ================= USER INFO =================
  const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
  const hasBusiness = !!status?.data?.hasBusiness;

  const partnerRoles: PartnerRole[] = (user?.roles || []).filter((role) =>
    ["vendor", "rider", "promoter"].includes(role)
  ) as PartnerRole[];

  // ================= SIDEBAR =================
  const renderSidebar = () => {
    if (currentRole === "user") {
      return (
        <BuyerSidebar
          roles={partnerRoles}
          onAddPartner={() => setOpenUpgradeModal(true)}
        />
      );
    }

    if (currentRole === "vendor") {
      return (
        <VendorSidebar
          roles={partnerRoles}
          onAddPartner={() => setOpenUpgradeModal(true)}
          onAddPhysical={() => setOpenPhysicalModal(true)}
          onAddDigital={() => setOpenDigitalModal(true)}
        />
      );
    }

    if (currentRole === "promoter") {
      return (
        <PromoterSidebar
          roles={partnerRoles}
          onAddPartner={() => setOpenUpgradeModal(true)}
        />
      );
    }

    if (currentRole === "rider") {
      return (
        <RiderSidebar
          roles={partnerRoles}
          onAddPartner={() => setOpenUpgradeModal(true)}
        />
      );
    }

    return null;
  };

  // ================= UI =================
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {renderSidebar()}
      </div>

      {/* MAIN */}
      <div className="flex flex-col flex-1 overflow-hidden w-full">
        {/* MOBILE TOP BAR */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b bg-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={22} />
          </button>

          <h2 className="font-semibold text-sm">
            {currentRole?.toUpperCase()}
          </h2>

          <div className="flex items-center gap-2">
            {currentRole === "user" && (
              <Link to="/buyer/cart" className="relative p-2">
                <ShoppingCart size={22} />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* HEADER */}
        <AppHeroHeader
          title={
            currentRole === "vendor"
              ? "Vendor Panel 🏪"
              : currentRole === "promoter"
              ? "Promoter Hub 📢"
              : currentRole === "rider"
              ? "Rider Panel 🛵"
              : "User Dashboard 🛍️"
          }
          subtitle={`Welcome back, ${fullName || "User"} 👋`}
          online={true}
        />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>

<CartToastUI />
{/* <MiniCartPreview /> */}




      {/* MODALS */}
      <UpgradeModal
        open={openUpgradeModal}
        hasBusiness={hasBusiness}
        existingBusinessName={status?.data?.business?.businessName || ""}
        existingRoles={user?.roles || []}
        onClose={() => setOpenUpgradeModal(false)}
      />

      <CreatePhysicalProductModal
        open={openPhysicalModal}
        onClose={() => setOpenPhysicalModal(false)}
      />

      <CreateDigitalProductModal
        open={openDigitalModal}
        onClose={() => setOpenDigitalModal(false)}
      />
    </div>
  );
}











// import { Outlet, Navigate, Link } from "react-router-dom";
// import { useEffect, useState,useMemo } from "react";

// import { Menu, X, ShoppingCart } from "lucide-react";

// import { useAuthStore } from "../../store/auth.store";
// import { useCartStore } from "../../store/cart.store";

// import AppHeroHeader from "../../components/ui/AppHeroHeader";

// import { BuyerSidebar } from "../../components/layout/BuyerSidebar";
// import { VendorSidebar } from "../../components/layout/VendorSidebar";
// import { PromoterSidebar } from "../../components/layout/PromoterSidebar";
// import { RiderSidebar } from "../../components/layout/RiderSidebar";

// import UpgradeModal from "../../components/partner/UpgradeModal";
// import { getCart } from "../../services/buyer.api.service";

// import CreatePhysicalProductModal from "../../components/product/CreateProductModal";
// import CreateDigitalProductModal from "../../components/product/CreateDigitalProductModal";

// import { partnersService } from "../../services/partners.services";
// import type { PartnerRole } from "../../types/roles";

// import CartToastUI from "../ui/CartToast";
// // import MiniCartPreview from "../cart/MiniCartPreview";

// /* ================= TYPES ================= */

// type PartnerStatus = {
//   success: boolean;
//   message: string;
//   data: {
//     isBusinessPartner: boolean;
//     hasBusiness: boolean;
//     business?: {
//       businessName: string;
//       businessRoles: string[];
//       _id: string;
//     };
//   };
// };

// export default function AppLayout() {
//   const user = useAuthStore((s) => s.user);
//   const currentRole = useAuthStore((s) => s.user?.activeRole);

//   // ================= CART =================

// const cartItems = useCartStore((state) => state.items);
// const hydrate = useCartStore((s) => s.hydrateFromAPI);

// useEffect(() => {
//   let mounted = true;

//   (async () => {
//     try {
//       const apiCart = await getCart();

//       if (mounted && apiCart) {
//         hydrate(apiCart); // must match store type
//       }
//     } catch (err) {
//       console.log("No API cart (guest user)");
//     }
//   })();

//   return () => {
//     mounted = false;
//   };
// }, [hydrate]);

// const cartCount = useMemo(() => {
//   return cartItems.reduce((total, item) => total + item.quantity, 0);
// }, [cartItems]);




//   // ================= STATE =================
//   const [status, setStatus] = useState<PartnerStatus | null>(null);
//   const [openUpgradeModal, setOpenUpgradeModal] = useState(false);
//   const [openPhysicalModal, setOpenPhysicalModal] = useState(false);
//   const [openDigitalModal, setOpenDigitalModal] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // ================= FETCH PARTNER STATUS =================
//   useEffect(() => {
//     const loadStatus = async () => {
//       try {
//         const res = await partnersService.getPartnerStatus();
//         setStatus(res);
//       } catch (err) {
//         console.error("Failed to load partner status", err);
//       }
//     };

//     if (user) loadStatus();
//   }, [user]);

//   // ================= AUTH =================
//   if (!user) return <Navigate to="/login" replace />;
//   if (!currentRole) return <div className="p-6">Loading...</div>;

//   // ================= USER INFO =================
//   const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
//   const hasBusiness = !!status?.data?.hasBusiness;

//   const partnerRoles: PartnerRole[] = (user?.roles || []).filter((role) =>
//     ["vendor", "rider", "promoter"].includes(role)
//   ) as PartnerRole[];

//   // ================= SIDEBAR =================
//   const renderSidebar = () => {
//     if (currentRole === "user") {
//       return (
//         <BuyerSidebar
//           roles={partnerRoles}
//           onAddPartner={() => setOpenUpgradeModal(true)}
//         />
//       );
//     }

//     if (currentRole === "vendor") {
//       return (
//         <VendorSidebar
//           roles={partnerRoles}
//           onAddPartner={() => setOpenUpgradeModal(true)}
//           onAddPhysical={() => setOpenPhysicalModal(true)}
//           onAddDigital={() => setOpenDigitalModal(true)}
//         />
//       );
//     }

//     if (currentRole === "promoter") {
//       return (
//         <PromoterSidebar
//           roles={partnerRoles}
//           onAddPartner={() => setOpenUpgradeModal(true)}
//         />
//       );
//     }

//     if (currentRole === "rider") {
//       return (
//         <RiderSidebar
//           roles={partnerRoles}
//           onAddPartner={() => setOpenUpgradeModal(true)}
//         />
//       );
//     }

//     return null;
//   };

//   // ================= UI =================
//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* MOBILE OVERLAY */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <div
//         className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0`}
//       >
//         {renderSidebar()}
//       </div>

//       {/* MAIN */}
//       <div className="flex flex-col flex-1 overflow-hidden w-full">
//         {/* MOBILE TOP BAR */}
//         <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b bg-white">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="p-2 rounded-lg hover:bg-gray-100 transition"
//           >
//             <Menu size={22} />
//           </button>

//           <h2 className="font-semibold text-sm">
//             {currentRole?.toUpperCase()}
//           </h2>

//           <div className="flex items-center gap-2">
//             {currentRole === "user" && (
//               <Link to="/buyer/cart" className="relative p-2">
//                 <ShoppingCart size={22} />

//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-bold">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             )}

//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="p-2 rounded-lg hover:bg-gray-100 transition"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {/* HEADER */}
//         <AppHeroHeader
//           title={
//             currentRole === "vendor"
//               ? "Vendor Panel 🏪"
//               : currentRole === "promoter"
//               ? "Promoter Hub 📢"
//               : currentRole === "rider"
//               ? "Rider Panel 🛵"
//               : "User Dashboard 🛍️"
//           }
//           subtitle={`Welcome back, ${fullName || "User"} 👋`}
//           online={true}
//         />

//         {/* CONTENT */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           <Outlet />
//         </main>
//       </div>

// <CartToastUI />
// {/* <MiniCartPreview /> */}




//       {/* MODALS */}
//       <UpgradeModal
//         open={openUpgradeModal}
//         hasBusiness={hasBusiness}
//         existingBusinessName={status?.data?.business?.businessName || ""}
//         existingRoles={user?.roles || []}
//         onClose={() => setOpenUpgradeModal(false)}
//       />

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