



import { useNavigate } from "react-router-dom";
import { StatCard } from "../../components/ui/StatCard";
import { DashboardGrid } from "../../components/ui/DashboardGrid";
import { SectionCard } from "../../components/ui/SectionCard";
import { Button } from "../../components/ui/Button";

import { useVendorDashboard } from "../../hooks/vendor/useVendorDashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useVendorDashboard();

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="p-6 text-red-500">Error loading dashboard</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-xl">

        <h1 className="text-2xl font-bold">
          Welcome back, {data.vendorName || "Vendor"} 👋
        </h1>

        <p className="text-sm text-gray-300 mt-1">
          ₦{data.revenue} revenue • {data.orders} orders • {data.products} products
        </p>

        <div className="flex gap-3 mt-4 flex-wrap">

          <Button onClick={() => navigate("/vendor/products")}>
            Manage Products
          </Button>

          <Button onClick={() => navigate("/vendor/orders")}>
            View Orders
          </Button>

          <Button onClick={() => navigate("/vendor/analytics")}>
            Analytics
          </Button>

        </div>

      </div>

      {/* ================= STATS ================= */}
      <DashboardGrid>
        <StatCard title="Revenue" value={`₦${data.revenue}`} />
        <StatCard title="Orders" value={data.orders} />
        <StatCard title="Products" value={data.products} />
      </DashboardGrid>

      {/* ================= RECENT ORDERS ================= */}
      <SectionCard title="Recent Orders">

        <div className="space-y-3">

          {data.recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center border-b pb-2"
            >

              <div>
                <p className="font-medium">{order.customer}</p>
                <p className="text-xs text-gray-500">
                  Order #{order.id}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">₦{order.amount}</p>
                <p className="text-xs text-gray-400">
                  {order.status || "Processing"}
                </p>
              </div>

            </div>
          ))}

        </div>

      </SectionCard>

    </div>
  );
}