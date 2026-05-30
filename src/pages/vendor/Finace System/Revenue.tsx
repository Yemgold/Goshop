

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import { PageHeader } from "../../../components/ui/PageHeader"; 

import { StatCard } from "../../../components/ui/StatCard";

import { SectionCard } from "../../../components/ui/SectionCard";

import { useVendorRevenue } from "../../../hooks/vendor/useVendorRevenue";

export default function Revenue() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorRevenue();

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

        <div className="h-96 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load revenue data.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Vendor Revenue"
        subtitle="Track earnings, profits and payouts"
      />

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Revenue"
          value={`₦${data.summary.totalRevenue.toLocaleString()}`}
        />

        <StatCard
          title="Profit"
          value={`₦${data.summary.totalProfit.toLocaleString()}`}
        />

        <StatCard
          title="Orders"
          value={
            data.summary.totalOrders
          }
        />

        <StatCard
          title="Pending Payout"
          value={`₦${data.summary.pendingPayouts.toLocaleString()}`}
        />

        <StatCard
          title="Paid Out"
          value={`₦${data.summary.completedPayouts.toLocaleString()}`}
        />

        <StatCard
          title="Platform Fees"
          value={`₦${data.summary.platformFees.toLocaleString()}`}
        />
      </div>

      {/* REVENUE CHART */}

      <SectionCard title="Revenue vs Profit">
        <div className="h-96">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={data.revenueChart}
            >
              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="profit"
                stroke="#16A34A"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* TRANSACTIONS */}

      <SectionCard title="Revenue Transactions">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Transaction
                </th>

                <th className="py-3">
                  Order
                </th>

                <th className="py-3">
                  Customer
                </th>

                <th className="py-3">
                  Amount
                </th>

                <th className="py-3">
                  Fee
                </th>

                <th className="py-3">
                  Net
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {data.transactions.map(
                (txn) => (
                  <tr
                    key={txn.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {txn.id}
                    </td>

                    <td className="py-4">
                      {txn.orderId}
                    </td>

                    <td className="py-4">
                      {txn.customer}
                    </td>

                    <td className="py-4">
                      ₦
                      {txn.amount.toLocaleString()}
                    </td>

                    <td className="py-4">
                      ₦
                      {txn.fee.toLocaleString()}
                    </td>

                    <td className="py-4 font-semibold">
                      ₦
                      {txn.net.toLocaleString()}
                    </td>

                    {/* STATUS */}

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          txn.status ===
                          "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {txn.status}
                      </span>
                    </td>

                    <td className="py-4">
                      {txn.createdAt}
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