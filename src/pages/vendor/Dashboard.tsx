


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { StatCard } from "../../components/ui/StatCard";
import { DashboardGrid } from "../../components/ui/DashboardGrid";
import { SectionCard } from "../../components/ui/SectionCard";

import { useVendorDashboard } from "../../hooks/vendor/useVendorDashboard";
import { useAuthStore } from "../../store/auth.store";
import { getRoleRoute } from "../../utils/roleRedirect";

import CreatePhysicalProductModal from "../../components/product/CreateProductModal";
import CreateDigitalProductModal from "../../components/product/CreateDigitalProductModal";

import { Button } from "../../components/ui/Button";



export default function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useVendorDashboard();

  const currentRole = useAuthStore((s) => s.user?.activeRole);

  const [openPhysicalModal, setOpenPhysicalModal] = useState(false);
  const [openDigitalModal, setOpenDigitalModal] = useState(false);

  const user = useAuthStore((state) => state.user);

  const recentOrders = data?.recentOrders ?? [];

  /* ================= ROLE REDIRECT ================= */
  useEffect(() => {
    if (currentRole && currentRole !== "vendor") {
      navigate(getRoleRoute(currentRole));
    }
  }, [currentRole, navigate]);

  if (isLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="p-6 text-red-500">Error loading dashboard</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">

      {/* ================= STORE HERO ================= */}
         
         {/* ================= STORE HERO ================= */}
<SectionCard title="Your Store">
  <div className="flex flex-col md:flex-row gap-6">

    {/* IMAGE */}
    <div className="w-full md:flex-1">
      <div className="relative rounded-3xl overflow-hidden shadow-xl">

        <img
          src="/images/store.png"
          className="w-full h-64 md:h-80 object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-0 left-0 p-6 text-white">
          <p className="text-sm text-white/80">
            Vendor Dashboard
          </p>
          <h1 className="text-3xl font-bold">
            Welcome Back 👋
          </h1>
        </div>

      </div>
    </div>

    {/* ACTION PANEL (ADD BUTTON HERE) */}
    <div className="w-full md:w-[280px] flex flex-col gap-4 justify-center">

      <Button
        onClick={() =>
          navigate(`/viral-feed?ref=${user?.businessId}`)
        }
        className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold"
      >
        🚀 Share My Store
      </Button>

      <p className="text-xs text-gray-500">
        Share your store as a TikTok-style feed and drive traffic from WhatsApp, Instagram & ads.
      </p>

    </div>

  </div>
</SectionCard>

      {/* ================= STATS ================= */}
      <DashboardGrid>
       <StatCard title="Revenue" value={`₦${data?.revenue ?? 0}`} />
        <StatCard title="Orders" value={data.orders} />
        <StatCard title="Products" value={data.products} />
      </DashboardGrid>

      {/* ================= RECENT ORDERS ================= */}
      <SectionCard title="Recent Orders">
        <div className="space-y-3">
          {recentOrders.map((order) => (
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

      {/* ================= MODALS ================= */}
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