


import { useState } from "react";

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

import { useVendorShipping } from "../../../hooks/vendor/useVendorShipping"; 

import { updateShipmentStatus } from "../../../services/vendor/vendor.service"; 

export default function Shipping() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorShipping();

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

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
        Failed to load shipping data.
      </div>
    );
  }

  /* ================= CHART DATA ================= */

  const chartData = [
    {
      name: "Pending",
      value:
        data.summary.pendingShipments,
    },

    {
      name: "Shipped",
      value:
        data.summary.shippedOrders,
    },

    {
      name: "Delivered",
      value:
        data.summary.deliveredOrders,
    },

    {
      name: "Failed",
      value:
        data.summary.failedDeliveries,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Vendor Shipping"
        subtitle="Manage shipments and delivery logistics"
      />

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard
          title="Total"
          value={
            data.summary.totalShipments
          }
        />

        <StatCard
          title="Pending"
          value={
            data.summary.pendingShipments
          }
        />

        <StatCard
          title="Shipped"
          value={
            data.summary.shippedOrders
          }
        />

        <StatCard
          title="Delivered"
          value={
            data.summary.deliveredOrders
          }
        />

        <StatCard
          title="Failed"
          value={
            data.summary.failedDeliveries
          }
        />
      </div>

      {/* SHIPPING OVERVIEW */}

      <SectionCard title="Shipping Status Overview">
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
                <Cell fill="#EAB308" />

                <Cell fill="#3B82F6" />

                <Cell fill="#22C55E" />

                <Cell fill="#EF4444" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* SHIPMENTS TABLE */}

      <SectionCard title="Shipment Records">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Shipment ID
                </th>

                <th className="py-3">
                  Order ID
                </th>

                <th className="py-3">
                  Customer
                </th>

                <th className="py-3">
                  Courier
                </th>

                <th className="py-3">
                  Tracking #
                </th>

                <th className="py-3">
                  Fee
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  ETA
                </th>

                <th className="py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.shipments.map(
                (shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {shipment.id}
                    </td>

                    <td className="py-4">
                      {
                        shipment.orderId
                      }
                    </td>

                    <td className="py-4">
                      {
                        shipment.customer
                      }
                    </td>

                    <td className="py-4">
                      {
                        shipment.courier
                      }
                    </td>

                    <td className="py-4">
                      {
                        shipment.trackingNumber
                      }
                    </td>

                    <td className="py-4">
                      ₦
                      {shipment.shippingFee.toLocaleString()}
                    </td>

                    {/* STATUS */}

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          shipment.status ===
                          "delivered"
                            ? "bg-green-100 text-green-700"
                            : shipment.status ===
                              "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : shipment.status ===
                              "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {
                          shipment.status
                        }
                      </span>
                    </td>

                    <td className="py-4">
                      {
                        shipment.estimatedDelivery
                      }
                    </td>

                    {/* ACTION */}

                    <td className="py-4">
                      <select
                        value={
                          shipment.status
                        }
                        disabled={
                          updatingId ===
                          shipment.id
                        }
                        onChange={async (
                          e
                        ) => {
                          setUpdatingId(
                            shipment.id
                          );

                          await updateShipmentStatus(
                            shipment.id,
                            e.target
                              .value as any
                          );

                          window.location.reload();
                        }}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">
                          Pending
                        </option>

                        <option value="shipped">
                          Shipped
                        </option>

                        <option value="delivered">
                          Delivered
                        </option>

                        <option value="failed">
                          Failed
                        </option>
                      </select>
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