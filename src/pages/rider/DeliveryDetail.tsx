

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { Order, DeliveryStatus } from "../../types/rider.types";

export default function DeliveryDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("orders") || "[]"
    ) as Order[];

    const found = stored.find((o) => o.id === id);
    setOrder(found || null);
  }, [id]);

  const updateStatus = (status: DeliveryStatus) => {
    const stored = JSON.parse(
      localStorage.getItem("orders") || "[]"
    ) as Order[];

    const updated = stored.map((o) =>
      o.id === id
        ? { ...o, deliveryStatus: status }
        : o
    );

    localStorage.setItem("orders", JSON.stringify(updated));

    setOrder((prev) =>
      prev ? { ...prev, deliveryStatus: status } : prev
    );

    toast.success(`Status updated: ${status}`);
  };

  const steps: DeliveryStatus[] = [
    "PickedUp",
    "EnRoute",
    "Delivered",
  ];

  const getStepStyle = (step: DeliveryStatus) => {
    if (!order) return "";

    const currentIndex = steps.indexOf(order.deliveryStatus);
    const stepIndex = steps.indexOf(step);

    if (order.deliveryStatus === step) {
      return "bg-green-100 border-green-500 text-green-700";
    }

    if (stepIndex < currentIndex) {
      return "bg-gray-100 text-gray-500";
    }

    return "bg-white text-gray-400";
  };

  if (!order)
    return (
      <div className="p-6 text-center text-gray-500">
        Order not found
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Delivery Tracking
        </h1>

        <p className="text-sm text-gray-500">
          Order #{order.id}
        </p>
      </div>

      {/* PROGRESS TRACKER (Uber style) */}
      <div className="space-y-3">

        {steps.map((step) => (
          <div
            key={step}
            className={`p-3 border rounded-xl transition ${getStepStyle(
              step
            )}`}
          >
            {step}
          </div>
        ))}

      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-3 gap-3">

        <button
          onClick={() => updateStatus("PickedUp")}
          className="bg-blue-500 text-white py-2 rounded-xl"
        >
          Picked Up
        </button>

        <button
          onClick={() => updateStatus("EnRoute")}
          className="bg-orange-500 text-white py-2 rounded-xl"
        >
          En Route
        </button>

        <button
          onClick={() => updateStatus("Delivered")}
          className="bg-green-600 text-white py-2 rounded-xl"
        >
          Delivered
        </button>

      </div>

    </div>
  );
}