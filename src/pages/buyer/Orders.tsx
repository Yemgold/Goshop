


import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getBuyerOrders } from "../../services/buyer.service";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";

export type Order = {
  id: string;
  items: {
    id: string;
    title: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  date: string;
  status: "Processing" | "Delivered" | "Cancelled";
};

export default function Orders() {
  const navigate = useNavigate();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ["buyer-orders"],
    queryFn: getBuyerOrders,
  });

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load orders
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (!orders.length) {
    return (
      <div className="p-6 text-center space-y-4">
        <PageHeader title="My Orders" />
        <EmptyState text="No orders yet" />

        <Button onClick={() => navigate("/buyer/home")}>
          Start Shopping
        </Button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <PageHeader title="My Orders" />

      <div className="space-y-4">

        {orders.map((order) => (
          <Card key={order.id} className="p-4 space-y-3">

            {/* HEADER */}
            <div className="flex justify-between items-center">

              <h2 className="font-semibold">
                Order #{order.id}
              </h2>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : order.status === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>

            </div>

            {/* DATE */}
            <p className="text-xs text-gray-500">
              {order.date
                ? new Date(order.date).toLocaleString()
                : "No date"}
            </p>

            {/* ITEMS */}
            <div className="space-y-1 text-sm border-t pt-2">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between"
                >
                  <span>
                    {item.title} × {item.quantity}
                  </span>

                  <span>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}

            </div>

            {/* TOTAL */}
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>₦{order.total.toLocaleString()}</span>
            </div>

            {/* ACTION */}
            <Button
              onClick={() =>
                navigate(`/buyer/track/${order.id}`)
              }
              className="w-full"
            >
              Track Order
            </Button>

          </Card>
        ))}

      </div>

    </div>
  );
}