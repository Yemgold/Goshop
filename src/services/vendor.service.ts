


import { USE_MOCK } from "../config/env";
import * as api from "../api/vendor/vendor.api";

import type {
  AnalyticsData,
  DashboardData,
  Order,
  Product,
} from "../types/vendor.types";

import { MOCK_ANALYTICS } from "../mocks/vendor/analytics.mock";
import { MOCK_DASHBOARD } from "../mocks/vendor/dashboard.mock";
import { MOCK_ORDERS } from "../mocks/vendor/orders.mock";
import { MOCK_PRODUCTS } from "../mocks/vendor/products.mock";

/* ================= ANALYTICS ================= */

export const getVendorAnalytics = async (): Promise<AnalyticsData> => {
  if (USE_MOCK) return MOCK_ANALYTICS;

  return api.getVendorAnalyticsAPI(); // ✅ no .data
};

export const getVendorDashboard = async (): Promise<DashboardData> => {
  if (USE_MOCK) return MOCK_DASHBOARD;

  return api.getVendorDashboardAPI(); // ✅ no .data
};

/* ================= ORDERS ================= */

export const getVendorOrders = async (): Promise<Order[]> => {
  if (USE_MOCK) return MOCK_ORDERS;

  return api.getVendorOrdersAPI(); // ✅
};

export const getOrderById = async (id: string): Promise<Order> => {
  if (USE_MOCK) {
    const order = MOCK_ORDERS.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");
    return order;
  }

  return api.getVendorOrderByIdAPI(id); // ✅
};

export const updateVendorOrder = async (
  id: string,
  status: Order["status"]
): Promise<Order> => {
  if (USE_MOCK) {
    const order = MOCK_ORDERS.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");

    order.status = status;

    if (status === "Accepted") {
      order.riderId = "RIDER-001";
      order.deliveryStatus = "Assigned";
    }

    return order;
  }

  return api.updateVendorOrderAPI(id, status); // ✅
};

/* ================= PRODUCTS ================= */

export const getVendorProducts = async (): Promise<Product[]> => {
  if (USE_MOCK) return MOCK_PRODUCTS;

  return api.getVendorProductsAPI(); // ✅
};

export const deleteVendorProduct = async (
  id: string
): Promise<Product[]> => {
  if (USE_MOCK) {
    const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
    if (index !== -1) MOCK_PRODUCTS.splice(index, 1);
    return MOCK_PRODUCTS;
  }

  return api.deleteVendorProductAPI(id); // ✅
};