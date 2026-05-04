

import { apiClient } from "../core/api.client";

import type {
  AnalyticsData,
  DashboardData,
  Order,
  Product,
} from "../../types/vendor.types";

/* ================= ANALYTICS ================= */

export const getVendorAnalyticsAPI = async (): Promise<AnalyticsData> => {
  const res = await apiClient.get("/vendor/analytics");
  return res.data;
};

export const getVendorDashboardAPI = async (): Promise<DashboardData> => {
  const res = await apiClient.get("/vendor/dashboard");
  return res.data;
};

/* ================= ORDERS ================= */

export const getVendorOrdersAPI = async (): Promise<Order[]> => {
  const res = await apiClient.get("/vendor/orders");
  return res.data;
};

export const getVendorOrderByIdAPI = async (
  id: string
): Promise<Order> => {
  const res = await apiClient.get(`/vendor/orders/${id}`);
  return res.data;
};

export const updateVendorOrderAPI = async (
  id: string,
  status: Order["status"]
): Promise<Order> => {
  const res = await apiClient.patch(
    `/vendor/orders/${id}`,
    { status }
  );
  return res.data;
};

/* ================= PRODUCTS ================= */

export const getVendorProductsAPI = async (): Promise<Product[]> => {
  const res = await apiClient.get("/vendor/products");
  return res.data;
};

export const deleteVendorProductAPI = async (
  id: string
): Promise<Product[]> => {
  const res = await apiClient.delete(`/vendor/products/${id}`);
  return res.data;
};