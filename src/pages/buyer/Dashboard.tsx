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
