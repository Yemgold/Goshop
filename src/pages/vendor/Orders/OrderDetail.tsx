

import React from "react";
import { useParams } from "react-router-dom";

import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { StatusBadge } from "../../../components/ui/StatusBadge";
import { PageHeader } from "../../../components/ui/PageHeader";

import type { Order } from "../../../types/vendor/vendor.types";

import { useOrder } from "../../../hooks/vendor/useOrder"; 
import { useUpdateVendorOrder } from "../../../hooks/vendor/useUpdateVendorOrder";

const OrderDetail: React.FC = () => {
  const { id } = useParams();

  const { data: order, isLoading, isError } = useOrder(id!);

  const {
    mutate: updateOrder,
    isPending,
    variables,
  } = useUpdateVendorOrder();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading order...
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load order
      </div>
    );
  }

  /* ================= UX STATE ================= */

  const isAccepting =
    isPending && variables?.status === "shipped";

  const isRejecting =
    isPending && variables?.status === "canceled";

  /* ================= ACTIONS ================= */

  const handleUpdate = (status: Order["status"]) => {
    updateOrder({ id: order.id, status });
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <PageHeader title={`Order #${order.id}`} />

      {/* STATUS */}
      <div className="flex items-center justify-between">
        <StatusBadge status={order.status} />

        <p className="text-sm text-gray-500">
          new Date(order.date ?? Date.now()).toLocaleString()
        </p>
      </div>

      {/* ITEMS */}
      <Card>
        <h2 className="font-semibold mb-4">Items</h2>

        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₦
                {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Total</span>
          <span>₦{order.total.toLocaleString()}</span>
        </div>
      </Card>

      {/* DELIVERY */}
      <Card>
        <h2 className="font-semibold mb-2">Delivery Info</h2>

        <p className="text-sm text-gray-600">
          Rider: {order.riderId ?? "Not assigned yet"}
        </p>

        <p className="text-sm text-gray-600">
          Status: {order.deliveryStatus}
        </p>
      </Card>

      {/* ACTIONS */}
      <div className="flex gap-3">

        <Button
          disabled={isPending || order.status === "shipped"}
          onClick={() => handleUpdate("shipped")}
        >
          {isAccepting ? "Accepting..." : "Accept Order"}
        </Button>

        <Button
          variant="danger"
          disabled={isPending || order.status === "canceled"}
          onClick={() => handleUpdate("canceled")}
        >
          {isRejecting ? "Rejecting..." : "Reject Order"}
        </Button>

      </div>

    </div>
  );
};

export default OrderDetail;