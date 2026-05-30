


import { SectionCard } from "../../components/ui/SectionCard";
import { DashboardGrid } from "../../components/ui/DashboardGrid";
import { StatCard } from "../../components/ui/StatCard";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <SectionCard title="Admin Dashboard">
        <DashboardGrid>
          <StatCard
            title="Total Users"
            value="12,430"
          />

          <StatCard
            title="Vendors"
            value="430"
          />

          <StatCard
            title="Riders"
            value="120"
          />

          <StatCard
            title="Promoters"
            value="87"
          />

          <StatCard
            title="Staff"
            value="231"
          />

          <StatCard
            title="Orders"
            value="9,203"
          />
        </DashboardGrid>
      </SectionCard>

      <SectionCard title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 rounded-2xl bg-black text-white">
            Manage Users
          </button>

          <button className="p-4 rounded-2xl bg-black text-white">
            Vendors
          </button>

          <button className="p-4 rounded-2xl bg-black text-white">
            Riders
          </button>

          <button className="p-4 rounded-2xl bg-black text-white">
            Analytics
          </button>
        </div>
      </SectionCard>
    </div>
  );
}