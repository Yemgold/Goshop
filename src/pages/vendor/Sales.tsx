


import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { SectionCard } from "../../components/ui/SectionCard";

import { useVendorSales } from "../../hooks/vendor/useVendorSales";

export default function Sales() {
  const { data, isLoading, isError } =
    useVendorSales();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-gray-200 rounded-2xl animate-pulse"
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
        Failed to load sales data.
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <PageHeader
        title="Vendor Sales"
        subtitle="Track revenue, orders, refunds, and sales performance."
      />

      {/* ================================================= */}
      {/* KPI CARDS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`₦${data.summary.totalRevenue.toLocaleString()}`}
          subtitle="Overall sales revenue"
        />

        <StatCard
          title="Total Orders"
          value={data.summary.totalOrders}
          subtitle="All customer orders"
        />

        <StatCard
          title="Completed Orders"
          value={data.summary.completedOrders}
          subtitle="Successfully delivered"
        />

        <StatCard
          title="Pending Orders"
          value={data.summary.pendingOrders}
          subtitle="Awaiting fulfillment"
        />

        <StatCard
          title="Refunded Orders"
          value={data.summary.refundedOrders}
          subtitle="Processed refunds"
        />

        <StatCard
          title="Canceled Orders"
          value={data.summary.canceledOrders}
          subtitle="Canceled purchases"
        />

        <StatCard
          title="Average Order Value"
          value={`₦${data.summary.averageOrderValue.toLocaleString()}`}
          subtitle="Average customer spend"
        />
      </div>

      {/* ================================================= */}
      {/* CHARTS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* ================= REVENUE TREND ================= */}

        <SectionCard title="Revenue Trends">
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={data.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#111827"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* ================= ORDERS OVERVIEW ================= */}

        <SectionCard title="Orders Overview">
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={data.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="orders"
                  fill="#2563EB"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* ================================================= */}
      {/* SALES TABLE */}
      {/* ================================================= */}

      <SectionCard title="Recent Sales">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Order ID
                </th>

                <th className="py-3">
                  Customer
                </th>

                <th className="py-3">
                  Product
                </th>

                <th className="py-3">
                  Amount
                </th>

                <th className="py-3">
                  Quantity
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Payment
                </th>

                <th className="py-3">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {data.recentSales.map(
                (sale) => (
                  <tr
                    key={sale.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {sale.id}
                    </td>

                    <td className="py-4">
                      {sale.customer}
                    </td>

                    <td className="py-4">
                      {sale.product}
                    </td>

                    <td className="py-4">
                      ₦
                      {sale.amount.toLocaleString()}
                    </td>

                    <td className="py-4">
                      {sale.quantity}
                    </td>

                    <td className="py-4 capitalize">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          sale.status ===
                          "completed"
                            ? "bg-green-100 text-green-700"
                            : sale.status ===
                              "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : sale.status ===
                              "refunded"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {sale.status}
                      </span>
                    </td>

                    <td className="py-4 capitalize">
                      {
                        sale.paymentStatus
                      }
                    </td>

                    <td className="py-4">
                      {sale.createdAt}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}