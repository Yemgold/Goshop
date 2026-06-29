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
//   const cartItemsCount = dashboard.cartCount ?? 0;
//   const pendingOrdersCount = dashboard.stats?.pendingOrders ?? 0;

//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-10">

//       {/* ================= QUICK ACTIONS ================= */}
//       <SectionCard title="Quick Actions">
//         <p className="text-sm text-gray-500 mb-4">
//           {cartItemsCount} items in cart • {pendingOrdersCount} active orders
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

//       {/* ================= MARKET PRODUCTS ================= */}

//       <SectionCard title="Continue Shopping">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//           {safeProducts.slice(0, 8).map((p) => (
//             <Card
//               key={p.id}
//               className="p-4 cursor-pointer"
//               onClick={() => navigate(`/buyers/product/${p.id}`)}
//             >
//               <img src={p.image} className="h-32 w-full object-contain" />
//               <p className="mt-2 font-medium">{p.name}</p>
//               <p className="font-semibold">₦{p.price}</p>
//             </Card>
//           ))}
//         </div>
//       </SectionCard>

//       {/* ================= DIGITAL PRODUCTS ================= */}

//       {/* ================= RECENT ORDERS ================= */}
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


















import { useNavigate } from "react-router-dom";
import { ShoppingBag, Download } from "lucide-react";

import { useBuyerDashboard } from "../../hooks/buyer/useBuyerDashboard";
import { mapBuyerDashboard } from "../../mappers/buyerDashboard.mapper";

import marketplaceImage from "../../image/marketplace.png";
import digitalproductsImage from "../../image/digitalproducts.png";

import { SectionCard } from "../../components/ui/SectionCard";

export default function BuyerDashboard() {
  const navigate = useNavigate();

  const { data, isLoading } = useBuyerDashboard();

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  const dashboard = mapBuyerDashboard(data!);

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
      </SectionCard>

      {/* ================= SHOPPING ================= */}

      <SectionCard title="Start Shopping">

        <div className="grid md:grid-cols-2 gap-8">

          {/* MARKETPLACE */}

          <div
            onClick={() => navigate("/buyers/marketplace")}
            className="cursor-pointer rounded-3xl overflow-hidden bg-white border shadow-lg hover:shadow-2xl transition duration-300 group"
          >
            <img
  src={marketplaceImage}
  alt="Marketplace"
  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
/>

            <div className="p-6">

              <div className="flex items-center gap-3 mb-3">

                <ShoppingBag className="text-blue-600" size={28} />

                <h2 className="text-2xl font-bold">
                  Marketplace
                </h2>

              </div>

              <p className="text-gray-600">
                Shop thousands of products from trusted vendors.
                Electronics, Fashion, Phones, Home Appliances,
                Groceries and much more.
              </p>

              <button
                className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Visit Marketplace
              </button>

            </div>
          </div>

          {/* DIGITAL PRODUCTS */}

          <div
            onClick={() => navigate("/buyers/digital-products")}
            className="cursor-pointer rounded-3xl overflow-hidden bg-white border shadow-lg hover:shadow-2xl transition duration-300 group"
          >
                       <img
  src={digitalproductsImage}
  alt="Marketplace"
  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
/>

            <div className="p-6">

              <div className="flex items-center gap-3 mb-3">

                <Download className="text-purple-600" size={28} />

                <h2 className="text-2xl font-bold">
                  Digital Products
                </h2>

              </div>

              <p className="text-gray-600">
                Purchase premium eBooks, online courses,
                gift cards, software, templates,
                AI tools, music and downloadable resources.
              </p>

              <button
                className="mt-6 w-full bg-purple-700 text-white py-3 rounded-xl font-semibold hover:bg-purple-800 transition"
              >
                Browse Digital Products
              </button>

            </div>
          </div>

        </div>

      </SectionCard>

      {/* ================= RECENT ORDERS ================= */}

      <SectionCard title="Recent Orders">

        <div className="space-y-3">

          {safeOrders.length === 0 ? (

            <p className="text-gray-500">
              No recent orders yet.
            </p>

          ) : (

            safeOrders.map((o) => (

              <div
                key={o.id}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <p>Order #{o.id}</p>

                  <p className="text-xs text-gray-500">
                    {o.status}
                  </p>
                </div>

                <p className="font-semibold">
                  ₦{o.total}
                </p>

              </div>

            ))

          )}

        </div>

      </SectionCard>

    </div>
  );
}