




import { StatCard } from "../../components/ui/StatCard";
import { DashboardGrid } from "../../components/ui/DashboardGrid";
import { SectionCard } from "../../components/ui/SectionCard";


import { PromoterService } from "../../services/promoter.service";



export default function Dashboard() {
 

 

  const totalOrders = PromoterService.getTotalOrders();
  const pending = PromoterService.getPendingOrders();
  const inProgress = PromoterService.getInProgressOrders();
  const completed = PromoterService.getCompletedOrders();
  const totalRevenue = PromoterService.getTotalRevenue();
  const recentOrders = PromoterService.getRecentOrders(5);

 

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">

      {/* ================= PROMOTER HERO ================= */}
      <SectionCard title="Promoter Hub">
        <div className="flex flex-col md:flex-row gap-6">

          {/* ================= IMAGE ================= */}
          <div className="w-full md:flex-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">

              <img
                src="/images/promoter.png"
                alt="Promoter Dashboard"
                className="w-full h-64 md:h-80 object-cover"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-sm text-white/80 mb-1">
                  Affiliate & Marketing Dashboard
                </p>

                <h1 className="text-3xl font-bold">
                  Promote & Earn 🚀
                </h1>

                <p className="text-sm text-white/90 mt-2 max-w-md">
                  Share products, run campaigns, and track your commissions in real time.
                </p>
              </div>

            </div>
          </div>

          {/* ================= ACTION BUTTONS =================
          <div className="w-full md:w-72 flex flex-col gap-3">

            <Button
              onClick={() => handleNavigate("share", "/promoter/share")}
              disabled={spinningBtn !== null}
              className="flex items-center justify-center gap-2"
            >
              {spinningBtn === "share" && <Spinner />}
              Share Products
            </Button>


            <Button
              onClick={() => handleNavigate("campaigns", "/promoter/campaigns")}
              disabled={spinningBtn !== null}
              className="flex items-center justify-center gap-2"
            >
              {spinningBtn === "campaigns" && <Spinner />}
              View Campaigns
            </Button>



            <Button
              onClick={() => handleNavigate("analytics", "/promoter/analytics")}
              disabled={spinningBtn !== null}
              className="flex items-center justify-center gap-2"
            >
              {spinningBtn === "analytics" && <Spinner />}
              Analytics
            </Button>

          </div> */}

        </div>
      </SectionCard>

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
                <p className="font-medium">Order #{order.id}</p>
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