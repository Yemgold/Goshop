


import type { Order } from "../types/vendor.types"; 

export const getOrders = (): Order[] => {
  try {
    const data = localStorage.getItem("orders");
    if (!data) return [];

    const parsed = JSON.parse(data);

    // basic safety check
    if (!Array.isArray(parsed)) return [];

    return parsed as Order[];
  } catch {
    return [];
  }
};