


import type { TrackingOrder } from "../../types/buyer.types";

export const MOCK_TRACKING: Omit<TrackingOrder, "id"> = {
  status: "Shipped",
  deliveryStatus: "On the way",
  estimatedDelivery: "2026-05-05",
  timeline: [
    {
      step: "Order Placed",
      completed: true,
      time: "10:00 AM",
    },
    {
      step: "Packed",
      completed: true,
      time: "12:00 PM",
    },
    {
      step: "Shipped",
      completed: true,
      time: "03:00 PM",
    },
    {
      step: "Out for Delivery",
      completed: false,
      time: "",
    },
  ],
};