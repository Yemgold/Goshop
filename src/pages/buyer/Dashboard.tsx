// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { useState, useMemo } from "react";

// import {
//   getBuyerProducts,
//   getBuyerOrders,
//   getCart,
// } from "../../services/buyer.service";

// import { Card } from "../../components/ui/Card";
// import { Button } from "../../components/ui/Button";

// import {
//   useAuthStore,
//   type UserRole,
// } from "../../store/auth.store";

// /* ================= ROLES ================= */
// const ALL_ROLES: UserRole[] = ["vendor", "rider", "promoter"];

// /* ================= DASHBOARD ================= */
// export default function BuyerDashboard() {
//   const navigate = useNavigate();

//   const { data: products = [] } = useQuery({
//     queryKey: ["products"],
//     queryFn: getBuyerProducts,
//   });

//   const { data: orders = [] } = useQuery({
//     queryKey: ["buyer-orders"],
//     queryFn: getBuyerOrders,
//   });

//   const { data: cart = [] } = useQuery({
//     queryKey: ["cart"],
//     queryFn: getCart,
//   });

//   const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
//   const [showUpgradeModal, setShowUpgradeModal] = useState(false);

//   const trackView = (id: string) => {
//     setRecentlyViewed((prev) => {
//       const updated = [id, ...prev.filter((x) => x !== id)];
//       return updated.slice(0, 8);
//     });
//   };

//   const recentProducts = useMemo(() => {
//     return recentlyViewed
//       .map((id) => products.find((p) => p.id === id))
//       .filter(Boolean);
//   }, [recentlyViewed, products]);

//   const buyAgain = useMemo(() => {
//     return orders.flatMap((o) => o.items).slice(0, 6);
//   }, [orders]);

//   const recommended = useMemo(() => {
//     if (!orders.length) return products.slice(0, 8);

//     const purchasedCategories = new Set(
//       orders.flatMap((o) =>
//         o.items.map((i: any) => i.category)
//       )
//     );

//     return products
//       .filter((p) => purchasedCategories.has(p.category))
//       .slice(0, 8);
//   }, [products, orders]);

//   const pendingOrders = orders.filter(
//     (o) => o.status === "Processing"
//   ).length;

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-10">

//       {/* HERO */}
//       <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-xl">
//         <h1 className="text-2xl font-bold">
//           Welcome back 👋
//         </h1>

//         <p className="text-sm text-gray-300 mt-1">
//           {cart.length} items in cart • {pendingOrders} active orders
//         </p>

//         <div className="flex gap-3 mt-4 flex-wrap">
//           <Button onClick={() => navigate("/buyer/home")}>
//             Shop Now
//           </Button>

//           <Button onClick={() => navigate("/buyer/cart")}>
//             Cart
//           </Button>

//           <Button onClick={() => navigate("/buyer/orders")}>
//             Orders
//           </Button>

//           {/* ✅ UPGRADE BUTTON */}
//           <Button onClick={() => setShowUpgradeModal(true)}>
//             Upgrade Account 🚀
//           </Button>
//         </div>
//       </div>

//       ROLE STATUS
//       <RoleStatusPreview />

//       {/* CONTINUE SHOPPING */}
//       <Section title="Continue Shopping">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {products.slice(0, 8).map((p) => (
//             <Card
//               key={p.id}
//               className="p-3 cursor-pointer"
//               onClick={() => {
//                 trackView(p.id);
//                 navigate(`/buyer/product/${p.id}`);
//               }}
//             >
//               <div className="aspect-[4/3] bg-gray-100 rounded">
//                 <img
//                   src={p.image}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <p className="mt-2 text-sm">{p.title}</p>
//             </Card>
//           ))}
//         </div>
//       </Section>

//       {/* RECENTLY VIEWED */}
//       {recentProducts.length > 0 && (
//         <Section title="Recently Viewed">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {recentProducts.map((p) =>
//               p ? (
//                 <Card key={p.id} className="p-3">
//                   <img src={p.image} />
//                   <p>{p.title}</p>
//                 </Card>
//               ) : null
//             )}
//           </div>
//         </Section>
//       )}

//       {/* BUY AGAIN */}
//       {buyAgain.length > 0 && (
//         <Section title="Buy Again">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {buyAgain.map((item, i) => (
//               <Card key={i} className="p-3">
//                 <p>{item.title}</p>
//                 <Button
//                   onClick={() =>
//                     navigate(`/buyer/product/${item.id}`)
//                   }
//                 >
//                   Buy Again
//                 </Button>
//               </Card>
//             ))}
//           </div>
//         </Section>
//       )}

//       {/* RECOMMENDED */}
//       <Section title="Recommended for You">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {recommended.map((p) => (
//             <Card key={p.id} className="p-3">
//               <img src={p.image} />
//               <p>{p.title}</p>
//               <Button
//                 onClick={() =>
//                   navigate(`/buyer/product/${p.id}`)
//                 }
//               >
//                 View
//               </Button>
//             </Card>
//           ))}
//         </div>
//       </Section>

//       {/* MODAL */}
//       <UpgradeModal
//         open={showUpgradeModal}
//         onClose={() => setShowUpgradeModal(false)}
//       />

//     </div>
//   );
// }

// /* ================= ROLE STATUS ================= */
// function RoleStatusPreview() {
//   const user = useAuthStore((s) => s.user);
//   if (!user) return null;

//   return (
//     <div className="bg-white p-4 rounded-xl border">
//       <h2 className="font-semibold mb-2">Your Roles</h2>

//       <div className="flex gap-3 flex-wrap">
//         {user.roles.map((r) => (
//           <span
//             key={r}
//             className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
//           >
//             {r} ✓
//           </span>
//         ))}

//         {user.roleRequests?.map((r) => (
//           <span
//             key={r.role}
//             className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
//           >
//             {r.role} ({r.status})
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ================= MODAL ================= */
// function UpgradeModal({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   const user = useAuthStore((s) => s.user);
//   const upgradeRole = useAuthStore((s) => s.upgradeRole);

//   const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });

//   if (!open) return null;

//   const isDisabled = (role: UserRole) => {
//     if (!user) return false;
//     return (
//       user.roles.includes(role) ||
//       user.roleRequests?.some((r) => r.role === role)
//     );
//   };

//   const submit = () => {
//     if (!selectedRole) return;

//     upgradeRole(selectedRole);

//     setSelectedRole(null);
//     setForm({ name: "", phone: "", address: "" });

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

//       <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 relative">

//         {/* CLOSE BUTTON */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-black"
//         >
//           ✕
//         </button>

//         <h2 className="text-lg font-bold">
//           Upgrade Your Account
//         </h2>

//         {/* ROLE SELECT */}
//         {!selectedRole && (
//           <div className="space-y-2">
//             {ALL_ROLES.map((r) => (
//               <button
//                 key={r}
//                 disabled={isDisabled(r)}
//                 onClick={() => setSelectedRole(r)}
//                 className={`w-full p-3 rounded border text-left capitalize ${
//                   isDisabled(r)
//                     ? "bg-gray-100 text-gray-400"
//                     : "hover:bg-gray-50"
//                 }`}
//               >
//                 {r}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* FORM */}
//         {selectedRole && (
//           <div className="space-y-3">
//             <input
//               placeholder="Business / Name"
//               className="w-full border p-2 rounded"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//             />

//             <input
//               placeholder="Phone"
//               className="w-full border p-2 rounded"
//               value={form.phone}
//               onChange={(e) =>
//                 setForm({ ...form, phone: e.target.value })
//               }
//             />

//             <input
//               placeholder="Address"
//               className="w-full border p-2 rounded"
//               value={form.address}
//               onChange={(e) =>
//                 setForm({ ...form, address: e.target.value })
//               }
//             />

//             <p className="text-xs text-gray-500">
//               {selectedRole === "rider"
//                 ? "🚚 Requires approval"
//                 : "⚡ Instant activation"}
//             </p>

//             <div className="flex justify-between">
//               <button onClick={() => setSelectedRole(null)}>
//                 ← Back
//               </button>

//               <button
//                 onClick={submit}
//                 className="bg-black text-white px-4 py-2 rounded"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= SECTION ================= */
// function Section({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="space-y-3">
//       <h2 className="font-semibold">{title}</h2>
//       {children}
//     </div>
//   );
// }



// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { useState, useMemo } from "react";

// import {
//   getBuyerProducts,
//   getBuyerOrders,
//   getCart,
// } from "../../services/buyer.service";

// import { Card } from "../../components/ui/Card";
// import { Button } from "../../components/ui/Button";

// import {
//   useAuthStore,
//   type UserRole,
// } from "../../store/auth.store";

// /* ================= DASHBOARD ================= */
// export default function BuyerDashboard() {
//   const navigate = useNavigate();

//   /* ================= DATA ================= */
//   const { data: products = [] } = useQuery({
//     queryKey: ["products"],
//     queryFn: getBuyerProducts,
//   });

//   const { data: orders = [] } = useQuery({
//     queryKey: ["buyer-orders"],
//     queryFn: getBuyerOrders,
//   });

//   const { data: cart = [] } = useQuery({
//     queryKey: ["cart"],
//     queryFn: getCart,
//   });

//   /* ================= STATE ================= */
//   const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
//   const [showUpgradeModal, setShowUpgradeModal] = useState(false);

//   /* ================= TRACK ================= */
//   const trackView = (id: string) => {
//     setRecentlyViewed((prev) => {
//       const updated = [id, ...prev.filter((x) => x !== id)];
//       return updated.slice(0, 8);
//     });
//   };

//   /* ================= DERIVED ================= */
//   const recentProducts = useMemo(() => {
//     return recentlyViewed
//       .map((id) => products.find((p) => p.id === id))
//       .filter(Boolean);
//   }, [recentlyViewed, products]);

//   const buyAgain = useMemo(() => {
//     return orders.flatMap((o) => o.items).slice(0, 6);
//   }, [orders]);

//   const recommended = useMemo(() => {
//     if (!orders.length) return products.slice(0, 8);

//     const purchasedCategories = new Set(
//       orders.flatMap((o) =>
//         o.items.map((i: any) => i.category)
//       )
//     );

//     return products
//       .filter((p) => purchasedCategories.has(p.category))
//       .slice(0, 8);
//   }, [products, orders]);

//   const pendingOrders = orders.filter(
//     (o) => o.status === "Processing"
//   ).length;

//   /* ================= UI ================= */
//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-10">

//       {/* ================= HERO ================= */}
//       <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-xl">

//         <h1 className="text-2xl font-bold">
//           Welcome back 👋
//         </h1>

//         <p className="text-sm text-gray-300 mt-1">
//           {cart.length} items in cart • {pendingOrders} active orders
//         </p>

//         <div className="flex gap-3 mt-4 flex-wrap">

//           <Button onClick={() => navigate("/buyer/home")}>
//             Shop Now
//           </Button>

//           <Button onClick={() => navigate("/buyer/cart")}>
//             Cart
//           </Button>

//           <Button onClick={() => navigate("/buyer/orders")}>
//             Orders
//           </Button>

//           {/* 🔥 NEW BUTTON */}
//           <Button onClick={() => setShowUpgradeModal(true)}>
//             Upgrade Account 🚀
//           </Button>

//         </div>
//       </div>

//       {/* ================= CONTINUE SHOPPING ================= */}
//       <Section title="Continue Shopping">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {products.slice(0, 8).map((p) => (
//             <Card
//               key={p.id}
//               className="h-full flex flex-col p-3 cursor-pointer"
//               onClick={() => {
//                 trackView(p.id);
//                 navigate(`/buyer/product/${p.id}`);
//               }}
//             >
//               <div className="w-full aspect-[4/3] bg-gray-100 rounded">
//                 <img
//                   src={p.image}
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               <p className="text-sm mt-2 line-clamp-2">
//                 {p.title}
//               </p>
//             </Card>
//           ))}
//         </div>
//       </Section>

//       {/* ================= RECENTLY VIEWED ================= */}
//       {recentProducts.length > 0 && (
//         <Section title="Recently Viewed">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {recentProducts.map((p) =>
//               p ? (
//                 <Card key={p.id} className="p-3">
//                   <img src={p.image} />
//                   <p>{p.title}</p>
//                 </Card>
//               ) : null
//             )}
//           </div>
//         </Section>
//       )}

//       {/* ================= BUY AGAIN ================= */}
//       {buyAgain.length > 0 && (
//         <Section title="Buy Again">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {buyAgain.map((item, i) => (
//               <Card key={i} className="p-3">
//                 <p>{item.title}</p>
//                 <Button
//                   onClick={() =>
//                     navigate(`/buyer/product/${item.id}`)
//                   }
//                 >
//                   Buy Again
//                 </Button>
//               </Card>
//             ))}
//           </div>
//         </Section>
//       )}

//       {/* ================= RECOMMENDED ================= */}
//       <Section title="Recommended for You">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {recommended.map((p) => (
//             <Card key={p.id} className="p-3">
//               <img src={p.image} />
//               <p>{p.title}</p>
//               <Button
//                 onClick={() =>
//                   navigate(`/buyer/product/${p.id}`)
//                 }
//               >
//                 View
//               </Button>
//             </Card>
//           ))}
//         </div>
//       </Section>

//       {/* ================= MODAL ================= */}
//       <UpgradeModal
//         open={showUpgradeModal}
//         onClose={() => setShowUpgradeModal(false)}
//       />

//     </div>
//   );
// }

// /* ================= MODAL ================= */
// function UpgradeModal({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) {
//   const upgradeRole = useAuthStore((s) => s.upgradeRole);

//   const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });

//   if (!open) return null;

//   const submit = () => {
//     if (!selectedRole) return;

//     upgradeRole(selectedRole);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

//       <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

//         <h2 className="text-lg font-bold">
//           Upgrade Account
//         </h2>

//         {/* SELECT ROLE */}
//         {!selectedRole && (
//           <div className="space-y-2">
//             {["vendor", "rider", "promoter"].map((r) => (
//               <button
//                 key={r}
//                 onClick={() => setSelectedRole(r as UserRole)}
//                 className="w-full border p-3 rounded text-left"
//               >
//                 {r}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* FORM */}
//         {selectedRole && (
//           <>
//             <input
//               placeholder="Name / Business"
//               className="w-full border p-2"
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//             />

//             <input
//               placeholder="Phone"
//               className="w-full border p-2"
//               onChange={(e) =>
//                 setForm({ ...form, phone: e.target.value })
//               }
//             />

//             <input
//               placeholder="Address"
//               className="w-full border p-2"
//               onChange={(e) =>
//                 setForm({ ...form, address: e.target.value })
//               }
//             />

//             <p className="text-xs text-gray-500">
//               {selectedRole === "rider"
//                 ? "Requires approval"
//                 : "Instant activation"}
//             </p>

//             <div className="flex gap-2">
//               <button onClick={() => setSelectedRole(null)}>
//                 Back
//               </button>

//               <button
//                 onClick={submit}
//                 className="bg-black text-white px-4 py-2"
//               >
//                 Submit
//               </button>
//             </div>
//           </>
//         )}

//       </div>
//     </div>
//   );
// }

// /* ================= SECTION ================= */
// function Section({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div>
//       <h2 className="font-bold">{title}</h2>
//       {children}
//     </div>
//   );
// }






import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";

import {
  getBuyerProducts,
  getBuyerOrders,
  getCart,
} from "../../services/buyer.service";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

import {
  useAuthStore,
  type UserRole,
} from "../../store/auth.store";

/* ================= ROLES ================= */
const ALL_ROLES: UserRole[] = ["vendor", "rider", "promoter"];

/* ================= DASHBOARD ================= */
export default function BuyerDashboard() {
  const navigate = useNavigate();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getBuyerProducts,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["buyer-orders"],
    queryFn: getBuyerOrders,
  });

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const trackView = (id: string) => {
    setRecentlyViewed((prev) => {
      const updated = [id, ...prev.filter((x) => x !== id)];
      return updated.slice(0, 8);
    });
  };

  const recentProducts = useMemo(() => {
    return recentlyViewed
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);
  }, [recentlyViewed, products]);

  const buyAgain = useMemo(() => {
    return orders.flatMap((o) => o.items).slice(0, 6);
  }, [orders]);

  const recommended = useMemo(() => {
    if (!orders.length) return products.slice(0, 8);

    const purchasedCategories = new Set(
      orders.flatMap((o) =>
        o.items.map((i: any) => i.category)
      )
    );

    return products
      .filter((p) => purchasedCategories.has(p.category))
      .slice(0, 8);
  }, [products, orders]);

  const pendingOrders = orders.filter(
    (o) => o.status === "Processing"
  ).length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">

      {/* HERO */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-bold">
          Welcome back 👋
        </h1>

        <p className="text-sm text-gray-300 mt-1">
          {cart.length} items in cart • {pendingOrders} active orders
        </p>

        <div className="flex gap-3 mt-4 flex-wrap">
          <Button onClick={() => navigate("/buyer/home")}>
            Shop Now
          </Button>

          <Button onClick={() => navigate("/buyer/cart")}>
            Cart
          </Button>

          <Button onClick={() => navigate("/buyer/orders")}>
            Orders
          </Button>

          <Button onClick={() => setShowUpgradeModal(true)}>
            Upgrade Account 🚀
          </Button>
        </div>
      </div>

      {/* CONTINUE SHOPPING */}
      <Section title="Continue Shopping">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 8).map((p) => (
            <Card
              key={p.id}
              className="p-3 cursor-pointer"
              onClick={() => {
                trackView(p.id);
                navigate(`/buyer/product/${p.id}`);
              }}
            >
              <div className="aspect-[4/3] bg-gray-100 rounded">
                <img
                  src={p.image}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="mt-2 text-sm">{p.title}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* RECENTLY VIEWED */}
      {recentProducts.length > 0 && (
        <Section title="Recently Viewed">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentProducts.map((p) =>
              p ? (
                <Card key={p.id} className="p-3">
                  <img src={p.image} />
                  <p>{p.title}</p>
                </Card>
              ) : null
            )}
          </div>
        </Section>
      )}

      {/* BUY AGAIN */}
      {buyAgain.length > 0 && (
        <Section title="Buy Again">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {buyAgain.map((item, i) => (
              <Card key={i} className="p-3">
                <p>{item.title}</p>
                <Button
                  onClick={() =>
                    navigate(`/buyer/product/${item.id}`)
                  }
                >
                  Buy Again
                </Button>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* RECOMMENDED */}
      <Section title="Recommended for You">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommended.map((p) => (
            <Card key={p.id} className="p-3">
              <img src={p.image} />
              <p>{p.title}</p>
              <Button
                onClick={() =>
                  navigate(`/buyer/product/${p.id}`)
                }
              >
                View
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* MODAL */}
      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />

    </div>
  );
}

/* ================= MODAL ================= */
function UpgradeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const user = useAuthStore((s) => s.user);
  const upgradeRole = useAuthStore((s) => s.upgradeRole);

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  if (!open) return null;

  const isDisabled = (role: UserRole) => {
    if (!user) return false;
    return (
      user.roles.includes(role) ||
      user.roleRequests?.some((r) => r.role === role)
    );
  };

  const submit = () => {
    if (!selectedRole) return;

    upgradeRole(selectedRole);

    setSelectedRole(null);
    setForm({ name: "", phone: "", address: "" });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold">
          Upgrade Your Account
        </h2>

        {!selectedRole && (
          <div className="space-y-2">
            {ALL_ROLES.map((r) => (
              <button
                key={r}
                disabled={isDisabled(r)}
                onClick={() => setSelectedRole(r)}
                className={`w-full p-3 rounded border text-left capitalize ${
                  isDisabled(r)
                    ? "bg-gray-100 text-gray-400"
                    : "hover:bg-gray-50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}

        {selectedRole && (
          <div className="space-y-3">
            <input
              placeholder="Business / Name"
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              className="w-full border p-2 rounded"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              placeholder="Address"
              className="w-full border p-2 rounded"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <p className="text-xs text-gray-500">
              {selectedRole === "rider"
                ? "🚚 Requires approval"
                : "⚡ Instant activation"}
            </p>

            <div className="flex justify-between">
              <button onClick={() => setSelectedRole(null)}>
                ← Back
              </button>

              <button
                onClick={submit}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= SECTION ================= */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold">{title}</h2>
      {children}
    </div>
  );
}