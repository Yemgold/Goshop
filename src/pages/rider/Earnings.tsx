

import React, { useEffect, useState } from "react";
import type { Order } from "../../types/rider.types";

const Earnings: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("orders") || "[]"
    ) as Order[];

    setOrders(stored);
  }, []);

  const completedTrips = orders.filter(
    (o) => o.deliveryStatus === "Delivered"
  );

  const totalEarnings = completedTrips.reduce(
    (sum, o) => sum + o.total,
    0
  );

  const todayEarnings = completedTrips
    .filter((o) => {
      const today = new Date().toDateString();
      return new Date(o.date).toDateString() === today;
    })
    .reduce((sum, o) => sum + o.total, 0);

  const thisWeekEarnings = completedTrips
    .filter((o) => {
      const now = new Date();
      const orderDate = new Date(o.date);

      const diffDays =
        (now.getTime() - orderDate.getTime()) /
        (1000 * 60 * 60 * 24);

      return diffDays <= 7;
    })
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Earnings</h1>
        <p className="text-sm text-gray-500">
          Track your rider income
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="p-4 border rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <h2 className="text-xl font-bold">
            ₦{totalEarnings.toLocaleString()}
          </h2>
        </div>

        <div className="p-4 border rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">Today</p>
          <h2 className="text-xl font-bold text-green-600">
            ₦{todayEarnings.toLocaleString()}
          </h2>
        </div>

        <div className="p-4 border rounded-2xl shadow-sm">
          <p className="text-sm text-gray-500">This Week</p>
          <h2 className="text-xl font-bold text-blue-600">
            ₦{thisWeekEarnings.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* TRIPS LIST */}
      <div className="space-y-4">

        <h2 className="font-semibold">
          Completed Trips
        </h2>

        {completedTrips.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No completed deliveries yet
          </div>
        )}

        {completedTrips.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-2xl p-4 shadow-sm"
          >

            <div className="flex justify-between">

              <div>
                <h3 className="font-semibold">
                  Order #{order.id}
                </h3>

                <p className="text-sm text-gray-500">
                  {order.date}
                </p>
              </div>

              <p className="font-bold text-green-600">
                ₦{order.total.toLocaleString()}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Earnings;