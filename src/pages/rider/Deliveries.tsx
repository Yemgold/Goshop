

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import type { Order, DeliveryStatus } from "../../types/rider.types";

export default function Deliveries() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("orders") || "[]"
    ) as Order[];

    const available = stored.filter(
      (o) => o.deliveryStatus !== "Delivered"
    );

    setOrders(available);
  }, []);

  const acceptDelivery = (id: string) => {
    const stored = JSON.parse(
      localStorage.getItem("orders") || "[]"
    ) as Order[];

    const updatedStorage: Order[] = stored.map((order) =>
      order.id === id
        ? {
            ...order,
            riderId: "rider-1",
            deliveryStatus: "PickedUp" as DeliveryStatus,
          }
        : order
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedStorage)
    );

    setOrders(
      updatedStorage.filter(
        (o) => o.deliveryStatus !== "Delivered"
      )
    );

    toast.success("Delivery accepted 🚚");
  };

  const getStatusColor = (status: DeliveryStatus) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-600";
      case "Assigned":
        return "bg-blue-100 text-blue-600";
      case "PickedUp":
        return "bg-yellow-100 text-yellow-700";
      case "EnRoute":
        return "bg-purple-100 text-purple-700";
      case "Delivered":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Available Deliveries
        </h1>
        <p className="text-sm text-gray-500">
          Accept a delivery to start earning
        </p>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No available deliveries right now 🚫
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-2xl shadow-sm p-4 hover:shadow-md transition"
          >

            {/* TOP */}
            <div className="flex justify-between items-start">

              <div>
                <h2 className="font-semibold text-base">
                  Order #{order.id}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {order.date}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${getStatusColor(
                  order.deliveryStatus
                )}`}
              >
                {order.deliveryStatus}
              </span>

            </div>

            {/* PRICE */}
            <div className="mt-3">
              <p className="text-lg font-bold">
                ₦{order.total.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                Estimated earnings
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex gap-3">

              <button
                onClick={() => acceptDelivery(order.id)}
                className="flex-1 bg-black text-white py-2 rounded-xl font-medium"
              >
                Accept Delivery
              </button>

              <button
                onClick={() =>
                  navigate(`/rider/delivery/${order.id}`)
                }
                className="flex-1 border py-2 rounded-xl font-medium"
              >
                View Details
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}