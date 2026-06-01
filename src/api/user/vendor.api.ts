

import { apiClient } from "../core/api.client";

import type {
  DashboardData,
  AnalyticsData,
  VendorOrder,
  Order,
  Product,
} from "../../types/vendor/vendor.types";


/* ================= DASHBOARD ================= */

export const getVendorDashboardAPI = async (): Promise<DashboardData> => {
  const res = await apiClient.get("/dashboard/vendor");
  return res.data;
};

/* ================= ANALYTICS ================= */

export const getVendorAnalyticsAPI = async (): Promise<AnalyticsData> => {
  const res = await apiClient.get("/vendor/analytics");
  return res.data;
};



/* ================= ORDERS ================= */



export const getVendorOrdersAPI =
  async (): Promise<VendorOrder[]> => {
    const res = await apiClient.get("/vendor/orders");

    return res.data.data;
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


/* ================= SALES ================= */

export const getVendorSalesAPI = async () => {
  const res = await apiClient.get("/vendor/sales");
  return res.data;
};

/* ================= INVENTORY ================= */

export const getVendorInventoryAPI = async () => {
  const res = await apiClient.get("/vendor/inventory");
  return res.data;
};

/* ================= CATEGORIES ================= */

export const getVendorCategoriesAPI = async () => {
  const res = await apiClient.get("/vendor/categories");
  return res.data;
};

export const createCategoryAPI = async (
  name: string
) => {
  const res = await apiClient.post(
    "/vendor/categories",
    { name }
  );

  return res.data;
};

export const deleteCategoryAPI = async (
  id: string
) => {
  const res = await apiClient.delete(
    `/vendor/categories/${id}`
  );

  return res.data;
};

/* ================= DISCOUNTS ================= */

export const getVendorDiscountsAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/discounts"
    );

    return res.data;
  };

export const createDiscountAPI =
  async (payload: any) => {
    const res = await apiClient.post(
      "/vendor/discounts",
      payload
    );

    return res.data;
  };

export const toggleDiscountStatusAPI =
  async (id: string) => {
    const res = await apiClient.patch(
      `/vendor/discounts/${id}/toggle`
    );

    return res.data;
  };

/* ================= ORDERS ================= */



export const updateOrderStatusAPI =
  async (
    id: string,
    status: string
  ) => {
    const res = await apiClient.patch(
      `/vendor/orders/${id}`,
      { status }
    );

    return res.data;
  };

export const getVendorPendingOrdersAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/orders/pending"
    );

    return res.data;
  };

export const updatePendingOrderStatusAPI =
  async (
    id: string,
    status: string
  ) => {
    const res = await apiClient.patch(
      `/vendor/orders/${id}/pending`,
      { status }
    );

    return res.data;
  };

export const getVendorCompletedOrdersAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/orders/completed"
    );

    return res.data;
  };

/* ================= RETURNS ================= */

export const getVendorReturnsAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/returns"
    );

    return res.data;
  };

export const updateReturnStatusAPI =
  async (
    id: string,
    status: string
  ) => {
    const res = await apiClient.patch(
      `/vendor/returns/${id}`,
      { status }
    );

    return res.data;
  };

/* ================= SHIPPING ================= */

export const getVendorShippingAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/shipping"
    );

    return res.data;
  };

export const updateShipmentStatusAPI =
  async (
    id: string,
    status: string
  ) => {
    const res = await apiClient.patch(
      `/vendor/shipping/${id}`,
      { status }
    );

    return res.data;
  };

/* ================= DELIVERY ZONES ================= */

export const getVendorDeliveryZonesAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/delivery-zones"
    );

    return res.data;
  };

export const createDeliveryZoneAPI =
  async (payload: any) => {
    const res = await apiClient.post(
      "/vendor/delivery-zones",
      payload
    );

    return res.data;
  };

export const toggleDeliveryZoneAPI =
  async (id: string) => {
    const res = await apiClient.patch(
      `/vendor/delivery-zones/${id}/toggle`
    );

    return res.data;
  };

/* ================= REVENUE ================= */

export const getVendorRevenueAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/revenue"
    );

    return res.data;
  };

/* ================= PAYOUTS ================= */

export const getVendorPayoutsAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/payouts"
    );

    return res.data;
  };

export const requestVendorPayoutAPI =
  async (payload: any) => {
    const res = await apiClient.post(
      "/vendor/payouts",
      payload
    );

    return res.data;
  };

/* ================= TRANSACTIONS ================= */

export const getVendorTransactionsAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/transactions"
    );

    return res.data;
  };

/* ================= TAXES ================= */

export const getVendorTaxesAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/taxes"
    );

    return res.data;
  };

/* ================= CUSTOMERS ================= */

export const getVendorCustomersAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/customers"
    );

    return res.data;
  };

/* ================= REVIEWS ================= */

export const getVendorReviewsAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/reviews"
    );

    return res.data;
  };

/* ================= STORE ================= */

export const getVendorStoreAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/store"
    );

    return res.data;
  };

export const updateVendorStoreAPI =
  async (payload: any) => {
    const res = await apiClient.patch(
      "/vendor/store",
      payload
    );

    return res.data;
  };

/* ================= STORE SETTINGS ================= */

export const getVendorStoreSettingsAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/store/settings"
    );

    return res.data;
  };

export const updateVendorStoreSettingsAPI =
  async (payload: any) => {
    const res = await apiClient.patch(
      "/vendor/store/settings",
      payload
    );

    return res.data;
  };

/* ================= SECURITY ================= */

export const getVendorSecurityAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/security"
    );

    return res.data;
  };

export const updateVendorSecurityAPI =
  async (payload: any) => {
    const res = await apiClient.patch(
      "/vendor/security",
      payload
    );

    return res.data;
  };

export const revokeSessionAPI =
  async (sessionId: string) => {
    const res = await apiClient.delete(
      `/vendor/security/sessions/${sessionId}`
    );

    return res.data;
  };

/* ================= PAYOUT SETTINGS ================= */

export const getVendorPayoutSettingsAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/payout-settings"
    );

    return res.data;
  };

export const updateVendorPayoutSettingsAPI =
  async (payload: any) => {
    const res = await apiClient.patch(
      "/vendor/payout-settings",
      payload
    );

    return res.data;
  };

/* ================= PRODUCT PERFORMANCE ================= */

export const getVendorProductPerformanceAPI =
  async () => {
    const res = await apiClient.get(
      "/vendor/product-performance"
    );

    return res.data;
  };



