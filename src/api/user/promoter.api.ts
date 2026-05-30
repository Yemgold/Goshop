

// src/api/promoter/promoter.api.ts

import { apiClient } from "../core/api.client";

/**
 * PROMOTER API
 */

export const PromoterAPI = {
  // 📊 Dashboard stats
  getDashboardStats: async () => {
    const res = await apiClient.get("/promoter/dashboard");
    return res.data;
  },

  // 📦 Orders
  getOrders: async () => {
    const res = await apiClient.get("/promoter/orders");
    return res.data;
  },

  // 💰 Earnings
  getEarnings: async () => {
    const res = await apiClient.get("/promoter/earnings");
    return res.data;
  },

  // 👥 Referrals
  getReferrals: async () => {
    const res = await apiClient.get("/promoter/referrals");
    return res.data;
  },

  // 📈 Analytics
  getAnalytics: async () => {
    const res = await apiClient.get("/promoter/analytics");
    return res.data;
  },

  // 🔄 Mock fallback (good for dev only)
  getMockData: () => ({
    totalOrders: 120,
    pending: 20,
    delivered: 80,
    earnings: 450000,
  }),
};