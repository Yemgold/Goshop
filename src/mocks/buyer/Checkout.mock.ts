

import type {
  CheckoutPayload,
  CheckoutResponse,
  Order,
} from "../../types/buyer.types";

/* =========================================================
   🧾 MOCK ORDER STORE (acts like DB)
========================================================= */

export let mockOrders: Order[] = [];

/* =========================================================
   🧮 GENERATE ORDER ID
========================================================= */
const generateOrderId = () => {
  return "ORD-" + Math.random().toString(36).substring(2, 9).toUpperCase();
};

/* =========================================================
   🛒 CHECKOUT
========================================================= */
export const checkoutMock = (
  payload: CheckoutPayload
): CheckoutResponse => {
  const newOrder: Order = {
    id: generateOrderId(),

    items: payload.items.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    })),

    total: payload.total,

    date: new Date().toISOString(),

    status: "Processing",
  };

  /* Save order */
  mockOrders.unshift(newOrder);

  return {
    orderId: newOrder.id,
  };
};

/* =========================================================
   📦 GET ALL ORDERS
========================================================= */
export const getOrdersMock = (): Order[] => {
  return mockOrders;
};

/* =========================================================
   🔍 GET ORDER BY ID
========================================================= */
export const getOrderByIdMock = (id: string): Order | undefined => {
  return mockOrders.find((order) => order.id === id);
};