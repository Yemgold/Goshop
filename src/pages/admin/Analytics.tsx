


import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { SectionCard } from "../../components/ui/SectionCard";
import { DashboardGrid } from "../../components/ui/DashboardGrid";
import { StatCard } from "../../components/ui/StatCard";

/* ================= MOCK DATA ================= */

const revenueData = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 180000 },
  { month: "Mar", revenue: 150000 },
  { month: "Apr", revenue: 220000 },
  { month: "May", revenue: 310000 },
  { month: "Jun", revenue: 280000 },
];

const ordersData = [
  { month: "Jan", orders: 120 },
  { month: "Feb", orders: 180 },
  { month: "Mar", orders: 150 },
  { month: "Apr", orders: 240 },
  { month: "May", orders: 300 },
  { month: "Jun", orders: 260 },
];

/* ================= PAGE ================= */

export default function Analytics() {
  return (
    <div className="space-y-8">
      {/* ================= HEADER ================= */}

      <SectionCard title="Platform Analytics">
        <DashboardGrid>
          <StatCard
            title="Total Revenue"
            value="₦1,260,000"
          />

          <StatCard
            title="Total Orders"
            value="1,250"
          />

          <StatCard
            title="Active Vendors"
            value="320"
          />

          <StatCard
            title="Active Riders"
            value="84"
          />
        </DashboardGrid>
      </SectionCard>

      {/* ================= REVENUE CHART ================= */}

      <SectionCard title="Revenue Overview">
        <div className="w-full h-[350px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* ================= ORDERS CHART ================= */}

      <SectionCard title="Orders Overview">
        <div className="w-full h-[350px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* ================= EXTRA METRICS ================= */}

      <SectionCard title="Performance Metrics">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border bg-white">
            <p className="text-sm text-gray-500">
              Vendor Growth
            </p>

            <h2 className="text-3xl font-bold mt-2">
              +18%
            </h2>
          </div>

          <div className="p-5 rounded-2xl border bg-white">
            <p className="text-sm text-gray-500">
              Rider Activity
            </p>

            <h2 className="text-3xl font-bold mt-2">
              +12%
            </h2>
          </div>

          <div className="p-5 rounded-2xl border bg-white">
            <p className="text-sm text-gray-500">
              Customer Retention
            </p>

            <h2 className="text-3xl font-bold mt-2">
              87%
            </h2>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}