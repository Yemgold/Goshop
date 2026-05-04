import type { Order } from "../../types/buyer.types";

export const MOCK_BUYER_ORDERS: Order[] = [
  {
    id: "ORD-1001",
    items: [
      {
        id: "1",
        title: "Wireless Headphones",
        quantity: 1,
        price: 25000,
      },
      {
        id: "2",
        title: "Sneakers",
        quantity: 1,
        price: 45000,
      },
    ],
    total: 70000,
    date: new Date().toISOString(),
    status: "Processing",
  },
  {
    id: "ORD-1002",
    items: [
      {
        id: "3",
        title: "Smart Watch",
        quantity: 1,
        price: 60000,
      },
    ],
    total: 60000,
    date: new Date().toISOString(),
    status: "Delivered",
  },
];