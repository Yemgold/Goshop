
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { SectionCard } from "../../components/ui/SectionCard";

import { useVendorAnalytics } from "../../hooks/vendor/useVendorAnalytics";


export default function Analytics() {
  const { data, isLoading, isError } = useVendorAnalytics();

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError || !data) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load analytics. Try refreshing.
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      {/* HEADER */}
      <PageHeader title="Vendor Analytics" />

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <StatCard
          title="Revenue"
          value={`₦${data.revenue.toLocaleString()}`}
          subtitle="+18% this week"
        />

        <StatCard
          title="Orders"
          value={data.orders}
          subtitle="12 pending"
        />

        <StatCard
          title="Conversion Rate"
          value={`${data.conversionRate}%`}
          subtitle="+1.2% improvement"
        />

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* LINE CHART */}
        <SectionCard title="Revenue Trend">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.salesChart || []}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#111"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* BAR CHART */}
        <SectionCard title="Top Products Sales">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.topProducts || []}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

      </div>

      {/* INSIGHTS */}
      <SectionCard title="Performance Insights">
        <div className="text-sm text-gray-600 space-y-2">
          <p>• Best performing day: {data.insights?.bestDay}</p>
          <p>• Highest selling category: {data.insights?.topCategory}</p>
          <p>• Return rate: {data.insights?.returnRate}%</p>
        </div>
      </SectionCard>

    </div>
  );
}