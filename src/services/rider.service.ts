
// RiderService.ts (Frontend “Fake Backend” Layer)


import type { Order, DeliveryStatus } from "../types/rider.types";

const STORAGE_KEY = "orders";

export const RiderService = {
  // =========================
  // GET ALL ORDERS
  // =========================
  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },

  // =========================
  // SAVE ORDERS
  // =========================
  saveOrders(orders: Order[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  },

  // =========================
  // GET SINGLE ORDER
  // =========================
  getOrderById(id: string): Order | null {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id) || null;
  },

  // =========================
  // ACCEPT JOB (Uber-style flow)
  // =========================
  acceptOrder(orderId: string): Order[] {
    const orders = this.getOrders();

    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            riderId: "rider-1",
            deliveryStatus: "Assigned" as DeliveryStatus,
          }
        : o
    );

    this.saveOrders(updated);
    return updated;
  },

  // =========================
  // UPDATE DELIVERY STATUS
  // =========================
  updateStatus(
    orderId: string,
    status: DeliveryStatus
  ): Order[] {
    const orders = this.getOrders();

    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            deliveryStatus: status,
          }
        : o
    );

    this.saveOrders(updated);
    return updated;
  },

  // =========================
  // GET AVAILABLE JOBS
  // =========================
  getAvailableJobs(): Order[] {
    const orders = this.getOrders();

    return orders.filter(
      (o) =>
        o.deliveryStatus === "Pending" ||
        o.deliveryStatus === "Assigned"
    );
  },

  // =========================
  // GET ACTIVE JOB
  // =========================
  getActiveJob(): Order | null {
    const orders = this.getOrders();

    return (
      orders.find(
        (o) =>
          o.deliveryStatus === "PickedUp" ||
          o.deliveryStatus === "EnRoute"
      ) || null
    );
  },

  // =========================
  // COMPLETE DELIVERY
  // =========================
  completeDelivery(orderId: string): Order[] {
    const orders = this.getOrders();

    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            deliveryStatus: "Delivered" as DeliveryStatus,
          }
        : o
    );

    this.saveOrders(updated);
    return updated;
  },

  // =========================
  // RESET (DEV ONLY)
  // =========================
  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  },
};