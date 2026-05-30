

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getRiderJobs,
  acceptRiderJob,
} from "../../services/Rider/rider.service";

import type {
  Order,
  DeliveryStatus,
} from "../../types/rider.types";

export default function Deliveries() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);

  const [isLoading, setLoading] =
    useState(true);

  const [isError, setError] =
    useState(false);

  const [acceptingId, setAcceptingId] =
    useState<string | null>(null);

  /* =========================================
     LOAD DELIVERIES
  ========================================= */

  const loadDeliveries = async () => {
    try {
      setLoading(true);

      setError(false);

      const response =
        await getRiderJobs();

      setOrders(response);
    } catch (error) {
      console.error(error);

      setError(true);

      toast.error(
        "Failed to load deliveries"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  /* =========================================
     FILTER ACTIVE DELIVERIES
  ========================================= */

  const activeDeliveries = useMemo(() => {
    return orders.filter(
      (order) =>
        order.deliveryStatus !==
        "Delivered"
    );
  }, [orders]);

  /* =========================================
     ACCEPT DELIVERY
  ========================================= */

  const handleAcceptDelivery =
    async (orderId: string) => {
      try {
        setAcceptingId(orderId);

        await acceptRiderJob(orderId);

        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId
              ? {
                  ...order,

                  riderId: "rider-1",

                  deliveryStatus:
                    "PickedUp" as DeliveryStatus,
                }
              : order
          )
        );

        toast.success(
          "Delivery accepted 🚚"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to accept delivery"
        );
      } finally {
        setAcceptingId(null);
      }
    };

  /* =========================================
     STATUS COLORS
  ========================================= */

  const getStatusColor = (
    status: DeliveryStatus
  ) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-700";

      case "Assigned":
        return "bg-blue-100 text-blue-700";

      case "PickedUp":
        return "bg-yellow-100 text-yellow-700";

      case "EnRoute":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* =========================================
     LOADING STATE
  ========================================= */

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        {[...Array(4)].map(
          (_, index) => (
            <div
              key={index}
              className="h-40 bg-gray-100 rounded-2xl animate-pulse"
            />
          )
        )}
      </div>
    );
  }

  /* =========================================
     ERROR STATE
  ========================================= */

  if (isError) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">

        <div className="bg-white border rounded-2xl p-10">

          <h2 className="text-xl font-semibold">
            Failed to load deliveries
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Please try again
          </p>

          <button
            onClick={loadDeliveries}
            className="mt-5 bg-black text-white px-5 py-2 rounded-xl"
          >
            Retry
          </button>

        </div>
      </div>
    );
  }

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Available Deliveries
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Accept deliveries and
            start earning
          </p>
        </div>

        <button
          onClick={loadDeliveries}
          className="border px-4 py-2 rounded-xl text-sm font-medium"
        >
          Refresh
        </button>

      </div>

      {/* EMPTY STATE */}

      {activeDeliveries.length ===
        0 && (
        <div className="bg-white border rounded-2xl p-10 text-center">

          <h2 className="text-lg font-semibold">
            No available deliveries
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            New delivery requests
            will appear here
          </p>

        </div>
      )}

      {/* DELIVERY LIST */}

      <div className="space-y-4">

        {activeDeliveries.map(
          (order) => (
            <div
              key={order.id}
              className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition"
            >

              {/* TOP */}

              <div className="flex justify-between items-start gap-4">

                <div>

                  <div className="flex items-center gap-3">

                    <h2 className="font-semibold text-lg">
                      Order #
                      {order.id}
                    </h2>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(
                        order.deliveryStatus
                      )}`}
                    >
                      {
                        order.deliveryStatus
                      }
                    </span>

                  </div>

                  <div className="mt-2 space-y-1 text-sm text-gray-600">

                    <p>
                      <span className="font-medium">
                        Pickup:
                      </span>{" "}
                      {order.pickup}
                    </p>

                    <p>
                      <span className="font-medium">
                        Dropoff:
                      </span>{" "}
                      {order.dropoff}
                    </p>

                    {order.customerName && (
                      <p>
                        <span className="font-medium">
                          Customer:
                        </span>{" "}
                        {
                          order.customerName
                        }
                      </p>
                    )}

                    <p className="text-xs text-gray-400 pt-1">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>
                </div>

                {/* PRICE */}

                <div className="text-right">

                  <p className="text-2xl font-bold">
                    ₦
                    {order.total.toLocaleString()}
                  </p>

                  <p className="text-xs text-gray-500">
                    Estimated earnings
                  </p>

                </div>
              </div>

              {/* ITEMS */}

              {order.items.length >
                0 && (
                <div className="mt-4 border-t pt-4">

                  <p className="text-sm font-medium mb-3">
                    Order Items
                  </p>

                  <div className="space-y-2">

                    {order.items.map(
                      (item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >

                          <span>
                            {item.name} ×{" "}
                            {
                              item.quantity
                            }
                          </span>

                          <span>
                            ₦
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString()}
                          </span>

                        </div>
                      )
                    )}

                  </div>
                </div>
              )}

              {/* ACTIONS */}

              <div className="mt-5 flex gap-3">

                <button
                  onClick={() =>
                    handleAcceptDelivery(
                      order.id
                    )
                  }
                  disabled={
                    acceptingId ===
                    order.id
                  }
                  className="flex-1 bg-black text-white py-3 rounded-xl font-medium disabled:opacity-50"
                >
                  {acceptingId ===
                  order.id
                    ? "Accepting..."
                    : "Accept Delivery"}
                </button>

                <button
                  onClick={() =>
                    navigate(
                      `/rider/delivery/${order.id}`
                    )
                  }
                  className="flex-1 border py-3 rounded-xl font-medium"
                >
                  View Details
                </button>

              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}