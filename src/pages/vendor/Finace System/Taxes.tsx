


import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { PageHeader } from "../../../components/ui/PageHeader";

import { StatCard } from "../../../components/ui/StatCard"; 

import { SectionCard } from "../../../components/ui/SectionCard"; 

import { useVendorTaxes } from "../../../hooks/vendor/useVendorTaxes"; 

export default function Taxes() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorTaxes();

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
        Failed to load tax data.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Vendor Taxes"
        subtitle="Track taxes, VAT and compliance records"
      />

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Tax Collected"
          value={`₦${data.summary.totalTaxCollected.toLocaleString()}`}
        />

        <StatCard
          title="Taxable Revenue"
          value={`₦${data.summary.taxableRevenue.toLocaleString()}`}
        />

        <StatCard
          title="VAT Paid"
          value={`₦${data.summary.vatPaid.toLocaleString()}`}
        />

        <StatCard
          title="Pending Tax"
          value={`₦${data.summary.pendingTax.toLocaleString()}`}
        />
      </div>

      {/* TAX CHART */}

      <SectionCard title="Monthly Tax Overview">
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={data.taxChart}
            >
              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="tax"
                stroke="#2563EB"
                fill="#93C5FD"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* TAX TABLE */}

      <SectionCard title="Tax Transactions">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Tax ID
                </th>

                <th className="py-3">
                  Order ID
                </th>

                <th className="py-3">
                  Customer
                </th>

                <th className="py-3">
                  Order Amount
                </th>

                <th className="py-3">
                  Tax Amount
                </th>

                <th className="py-3">
                  Tax Type
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
              {data.taxTransactions.map(
                (tax) => (
                  <tr
                    key={tax.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {tax.id}
                    </td>

                    <td className="py-4">
                      {tax.orderId}
                    </td>

                    <td className="py-4">
                      {tax.customer}
                    </td>

                    <td className="py-4">
                      ₦
                      {tax.amount.toLocaleString()}
                    </td>

                    <td className="py-4 font-semibold">
                      ₦
                      {tax.taxAmount.toLocaleString()}
                    </td>

                    <td className="py-4">
                      {tax.taxType}
                    </td>

                    {/* STATUS */}

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tax.status ===
                          "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {tax.status}
                      </span>
                    </td>

                    <td className="py-4">
                      {tax.createdAt}
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