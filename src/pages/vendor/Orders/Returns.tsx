

import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { PageHeader } from "../../../components/ui/PageHeader"; 

import { StatCard } from "../../../components/ui/StatCard"; 
import { SectionCard } from "../../../components/ui/SectionCard"; 

import { useVendorReturns } from "../../../hooks/vendor/useVendorReturns"; 

import { updateReturnStatus } from "../../../services/vendor/vendor.service";

export default function Returns() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorReturns();

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

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
        Failed to load returns.
      </div>
    );
  }

  /* ================= CHART DATA ================= */

  const chartData = [
    {
      name: "Approved",
      value:
        data.summary.approvedReturns,
    },

    {
      name: "Pending",
      value:
        data.summary.pendingReturns,
    },

    {
      name: "Rejected",
      value:
        data.summary.rejectedReturns,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Vendor Returns"
        subtitle="Manage product returns and refunds"
      />

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard
          title="Total Returns"
          value={
            data.summary.totalReturns
          }
        />

        <StatCard
          title="Pending"
          value={
            data.summary.pendingReturns
          }
        />

        <StatCard
          title="Approved"
          value={
            data.summary.approvedReturns
          }
        />

        <StatCard
          title="Rejected"
          value={
            data.summary.rejectedReturns
          }
        />

        <StatCard
          title="Refunded"
          value={`₦${data.summary.refundedAmount.toLocaleString()}`}
        />
      </div>

      {/* RETURNS CHART */}

      <SectionCard title="Returns Overview">
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
                <Cell fill="#22C55E" />

                <Cell fill="#EAB308" />

                <Cell fill="#EF4444" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* RETURNS TABLE */}

      <SectionCard title="Return Requests">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Return ID
                </th>

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
                  Reason
                </th>

                <th className="py-3">
                  Refund
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Date
                </th>

                <th className="py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.returns.map((item) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="py-4 font-medium">
                    {item.id}
                  </td>

                  <td className="py-4">
                    {item.orderId}
                  </td>

                  <td className="py-4">
                    {item.customer}
                  </td>

                  <td className="py-4">
                    {item.product}
                  </td>

                  <td className="py-4">
                    {item.reason}
                  </td>

                  <td className="py-4">
                    ₦
                    {item.refundAmount.toLocaleString()}
                  </td>

                  {/* STATUS */}

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        item.status ===
                        "approved"
                          ? "bg-green-100 text-green-700"
                          : item.status ===
                            "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4">
                    {item.createdAt}
                  </td>

                  {/* ACTION */}

                  <td className="py-4 flex gap-2">
                    <button
                      disabled={
                        updatingId ===
                        item.id
                      }
                      onClick={async () => {
                        setUpdatingId(
                          item.id
                        );

                        await updateReturnStatus(
                          item.id,
                          "approved"
                        );

                        window.location.reload();
                      }}
                      className="px-3 py-1 rounded text-sm bg-green-600 text-white"
                    >
                      Approve
                    </button>

                    <button
                      disabled={
                        updatingId ===
                        item.id
                      }
                      onClick={async () => {
                        setUpdatingId(
                          item.id
                        );

                        await updateReturnStatus(
                          item.id,
                          "rejected"
                        );

                        window.location.reload();
                      }}
                      className="px-3 py-1 rounded text-sm bg-red-600 text-white"
                    >
                      Reject
                    </button>
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