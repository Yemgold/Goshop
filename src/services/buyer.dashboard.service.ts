


import { getBuyerDashboardAPI } from "../api/user/buyer.api";

export type BuyerDashboardDTO = {
  stats: any;
  products: any[];
  recentOrders: any[];
  cart: any;
};

export const getBuyerDashboard = async (): Promise<BuyerDashboardDTO> => {
  const res = await getBuyerDashboardAPI();

  return {
    stats: res?.stats ?? {
      cartItems: 0,
      pendingOrders: 0,
      completedOrders: 0,
      totalOrders: 0,
    },

    products: Array.isArray(res?.products) ? res.products : [],

    recentOrders: Array.isArray(res?.recentOrders)
      ? res.recentOrders
      : [],

    cart: res?.cart ?? { itemsCount: 0 },
  };
};