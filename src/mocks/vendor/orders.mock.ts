import type { Order } from "../../types/vendor.types";

export let MOCK_ORDERS: Order[] = [
  {
    id: "101",
    items: [
      { id: "1", title: "Nike Shoes", quantity: 1, price: 20000 },
      { id: "2", title: "T-Shirt", quantity: 2, price: 5000 },
    ],
    total: 30000,
    date: new Date().toISOString(),
    status: "Processing",
    riderId: null,
    deliveryStatus: "Pending",
  },
];