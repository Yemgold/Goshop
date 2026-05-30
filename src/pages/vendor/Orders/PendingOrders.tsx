


import { useState } from "react";

import { PageHeader } from "../../../components/ui/PageHeader"; 

import { SectionCard } from "../../../components/ui/SectionCard"; 

import { useVendorPendingOrders } from "../../../hooks/vendor/useVendorPendingOrders"; 

import { updatePendingOrderStatus } from "../../../services/vendor/vendor.service"; 

export default function PendingOrders() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorPendingOrders();

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="h-96 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load pending orders.
      </div>
    );
  }

  const handleStatusUpdate = async (
    id: string,
    status:
      | "pending"
      | "processing"
      | "shipped"
  ) => {
    try {
      setUpdatingId(id);

      await updatePendingOrderStatus(
        id,
        status
      );

      window.location.reload();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Pending Orders"
        subtitle="Orders awaiting fulfillment or shipment"
      />

      {/* TABLE */}

      <SectionCard title="Pending Fulfillment Queue">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
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
                  Payment
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Shipping
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
              {data.pendingOrders.map(
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

                    {/* PAYMENT STATUS */}

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          order.paymentStatus ===
                          "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {
                          order.paymentStatus
                        }
                      </span>
                    </td>

                    {/* ORDER STATUS */}

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${
                          order.orderStatus ===
                          "processing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {
                          order.orderStatus
                        }
                      </span>
                    </td>

                    <td className="py-4">
                      {
                        order.shippingAddress
                      }
                    </td>

                    <td className="py-4">
                      {order.createdAt}
                    </td>

                    {/* ACTION */}

                    <td className="py-4">
                      <select
                        value={
                          order.orderStatus
                        }
                        disabled={
                          updatingId ===
                          order.id
                        }
                        onChange={(e) =>
                          handleStatusUpdate(
                            order.id,
                            e.target
                              .value as any
                          )
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">
                          Pending
                        </option>

                        <option value="processing">
                          Processing
                        </option>

                        <option value="shipped">
                          Mark as Shipped
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