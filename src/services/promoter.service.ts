
import type { Order } from "../types/rider.types";

const STORAGE_KEY = "orders";

export const PromoterService = {
  // =========================
  // GET ALL ORDERS
  // =========================
  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },

  // =========================
  // BASIC STATS
  // =========================
  getTotalOrders(): number {
    return this.getOrders().length;
  },

  getPendingOrders(): number {
    return this.getOrders().filter(
      (o) => o.deliveryStatus === "Pending"
    ).length;
  },

  getInProgressOrders(): number {
    return this.getOrders().filter(
      (o) =>
        o.deliveryStatus === "PickedUp" ||
        o.deliveryStatus === "EnRoute"
    ).length;
  },

  getCompletedOrders(): number {
    return this.getOrders().filter(
      (o) => o.deliveryStatus === "Delivered"
    ).length;
  },

  // =========================
  // REVENUE CALCULATION
  // =========================
  getTotalRevenue(): number {
    return this.getOrders()
      .filter((o) => o.deliveryStatus === "Delivered")
      .reduce((sum, o) => sum + o.total, 0);
  },

  // =========================
  // RECENT ORDERS (for dashboard)
  // =========================
  getRecentOrders(limit: number = 5): Order[] {
    const orders = this.getOrders();

    return orders
      .slice()
      .reverse()
      .slice(0, limit);
  },

  // =========================
  // ORDER STATUS BREAKDOWN
  // =========================
  getStatusBreakdown() {
    const orders = this.getOrders();

    return {
      pending: orders.filter((o) => o.deliveryStatus === "Pending").length,
      assigned: orders.filter((o) => o.deliveryStatus === "Assigned").length,
      pickedUp: orders.filter((o) => o.deliveryStatus === "PickedUp").length,
      enRoute: orders.filter((o) => o.deliveryStatus === "EnRoute").length,
      delivered: orders.filter((o) => o.deliveryStatus === "Delivered").length,
    };
  },

  // =========================
  // AVERAGE ORDER VALUE
  // =========================
  getAverageOrderValue(): number {
    const orders = this.getOrders();

    if (orders.length === 0) return 0;

    const total = orders.reduce((sum, o) => sum + o.total, 0);

    return Math.round(total / orders.length);
  },

  // =========================
  // RESET (DEV ONLY)
  // =========================
  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  },
};