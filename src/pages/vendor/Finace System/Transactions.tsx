

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

import { PageHeader } from "../../../components/ui/PageHeader"; 

import { StatCard } from "../../../components/ui/StatCard"; 

import { SectionCard } from "../../../components/ui/SectionCard"; 

import { useVendorTransactions } from "../../../hooks/vendor/useVendorTransactions";

export default function Transactions() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorTransactions();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
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
        Failed to load transactions.
      </div>
    );
  }

  /* ================= CHART DATA ================= */

  const chartData = [
    {
      name: "Successful",
      value:
        data.summary
          .successfulTransactions,
    },

    {
      name: "Failed",
      value:
        data.summary
          .failedTransactions,
    },

    {
      name: "Refunded",
      value:
        data.summary
          .refundedTransactions,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Vendor Transactions"
        subtitle="Track payment activities and transaction history"
      />

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard
          title="Transactions"
          value={
            data.summary
              .totalTransactions
          }
        />

        <StatCard
          title="Successful"
          value={
            data.summary
              .successfulTransactions
          }
        />

        <StatCard
          title="Failed"
          value={
            data.summary
              .failedTransactions
          }
        />

        <StatCard
          title="Refunded"
          value={
            data.summary
              .refundedTransactions
          }
        />

        <StatCard
          title="Volume"
          value={`₦${data.summary.totalVolume.toLocaleString()}`}
        />
      </div>

      {/* PIE CHART */}

      <SectionCard title="Transaction Status Breakdown">
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={120}
                label
              >
                <Cell fill="#16A34A" />

                <Cell fill="#DC2626" />

                <Cell fill="#2563EB" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* TRANSACTION TABLE */}

      <SectionCard title="Transaction History">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Transaction ID
                </th>

                <th className="py-3">
                  Order ID
                </th>

                <th className="py-3">
                  Customer
                </th>

                <th className="py-3">
                  Amount
                </th>

                <th className="py-3">
                  Method
                </th>

                <th className="py-3">
                  Reference
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
                      {
                        txn.paymentMethod
                      }
                    </td>

                    <td className="py-4">
                      {txn.reference}
                    </td>

                    {/* STATUS */}

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          txn.status ===
                          "successful"
                            ? "bg-green-100 text-green-700"
                            : txn.status ===
                              "failed"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
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