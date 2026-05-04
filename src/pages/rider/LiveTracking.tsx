
import React, { useEffect, useState } from "react";
import type { Order } from "../../types/rider.types";
import { RiderService } from "../../services/rider.service";

const LiveTracking: React.FC = () => {
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const orders = RiderService.getOrders();

      // Find active delivery (Uber-style logic)
      const active = orders.find(
        (o) =>
          o.deliveryStatus === "PickedUp" ||
          o.deliveryStatus === "EnRoute"
      );

      setActiveOrder(active || null);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getProgress = (status?: string) => {
    switch (status) {
      case "PickedUp":
        return 40;
      case "EnRoute":
        return 75;
      case "Delivered":
        return 100;
      default:
        return 0;
    }
  };

  if (!activeOrder) {
    return (
      <div className="p-6 text-center text-gray-500">
        No active delivery 🚫
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Live Tracking
        </h1>
        <p className="text-sm text-gray-500">
          Follow your current delivery in real time
        </p>
      </div>

      {/* MAP PLACEHOLDER (Uber-style mock) */}
      <div className="h-56 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
        Map View (Pickup → Dropoff Route)
      </div>

      {/* ORDER INFO */}
      <div className="bg-white border rounded-2xl p-4 shadow-sm">

        <h2 className="font-semibold">
          Order #{activeOrder.id}
        </h2>

        <p className="text-sm text-gray-600 mt-1">
          {activeOrder.pickup} → {activeOrder.dropoff}
        </p>

        <p className="text-lg font-bold mt-2">
          ₦{activeOrder.total.toLocaleString()}
        </p>

      </div>

      {/* PROGRESS BAR */}
      <div className="space-y-2">

        <p className="text-sm text-gray-500">
          Delivery Progress
        </p>

        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-500"
            style={{ width: `${getProgress(activeOrder.deliveryStatus)}%` }}
          />
        </div>

      </div>

      {/* STATUS STEPS */}
      <div className="space-y-2">

        {["PickedUp", "EnRoute", "Delivered"].map((step) => (
          <div
            key={step}
            className={`p-3 border rounded-xl text-sm ${
              activeOrder.deliveryStatus === step
                ? "bg-black text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {step}
          </div>
        ))}

      </div>

    </div>
  );
};

export default LiveTracking;