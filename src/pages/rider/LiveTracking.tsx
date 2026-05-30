

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";

import { getRiderJobs } from "../../services/Rider/rider.service";

import type { Order } from "../../types/rider.types";

const LiveTracking: React.FC = () => {
  const [orders, setOrders] = useState<
    Order[]
  >([]);

  const [isLoading, setLoading] =
    useState(true);

  const [isError, setError] =
    useState(false);

  /* =========================================
     LOAD ACTIVE ORDERS
  ========================================= */

  const loadOrders = async () => {
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
        "Failed to load live tracking"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();

    const interval = setInterval(() => {
      loadOrders();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  /* =========================================
     ACTIVE ORDER
  ========================================= */

  const activeOrder = useMemo(() => {
    return (
      orders.find(
        (order) =>
          order.deliveryStatus ===
            "PickedUp" ||
          order.deliveryStatus ===
            "EnRoute"
      ) || null
    );
  }, [orders]);

  /* =========================================
     DELIVERY PROGRESS
  ========================================= */

  const getProgress = (
    status?: string
  ) => {
    switch (status) {
      case "Pending":
        return 10;

      case "Assigned":
        return 25;

      case "PickedUp":
        return 50;

      case "EnRoute":
        return 80;

      case "Delivered":
        return 100;

      default:
        return 0;
    }
  };

  /* =========================================
     STATUS COLOR
  ========================================= */

  const getStatusColor = (
    status?: string
  ) => {
    switch (status) {
      case "Pending":
        return "bg-gray-100 text-gray-600 border-gray-200";

      case "Assigned":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "PickedUp":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "EnRoute":
        return "bg-purple-100 text-purple-700 border-purple-200";

      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";

      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  /* =========================================
     LOADING
  ========================================= */

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4">

        {[...Array(4)].map(
          (_, index) => (
            <div
              key={index}
              className="h-32 rounded-2xl bg-gray-100 animate-pulse"
            />
          )
        )}

      </div>
    );
  }

  /* =========================================
     ERROR
  ========================================= */

  if (isError) {
    return (
      <div className="p-6 max-w-3xl mx-auto">

        <div className="bg-white border rounded-2xl p-10 text-center">

          <h2 className="text-xl font-semibold">
            Failed to load tracking
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Please try again
          </p>

          <button
            onClick={loadOrders}
            className="mt-5 bg-black text-white px-5 py-2 rounded-xl"
          >
            Retry
          </button>

        </div>

      </div>
    );
  }

  /* =========================================
     EMPTY STATE
  ========================================= */

  if (!activeOrder) {
    return (
      <div className="p-6 max-w-3xl mx-auto">

        <div className="bg-white border rounded-2xl p-12 text-center">

          <h2 className="text-2xl font-bold">
            No Active Delivery
          </h2>

          <p className="text-gray-500 mt-2">
            You currently do not
            have any active rider
            trips
          </p>

        </div>

      </div>
    );
  }

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Live Tracking
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Monitor your active
            delivery in real time
          </p>
        </div>

        <button
          onClick={loadOrders}
          className="border px-4 py-2 rounded-xl text-sm font-medium"
        >
          Refresh
        </button>

      </div>

      {/* MAP */}

      <div className="h-72 rounded-3xl bg-gray-100 border flex flex-col items-center justify-center text-center p-6">

        <div className="text-6xl">
          🗺️
        </div>

        <h2 className="font-semibold text-lg mt-4">
          Live Route Tracking
        </h2>

        <p className="text-sm text-gray-500 mt-2 max-w-md">
          Integrate Google Maps,
          Mapbox, or OpenStreetMap
          here for real-time rider
          navigation
        </p>

      </div>

      {/* ACTIVE DELIVERY */}

      <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-5">

        {/* TOP */}

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

          <div>

            <h2 className="text-xl font-bold">
              Order #
              {activeOrder.id}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Active Delivery
            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium border w-fit ${getStatusColor(
              activeOrder.deliveryStatus
            )}`}
          >
            {
              activeOrder.deliveryStatus
            }
          </span>

        </div>

        {/* LOCATIONS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="border rounded-2xl p-4">

            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Pickup Location
            </p>

            <h3 className="font-semibold mt-2">
              {activeOrder.pickup}
            </h3>

            {activeOrder.pickupAddress && (
              <p className="text-sm text-gray-500 mt-1">
                {
                  activeOrder.pickupAddress
                }
              </p>
            )}

          </div>

          <div className="border rounded-2xl p-4">

            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Dropoff Location
            </p>

            <h3 className="font-semibold mt-2">
              {activeOrder.dropoff}
            </h3>

            {activeOrder.dropoffAddress && (
              <p className="text-sm text-gray-500 mt-1">
                {
                  activeOrder.dropoffAddress
                }
              </p>
            )}

          </div>

        </div>

        {/* CUSTOMER */}

        {(activeOrder.customerName ||
          activeOrder.customerPhone) && (
          <div className="border rounded-2xl p-4">

            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Customer
            </p>

            <h3 className="font-semibold mt-2">
              {
                activeOrder.customerName
              }
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {
                activeOrder.customerPhone
              }
            </p>

          </div>
        )}

        {/* TOTAL */}

        <div className="flex items-center justify-between border rounded-2xl p-4">

          <div>
            <p className="text-sm text-gray-500">
              Delivery Earnings
            </p>

            <h3 className="text-3xl font-bold mt-1">
              ₦
              {activeOrder.total.toLocaleString()}
            </h3>
          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">
              Created At
            </p>

            <p className="font-medium mt-1">
              {new Date(
                activeOrder.createdAt
              ).toLocaleString()}
            </p>

          </div>

        </div>

        {/* PROGRESS */}

        <div>

          <div className="flex items-center justify-between mb-2">

            <p className="text-sm font-medium">
              Delivery Progress
            </p>

            <p className="text-sm text-gray-500">
              {getProgress(
                activeOrder.deliveryStatus
              )}
              %
            </p>

          </div>

          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-black transition-all duration-500"
              style={{
                width: `${getProgress(
                  activeOrder.deliveryStatus
                )}%`,
              }}
            />

          </div>

        </div>

        {/* DELIVERY FLOW */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">

          {[
            "Pending",
            "Assigned",
            "PickedUp",
            "EnRoute",
            "Delivered",
          ].map((step) => {
            const active =
              activeOrder.deliveryStatus ===
              step;

            return (
              <div
                key={step}
                className={`border rounded-2xl p-3 text-center text-sm font-medium transition ${
                  active
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-500"
                }`}
              >
                {step}
              </div>
            );
          })}

        </div>

      </div>

      {/* ITEMS */}

      {activeOrder.items.length >
        0 && (
        <div className="bg-white border rounded-3xl p-6 shadow-sm">

          <h2 className="text-lg font-semibold mb-5">
            Delivery Items
          </h2>

          <div className="space-y-4">

            {activeOrder.items.map(
              (item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-2xl p-4"
                >

                  <div className="flex items-center gap-4">

                    {item.image && (
                      <img
                        src={
                          item.image
                        }
                        alt={
                          item.name
                        }
                        className="w-14 h-14 rounded-xl object-cover border"
                      />
                    )}

                    <div>

                      <h3 className="font-medium">
                        {
                          item.name
                        }
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty:{" "}
                        {
                          item.quantity
                        }
                      </p>

                    </div>

                  </div>

                  <p className="font-semibold">
                    ₦
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}
                  </p>

                </div>
              )
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default LiveTracking;