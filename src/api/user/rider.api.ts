

// src/api/rider/rider.api.ts

import { apiClient } from "../core/api.client";
import type { DeliveryStatus } from "../../types/rider.types";

/**
 * RIDER API
 * Handles jobs, deliveries, tracking, earnings
 */

export const RiderAPI = {
  // 📦 Get available jobs
  getJobs: async () => {
    const res = await apiClient.get("/rider/jobs");
    return res.data;
  },

  // 🚚 Get assigned deliveries
  getDeliveries: async () => {
    const res = await apiClient.get("/rider/deliveries");
    return res.data;
  },

  // 🟢 Accept job
  acceptJob: async (jobId: string) => {
    const res = await apiClient.post(`/rider/jobs/${jobId}/accept`);
    return res.data;
  },

  // 📍 Update delivery status (Uber-style)
  updateStatus: async (jobId: string, status: DeliveryStatus) => {
    const res = await apiClient.patch(
      `/rider/jobs/${jobId}/status`,
      { status }
    );
    return res.data;
  },

  // 🗺️ Live location update (future Uber GPS feature)
  updateLocation: async (jobId: string, lat: number, lng: number) => {
    const res = await apiClient.post(
      `/rider/jobs/${jobId}/location`,
      { lat, lng }
    );
    return res.data;
  },

  // 💰 Earnings
  getEarnings: async () => {
    const res = await apiClient.get("/rider/earnings");
    return res.data;
  },

  // 📊 Dashboard
  getDashboard: async () => {
    const res = await apiClient.get("/rider/dashboard");
    return res.data;
  },

  // 🧪 Mock fallback (dev only)
  getMockJobs: () => [
    {
      id: "1",
      pickup: "Lekki Phase 1",
      dropoff: "Victoria Island",
      total: 2500,
      deliveryStatus: "Pending",
    },
    {
      id: "2",
      pickup: "Ikeja",
      dropoff: "Yaba",
      total: 1800,
      deliveryStatus: "Assigned",
    },
  ],
};