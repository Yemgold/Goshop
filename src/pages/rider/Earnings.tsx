

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";

import { getRiderJobs } from "../../services/Rider/rider.service";

import type { Order } from "../../types/rider.types";

const Earnings: React.FC = () => {
  const [orders, setOrders] = useState<
    Order[]
  >([]);

  const [isLoading, setLoading] =
    useState(true);

  const [isError, setError] =
    useState(false);

  /* =========================================
     LOAD ORDERS
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
        "Failed to load earnings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  /* =========================================
     COMPLETED TRIPS
  ========================================= */

  const completedTrips = useMemo(() => {
    return orders.filter(
      (order) =>
        order.deliveryStatus ===
        "Delivered"
    );
  }, [orders]);

  /* =========================================
     TOTAL EARNINGS
  ========================================= */

  const totalEarnings = useMemo(() => {
    return completedTrips.reduce(
      (sum, order) =>
        sum + order.total,
      0
    );
  }, [completedTrips]);

  /* =========================================
     TODAY EARNINGS
  ========================================= */

  const todayEarnings = useMemo(() => {
    const today =
      new Date().toDateString();

    return completedTrips
      .filter(
        (order) =>
          new Date(
            order.createdAt
          ).toDateString() === today
      )
      .reduce(
        (sum, order) =>
          sum + order.total,
        0
      );
  }, [completedTrips]);

  /* =========================================
     WEEKLY EARNINGS
  ========================================= */

  const weeklyEarnings = useMemo(() => {
    const now = new Date();

    return completedTrips
      .filter((order) => {
        const orderDate = new Date(
          order.createdAt
        );

        const diffDays =
          (now.getTime() -
            orderDate.getTime()) /
          (1000 * 60 * 60 * 24);

        return diffDays <= 7;
      })
      .reduce(
        (sum, order) =>
          sum + order.total,
        0
      );
  }, [completedTrips]);

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
              className="h-28 bg-gray-100 rounded-2xl animate-pulse"
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
            Failed to load earnings
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
     UI
  ========================================= */

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold">
            Earnings
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Track your rider income
            and completed deliveries
          </p>
        </div>

        <button
          onClick={loadOrders}
          className="border px-4 py-2 rounded-xl text-sm font-medium"
        >
          Refresh
        </button>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* TOTAL */}

        <div className="bg-white border rounded-2xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Earnings
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₦
            {totalEarnings.toLocaleString()}
          </h2>

        </div>

        {/* TODAY */}

        <div className="bg-white border rounded-2xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Today
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            ₦
            {todayEarnings.toLocaleString()}
          </h2>

        </div>

        {/* WEEK */}

        <div className="bg-white border rounded-2xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            This Week
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            ₦
            {weeklyEarnings.toLocaleString()}
          </h2>

        </div>

      </div>

      {/* COMPLETED DELIVERIES */}

      <div className="space-y-4">

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Completed Deliveries
          </h2>

          <p className="text-sm text-gray-500">
            {completedTrips.length}{" "}
            completed trips
          </p>

        </div>

        {/* EMPTY */}

        {completedTrips.length ===
          0 && (
          <div className="bg-white border rounded-2xl p-10 text-center">

            <h3 className="font-semibold text-lg">
              No completed trips
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Completed deliveries
              will appear here
            </p>

          </div>
        )}

        {/* LIST */}

        <div className="space-y-4">

          {completedTrips.map(
            (order) => (
              <div
                key={order.id}
                className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >

                <div className="flex items-start justify-between gap-4">

                  {/* LEFT */}

                  <div className="space-y-2">

                    <div>

                      <h3 className="font-semibold text-lg">
                        Order #
                        {order.id}
                      </h3>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(
                          order.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div className="text-sm text-gray-600 space-y-1">

                      <p>
                        <span className="font-medium">
                          Pickup:
                        </span>{" "}
                        {
                          order.pickup
                        }
                      </p>

                      <p>
                        <span className="font-medium">
                          Dropoff:
                        </span>{" "}
                        {
                          order.dropoff
                        }
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

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="text-right">

                    <p className="text-2xl font-bold text-green-600">
                      ₦
                      {order.total.toLocaleString()}
                    </p>

                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      Delivered
                    </span>

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
                            key={
                              item.id
                            }
                            className="flex justify-between text-sm"
                          >

                            <span>
                              {
                                item.name
                              }{" "}
                              ×{" "}
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

              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
};

export default Earnings;