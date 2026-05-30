

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

import { useVendorCustomers } from "../../../hooks/vendor/useVendorCustomers"; 

export default function Customers() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorCustomers();

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
        Failed to load customers.
      </div>
    );
  }

  /* ================= CHART ================= */

  const chartData = [
    {
      name: "Returning",
      value:
        data.summary.returningCustomers,
    },
    {
      name: "New",
      value:
        data.summary.newCustomers,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Vendor Customers"
        subtitle="Manage customer relationships and insights"
      />

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Customers"
          value={
            data.summary.totalCustomers
          }
        />

        <StatCard
          title="Returning"
          value={
            data.summary
              .returningCustomers
          }
        />

        <StatCard
          title="New Customers"
          value={
            data.summary.newCustomers
          }
        />

        <StatCard
          title="Avg Spend"
          value={`₦${data.summary.averageSpend.toLocaleString()}`}
        />
      </div>

      {/* CUSTOMER DISTRIBUTION */}

      <SectionCard title="Customer Distribution">
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

                <Cell fill="#2563EB" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* CUSTOMER TABLE */}

      <SectionCard title="Customer List">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Customer
                </th>

                <th className="py-3">
                  Email
                </th>

                <th className="py-3">
                  Orders
                </th>

                <th className="py-3">
                  Total Spent
                </th>

                <th className="py-3">
                  Last Purchase
                </th>

                <th className="py-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {data.customers.map(
                (customer) => (
                  <tr
                    key={customer.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {customer.name}
                    </td>

                    <td className="py-4">
                      {
                        customer.email
                      }
                    </td>

                    <td className="py-4">
                      {
                        customer.totalOrders
                      }
                    </td>

                    <td className="py-4">
                      ₦
                      {customer.totalSpent.toLocaleString()}
                    </td>

                    <td className="py-4">
                      {
                        customer.lastPurchase
                      }
                    </td>

                    {/* STATUS */}

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          customer.status ===
                          "returning"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {customer.status}
                      </span>
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