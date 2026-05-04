
import { useNavigate } from "react-router-dom";
import { StatCard } from "../../components/ui/StatCard";
import { DashboardGrid } from "../../components/ui/DashboardGrid";
import { SectionCard } from "../../components/ui/SectionCard";
import { Button } from "../../components/ui/Button";

import { PromoterService } from "../../services/promoter.service";

export default function Dashboard() {
  const navigate = useNavigate();

  const totalOrders = PromoterService.getTotalOrders();
  const pending = PromoterService.getPendingOrders();
  const inProgress = PromoterService.getInProgressOrders();
  const completed = PromoterService.getCompletedOrders();
  const totalRevenue = PromoterService.getTotalRevenue();

  const recentOrders = PromoterService.getRecentOrders(5);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-xl">

        <h1 className="text-2xl font-bold">
          Welcome back, Promoter 📢
        </h1>

        <p className="text-sm text-gray-300 mt-1">
          ₦{totalRevenue.toLocaleString()} earned • {totalOrders} orders
        </p>

        <div className="flex gap-3 mt-4 flex-wrap">

          <Button onClick={() => navigate("/promoter/share")}>
            Share Products
          </Button>

          <Button onClick={() => navigate("/promoter/campaigns")}>
            View Campaigns
          </Button>

          <Button onClick={() => navigate("/promoter/analytics")}>
            Analytics
          </Button>

        </div>

      </div>

      {/* ================= STATS ================= */}
      <DashboardGrid>
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Pending" value={pending} />
        <StatCard title="In Progress" value={inProgress} />
        <StatCard title="Completed" value={completed} />
      </DashboardGrid>

      {/* ================= REVENUE ================= */}
      <SectionCard title="Total Revenue">

        <div className="text-2xl font-bold">
          ₦{totalRevenue.toLocaleString()}
        </div>

        <p className="text-sm text-gray-500 mt-1">
          From completed deliveries
        </p>

      </SectionCard>

      {/* ================= RECENT ORDERS ================= */}
      <SectionCard title="Recent Orders">

        <div className="space-y-3">

          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex justify-between items-center border-b pb-2"
            >

              <div>
                <p className="font-medium">
                  Order #{order.id}
                </p>

                <p className="text-xs text-gray-500">
                  {order.pickup} → {order.dropoff}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ₦{order.total.toLocaleString()}
                </p>

                <p className="text-xs text-gray-400">
                  {order.deliveryStatus}
                </p>
              </div>

            </div>
          ))}

        </div>

      </SectionCard>

    </div>
  );
}