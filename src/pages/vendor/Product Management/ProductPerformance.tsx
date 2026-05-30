

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { PageHeader } from "../../../components/ui/PageHeader";

import { SectionCard } from "../../../components/ui/SectionCard";

import { StatCard } from "../../../components/ui/StatCard";

import { useVendorProductPerformance } from "../../../hooks/vendor/useVendorProductPerformance";

export default function ProductPerformance() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorProductPerformance();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>

        <div className="h-80 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load product performance.
      </div>
    );
  }

  const { summary, performance } =
    data;

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Product Performance"
        subtitle="Track sales, revenue and conversion metrics for products"
      />

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={summary.totalProducts}
        />

        <StatCard
          title="Best Seller"
          value={summary.bestSeller}
        />

        <StatCard
          title="Worst Seller"
          value={summary.worstSeller}
        />

        <StatCard
          title="Revenue"
          value={`₦${summary.totalProductRevenue.toLocaleString()}`}
        />
      </div>

      {/* CHART */}

      <SectionCard title="Revenue by Product">
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={performance}>
              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="revenue"
                fill="#111827"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* TABLE */}

      <SectionCard title="Product Metrics">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Product
                </th>

                <th className="py-3">
                  Category
                </th>

                <th className="py-3">
                  Views
                </th>

                <th className="py-3">
                  Sales
                </th>

                <th className="py-3">
                  Revenue
                </th>

                <th className="py-3">
                  Conversion
                </th>

                <th className="py-3">
                  Refunds
                </th>

                <th className="py-3">
                  Stock Left
                </th>
              </tr>
            </thead>

            <tbody>
              {performance.map((item) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="py-4 font-medium">
                    {item.name}
                  </td>

                  <td className="py-4">
                    {item.category}
                  </td>

                  <td className="py-4">
                    {item.views}
                  </td>

                  <td className="py-4">
                    {item.sales}
                  </td>

                  <td className="py-4">
                    ₦
                    {item.revenue.toLocaleString()}
                  </td>

                  <td className="py-4">
                    {item.conversionRate}%
                  </td>

                  <td className="py-4">
                    {item.refunds}
                  </td>

                  <td className="py-4">
                    {item.stockLeft}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}