import { useNavigate } from "react-router-dom";
import { useBuyerDashboard } from "../../hooks/buyer/useBuyerDashboard";
import { mapBuyerDashboard } from "../../mappers/buyerDashboard.mapper";

import { Card } from "../../components/ui/Card";
import { SectionCard } from "../../components/ui/SectionCard";

export default function BuyerDashboard() {
  const navigate = useNavigate();

  const { data, isLoading } = useBuyerDashboard();

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const dashboard = mapBuyerDashboard(data!);

  const safeProducts = dashboard.products ?? [];
  const safeOrders = dashboard.recentOrders ?? [];
  const cartItemsCount = dashboard.cartCount ?? 0;
  const pendingOrdersCount = dashboard.stats?.pendingOrders ?? 0;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">

      {/* ================= QUICK ACTIONS ================= */}
      <SectionCard title="Quick Actions">
        <p className="text-sm text-gray-500 mb-4">
          {cartItemsCount} items in cart • {pendingOrdersCount} active orders
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:flex-1">
            <div className="rounded-2xl overflow-hidden border shadow-md bg-white">
              <img
                src="/images/cart.jpg"
                alt="Cart"
                className="w-full h-52 md:h-64 object-cover"
              />
              <div className="p-3 text-sm text-gray-500">
                Cart preview overview
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ================= PRODUCTS ================= */}
      <SectionCard title="Continue Shopping">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {safeProducts.slice(0, 8).map((p) => (
            <Card
              key={p.id}
              className="p-4 cursor-pointer"
              onClick={() => navigate(`/buyers/product/${p.id}`)}
            >
              <img src={p.image} className="h-32 w-full object-contain" />
              <p className="mt-2 font-medium">{p.name}</p>
              <p className="font-semibold">₦{p.price}</p>
            </Card>
          ))}
        </div>
      </SectionCard>

      {/* ================= RECENT ORDERS ================= */}
      <SectionCard title="Recent Orders">
        <div className="space-y-3">
          {safeOrders.map((o) => (
            <div key={o.id} className="flex justify-between border-b pb-2">
              <div>
                <p>Order #{o.id}</p>
                <p className="text-xs text-gray-500">{o.status}</p>
              </div>
              <p className="font-semibold">₦{o.total}</p>
            </div>
          ))}
        </div>
      </SectionCard>

    </div>
  );
}



























// import { useNavigate } from "react-router-dom";
// import { useBuyerDashboard } from "../../hooks/buyer/useBuyerDashboard";
// import { mapBuyerDashboard } from "../../mappers/buyerDashboard.mapper";

// import { Card } from "../../components/ui/Card";
// import { SectionCard } from "../../components/ui/SectionCard";

// export default function BuyerDashboard() {
//   const navigate = useNavigate();

//   const { data, isLoading } = useBuyerDashboard();

//   if (isLoading) {
//     return <div className="p-6">Loading dashboard...</div>;
//   }

//   const dashboard = mapBuyerDashboard(data!);

//   const safeProducts = dashboard.products ?? [];
//   const safeOrders = dashboard.recentOrders ?? [];

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-10">

//       {/* PRODUCTS */}
//       <SectionCard title="Continue Shopping">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

//           {safeProducts.slice(0, 8).map((p) => (
//             <Card
//               key={p.id}
//               className="p-4 cursor-pointer"
//               onClick={() =>
//                 navigate(`/buyers/product/${p.id}`)
//               }
//             >
//               <img src={p.image} className="h-32 w-full object-contain" />
//               <p className="mt-2 font-medium">{p.name}</p>
//               <p className="font-semibold">₦{p.price}</p>
//             </Card>
//           ))}

//         </div>
//       </SectionCard>

//       {/* ORDERS */}
//       <SectionCard title="Recent Orders">
//         <div className="space-y-3">

//           {safeOrders.map((o) => (
//             <div key={o.id} className="flex justify-between border-b pb-2">
//               <div>
//                 <p>Order #{o.id}</p>
//                 <p className="text-xs text-gray-500">{o.status}</p>
//               </div>

//               <p className="font-semibold">₦{o.total}</p>
//             </div>
//           ))}

//         </div>
//       </SectionCard>

//     </div>
//   );
// }














// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// import { buyerService } from "../../services/buyer.api.service";
// import type { Product } from "../../types/buyer.types";

// import { Card } from "../../components/ui/Card";
// import { SectionCard } from "../../components/ui/SectionCard";
// import { useCartStore } from "../../store/cart.store";

// /* ================= DASHBOARD ================= */

// export default function BuyerDashboard() {
//   const navigate = useNavigate();

//   const customerId = localStorage.getItem("userId") || "";

//   const cartItems = useCartStore((state) => state.items);

//   /* ================= PRODUCTS ================= */

//   const {
//     data: products = [],
//     isLoading: productsLoading,
//   } = useQuery<Product[]>({
//     queryKey: ["products"],
//     queryFn: async () => buyerService.getProducts(),
//   });

//   /* ================= ORDERS ================= */

//   const {
//     data: orders = [],
//     isLoading: ordersLoading,
//   } = useQuery<any[]>({
//     queryKey: ["buyer-orders", customerId],
//     queryFn:  () => buyerService.getOrders(customerId),
//     enabled: !!customerId,
//   });

//   /* ================= STATS ================= */

//   const pendingOrders = orders.filter(
//     (o: any) =>
//       o.status === "Processing" ||
//       o.status === "Pending"
//   ).length;

//   /* ================= NAVIGATION ================= */

//   const handleNavigate = (path: string) => {
//     navigate(path);
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-10">

//       {/* ================= QUICK ACTIONS ================= */}
//       <SectionCard title="Quick Actions">
//         <p className="text-sm text-gray-500 mb-4">
//           {cartItems.length} items in cart • {pendingOrders} active orders
//         </p>

//         <div className="flex flex-col md:flex-row gap-6">

//           <div className="w-full md:flex-1">
//             <div className="rounded-2xl overflow-hidden border shadow-md bg-white">
//               <img
//                 src="/images/cart.jpg"
//                 alt="Cart"
//                 className="w-full h-52 md:h-64 object-cover"
//               />

//               <div className="p-3 text-sm text-gray-500">
//                 Cart preview overview
//               </div>
//             </div>
//           </div>

//         </div>
//       </SectionCard>

//       {/* ================= PRODUCTS ================= */}
//       <SectionCard title="Continue Shopping">

//         {productsLoading && (
//           <div className="text-center text-gray-500 py-10">
//             Loading products...
//           </div>
//         )}

//         {!productsLoading && products.length === 0 && (
//           <div className="text-center text-gray-500 py-10">
//             No products available
//           </div>
//         )}

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

//           {products.slice(0, 8).map((p) => (
//             <Card
//               key={p._id || p.id}
//               className="p-4 cursor-pointer rounded-2xl hover:shadow-lg transition"
//               onClick={() =>
//                 handleNavigate(`/buyers/product/${p._id || p.id}`)
//               }
//             >
//               <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
//                 <img
//                   src={p.media?.[0]?.url || "/placeholder.png"}
//                   alt={p.name}
//                   className="w-full h-full object-contain"
//                 />
//               </div>

//               <p className="mt-3 text-sm font-medium line-clamp-2">
//                 {p.name}
//               </p>

//               <p className="mt-1 font-semibold">
//                 ₦{p.price?.toLocaleString()}
//               </p>
//             </Card>
//           ))}

//         </div>
//       </SectionCard>

//       {/* ================= ORDERS ================= */}
//       <SectionCard title="Recent Orders">

//         {ordersLoading && (
//           <div className="text-gray-500">
//             Loading orders...
//           </div>
//         )}

//         {!ordersLoading && orders.length === 0 && (
//           <div className="text-gray-500">
//             No orders yet
//           </div>
//         )}

//         <div className="space-y-3">

//           {orders.slice(0, 5).map((order: any) => (
//             <div
//               key={order._id || order.id}
//               className="border rounded-xl p-4 flex items-center justify-between"
//             >
//               <div>
//                 <p className="font-medium">
//                   Order #{order._id || order.id}
//                 </p>

//                 <p className="text-sm text-gray-500">
//                   {order.status}
//                 </p>
//               </div>

//               <button
//                 onClick={() =>
//                   handleNavigate(`/buyers/track/${order._id || order.id}`)
//                 }
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Track Order
//               </button>
//             </div>
//           ))}

//         </div>
//       </SectionCard>

//     </div>
//   );
// }