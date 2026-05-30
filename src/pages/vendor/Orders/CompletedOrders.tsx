

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

import { useVendorCompletedOrders } from "../../../hooks/vendor/useVendorCompletedOrders"; 

export default function CompletedOrders() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorCompletedOrders();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
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
        Failed to load completed orders.
      </div>
    );
  }

  /* ================= SUMMARY ================= */

  const totalRevenue =
    data.completedOrders.reduce(
      (acc, item) => acc + item.total,
      0
    );

  const totalOrders =
    data.completedOrders.length;

  const totalItems =
    data.completedOrders.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    );

  /* ================= CHART DATA ================= */

  const revenueChart =
    data.completedOrders.map((o) => ({
      order: o.id,
      revenue: o.total,
    }));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Completed Orders"
        subtitle="Delivered and fulfilled customer orders"
      />

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Completed Orders"
          value={totalOrders}
          subtitle="Successfully delivered"
        />

        <StatCard
          title="Revenue"
          value={`₦${totalRevenue.toLocaleString()}`}
          subtitle="Completed sales"
        />

        <StatCard
          title="Items Sold"
          value={totalItems}
          subtitle="Delivered products"
        />
      </div>

      {/* REVENUE CHART */}

      <SectionCard title="Revenue by Order">
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={revenueChart}>
              <XAxis dataKey="order" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="revenue"
                fill="#111827"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* TABLE */}

      <SectionCard title="Completed Orders List">
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
                  Email
                </th>

                <th className="py-3">
                  Amount
                </th>

                <th className="py-3">
                  Qty
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Delivered
                </th>

                <th className="py-3">
                  Address
                </th>
              </tr>
            </thead>

            <tbody>
              {data.completedOrders.map(
                (order) => (
                  <tr
                    key={order.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {order.id}
                    </td>

                    <td className="py-4">
                      {order.customer}
                    </td>

                    <td className="py-4">
                      {order.email}
                    </td>

                    <td className="py-4">
                      ₦
                      {order.total.toLocaleString()}
                    </td>

                    <td className="py-4">
                      {order.quantity}
                    </td>

                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Delivered
                      </span>
                    </td>

                    <td className="py-4">
                      {
                        order.deliveredAt
                      }
                    </td>

                    <td className="py-4">
                      {
                        order.shippingAddress
                      }
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