

import React from "react";
import { toast } from "react-toastify";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { PageHeader } from "../../components/ui/PageHeader";

import { useVendorOrders } from "../../hooks/vendor/useVendorOrders";
import { useUpdateVendorOrder } from "../../hooks/vendor/useUpdateVendorOrder"; 

import type { Order } from "../../types/vendor.types";

const Orders: React.FC = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useVendorOrders();

  const { mutate: updateOrder, isPending } = useUpdateVendorOrder();

  /* ================= ACTION ================= */
  const handleUpdate = (id: string, status: Order["status"]) => {
    updateOrder(
      { id, status },
      {
        onSuccess: () => {
          toast.success(`Order ${status}`);
        },
        onError: () => {
          toast.error("Failed to update order");
        },
      }
    );
  };

  /* ================= STATES ================= */

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  if (isError || !orders) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load orders
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <PageHeader title="Vendor Orders" />

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">
                  Order #{order.id}
                </h2>

                <p className="text-sm text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">
                  ₦{order.total.toLocaleString()}
                </p>

                <StatusBadge status={order.status} />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex gap-3">
              <Button
                disabled={isPending}
                onClick={() =>
                  handleUpdate(order.id, "Accepted")
                }
              >
                Accept
              </Button>

              <Button
                variant="danger"
                disabled={isPending}
                onClick={() =>
                  handleUpdate(order.id, "Rejected")
                }
              >
                Reject
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;