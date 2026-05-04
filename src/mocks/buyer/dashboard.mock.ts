

import type { Order } from "../../types/buyer.types";

/* =========================================================
   📊 DASHBOARD DATA TYPE
========================================================= */
export type BuyerDashboardData = {
  totalOrders: number;
  totalSpent: number;
  recentOrders: Order[];
};

/* =========================================================
   🧾 MOCK ORDERS (fallback if none exist)
========================================================= */
const fallbackOrders: Order[] = [
  {
    id: "ORD-001",
    items: [
      {
        id: "p1",
        title: "Wireless Headphones",
        quantity: 1,
        price: 45000,
      },
    ],
    total: 45000,
    date: new Date().toISOString(),
    status: "Delivered",
  },
  {
    id: "ORD-002",
    items: [
      {
        id: "p2",
        title: "Smart Watch",
        quantity: 2,
        price: 30000,
      },
    ],
    total: 60000,
    date: new Date().toISOString(),
    status: "Processing",
  },
];

/* =========================================================
   📊 GENERATE DASHBOARD DATA
========================================================= */
export const getBuyerDashboardMock = (
  orders: Order[] = fallbackOrders
): BuyerDashboardData => {
  const totalOrders = orders.length;

  const totalSpent = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const recentOrders = orders.slice(0, 5);

  return {
    totalOrders,
    totalSpent,
    recentOrders,
  };
};