

import { useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { PageHeader } from "../../../components/ui/PageHeader"; 

import { StatCard } from "../../../components/ui/StatCard";

import { SectionCard } from "../../../components/ui/SectionCard"; 

import { useVendorPayouts } from "../../../hooks/vendor/useVendorPayouts";

import { requestVendorPayout } from "../../../services/vendor/vendor.service";

export default function Payouts() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorPayouts();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    amount: 0,
    bankName: "",
    accountNumber: "",
  });

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
        Failed to load payouts.
      </div>
    );
  }

  /* ================= CHART DATA ================= */

  const chartData = data.payouts.map(
    (payout) => ({
      id: payout.id,
      amount: payout.amount,
    })
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Vendor Payouts"
        subtitle="Manage withdrawals and payout history"
      />

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Available Balance"
          value={`₦${data.summary.availableBalance.toLocaleString()}`}
        />

        <StatCard
          title="Pending"
          value={`₦${data.summary.pendingPayouts.toLocaleString()}`}
        />

        <StatCard
          title="Paid Out"
          value={`₦${data.summary.completedPayouts.toLocaleString()}`}
        />

        <StatCard
          title="Withdrawals"
          value={
            data.summary.totalWithdrawals
          }
        />
      </div>

      {/* REQUEST PAYOUT */}

      <SectionCard title="Request Payout">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({
                ...form,
                amount: Number(
                  e.target.value
                ),
              })
            }
            className="border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Bank Name"
            value={form.bankName}
            onChange={(e) =>
              setForm({
                ...form,
                bankName:
                  e.target.value,
              })
            }
            className="border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Account Number"
            value={form.accountNumber}
            onChange={(e) =>
              setForm({
                ...form,
                accountNumber:
                  e.target.value,
              })
            }
            className="border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={async () => {
            setLoading(true);

            await requestVendorPayout(
              form
            );

            setLoading(false);

            window.location.reload();
          }}
          disabled={loading}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          {loading
            ? "Processing..."
            : "Request Payout"}
        </button>
      </SectionCard>

      {/* PAYOUT CHART */}

      <SectionCard title="Payout Amounts">
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={chartData}>
              <XAxis dataKey="id" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="amount"
                fill="#111827"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* PAYOUT TABLE */}

      <SectionCard title="Payout History">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Payout ID
                </th>

                <th className="py-3">
                  Amount
                </th>

                <th className="py-3">
                  Bank
                </th>

                <th className="py-3">
                  Account
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Requested
                </th>

                <th className="py-3">
                  Processed
                </th>
              </tr>
            </thead>

            <tbody>
              {data.payouts.map(
                (payout) => (
                  <tr
                    key={payout.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {payout.id}
                    </td>

                    <td className="py-4">
                      ₦
                      {payout.amount.toLocaleString()}
                    </td>

                    <td className="py-4">
                      {
                        payout.bankName
                      }
                    </td>

                    <td className="py-4">
                      {
                        payout.accountNumber
                      }
                    </td>

                    {/* STATUS */}

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          payout.status ===
                          "completed"
                            ? "bg-green-100 text-green-700"
                            : payout.status ===
                              "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {
                          payout.status
                        }
                      </span>
                    </td>

                    <td className="py-4">
                      {
                        payout.requestedAt
                      }
                    </td>

                    <td className="py-4">
                      {payout.processedAt ||
                        "-"}
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