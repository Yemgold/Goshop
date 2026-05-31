


import { apiClient } from "../../api/core/api.client";


import type {Order,Product,AnalyticsData,VendorDiscountsData,VendorOrdersData,VendorSalesData,
  VendorInventoryData,VendorCategoriesData,VendorPendingOrdersData,VendorCompletedOrdersData,
  VendorReturnsData, VendorShippingData, VendorDeliveryZonesData, VendorRevenueData,
  VendorPayoutsData,VendorTransactionsData,VendorTaxesData,VendorCustomersData,
  VendorReviewsData,VendorStoreData,VendorStoreSettings,VendorStoreSettingsData,
  VendorSecurityData,VendorPayoutSettingsData,ProductPerformanceData,
} from "../../types/vendor/vendor.types";
import type { CreateBusinessShippingRatePayload } from "./vendor.service";

/* =========================================================
   ORDERS
========================================================= */

export const getOrderById = async (id: string): Promise<Order> => {
  const { data } = await apiClient.get(`/vendor/orders/${id}`);
  return data;
};

export const updateVendorOrder = async (
  id: string,
  status: Order["status"]
): Promise<Order> => {
  const { data } = await apiClient.patch(
    `/vendor/orders/${id}`,
    { status }
  );
  return data;
};

/* =========================================================
   PRODUCTS
========================================================= */

export const getVendorProducts = async (): Promise<Product[]> => {
  const { data } = await apiClient.get(`/vendor/products`);
  return data;
};

export const getVendorProductById = async (
  businessId: string,
  productId: string
) => {
  const { data } = await apiClient.get(
    `/vendor/products/${businessId}/${productId}`
  );
  return data;
};

export const createVendorProduct = async (
  businessId: string,
  formData: FormData
) => {
  const { data } = await apiClient.post(
    `/vendor/products/${businessId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const updateVendorProduct = async (
  businessId: string,
  productId: string,
  formData: FormData
) => {
  const { data } = await apiClient.patch(
    `/vendor/products/${businessId}/${productId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return data;
};

export const deleteVendorProduct = async (
  businessId: string,
  productId: string
) => {
  const { data } = await apiClient.delete(
    `/vendor/products/${businessId}/${productId}`
  );
  return data;
};

/* =========================================================
   ANALYTICS
========================================================= */

export const getVendorAnalytics =
  async (): Promise<AnalyticsData> => {
    const { data } = await apiClient.get(`/vendor/analytics`);
    return data;
  };

/* =========================================================
   SALES
========================================================= */

export const getVendorSales =
  async (): Promise<VendorSalesData> => {
    const { data } = await apiClient.get(`/vendor/sales`);
    return data;
  };

/* =========================================================
   INVENTORY
========================================================= */

export const getVendorInventory =
  async (): Promise<VendorInventoryData> => {
    const { data } = await apiClient.get(`/vendor/inventory`);
    return data;
  };

/* =========================================================
   CATEGORIES
========================================================= */

export const getVendorCategories =
  async (): Promise<VendorCategoriesData> => {
    const { data } = await apiClient.get(`/vendor/categories`);
    return data;
  };

export const createCategory = async (name: string) => {
  const { data } = await apiClient.post(`/vendor/categories`, {
    name,
  });
  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await apiClient.delete(
    `/vendor/categories/${id}`
  );
  return data;
};

/* =========================================================
   DISCOUNTS
========================================================= */

export const getVendorDiscounts =
  async (): Promise<VendorDiscountsData> => {
    const { data } = await apiClient.get(`/vendor/discounts`);
    return data;
  };

export const createDiscount = async (payload: any) => {
  const { data } = await apiClient.post(
    `/vendor/discounts`,
    payload
  );
  return data;
};

export const toggleDiscountStatus = async (id: string) => {
  const { data } = await apiClient.patch(
    `/vendor/discounts/${id}/toggle`
  );
  return data;
};

/* =========================================================
   ORDERS (FULL LISTS)
========================================================= */

export const getVendorOrders =
  async (): Promise<VendorOrdersData> => {
    const { data } = await apiClient.get(`/vendor/orders`);
    return data;
  };

export const getVendorPendingOrders =
  async (): Promise<VendorPendingOrdersData> => {
    const { data } = await apiClient.get(
      `/vendor/orders/pending`
    );
    return data;
  };

export const getVendorCompletedOrders =
  async (): Promise<VendorCompletedOrdersData> => {
    const { data } = await apiClient.get(
      `/vendor/orders/completed`
    );
    return data;
  };

/* =========================================================
   RETURNS
========================================================= */

export const getVendorReturns =
  async (): Promise<VendorReturnsData> => {
    const { data } = await apiClient.get(`/vendor/returns`);
    return data;
  };

export const updateReturnStatus = async (
  id: string,
  status: "approved" | "rejected"
) => {
  const { data } = await apiClient.patch(
    `/vendor/returns/${id}`,
    { status }
  );
  return data;
};

/* =========================================================
   SHIPPING
========================================================= */

export const getVendorShipping =
  async (): Promise<VendorShippingData> => {
    const { data } = await apiClient.get(`/vendor/shipping`);
    return data;
  };

export const updateShipmentStatus = async (
  id: string,
  status: "pending" | "shipped" | "delivered" | "failed"
) => {
  const { data } = await apiClient.patch(
    `/vendor/shipping/${id}`,
    { status }
  );
  return data;
};

/* =========================================================
   DELIVERY ZONES
========================================================= */

export const getVendorDeliveryZones =
  async (): Promise<VendorDeliveryZonesData> => {
    const { data } = await apiClient.get(
      `/vendor/delivery-zones`
    );
    return data;
  };

export const createDeliveryZone = async (payload: any) => {
  const { data } = await apiClient.post(
    `/vendor/delivery-zones`,
    payload
  );
  return data;
};

export const toggleDeliveryZone = async (id: string) => {
  const { data } = await apiClient.patch(
    `/vendor/delivery-zones/${id}/toggle`
  );
  return data;
};

/* =========================================================
   REVENUE / PAYOUTS / TAXES
========================================================= */

export const getVendorRevenue =
  async (): Promise<VendorRevenueData> => {
    const { data } = await apiClient.get(`/vendor/revenue`);
    return data;
  };

export const getVendorPayouts =
  async (): Promise<VendorPayoutsData> => {
    const { data } = await apiClient.get(`/vendor/payouts`);
    return data;
  };

export const requestVendorPayout = async (payload: any) => {
  const { data } = await apiClient.post(
    `/vendor/payouts/request`,
    payload
  );
  return data;
};

export const getVendorTransactions =
  async (): Promise<VendorTransactionsData> => {
    const { data } = await apiClient.get(
      `/vendor/transactions`
    );
    return data;
  };

export const getVendorTaxes =
  async (): Promise<VendorTaxesData> => {
    const { data } = await apiClient.get(`/vendor/taxes`);
    return data;
  };

/* =========================================================
   CUSTOMERS & REVIEWS
========================================================= */

export const getVendorCustomers =
  async (): Promise<VendorCustomersData> => {
    const { data } = await apiClient.get(`/vendor/customers`);
    return data;
  };

export const getVendorReviews =
  async (): Promise<VendorReviewsData> => {
    const { data } = await apiClient.get(`/vendor/reviews`);
    return data;
  };

/* =========================================================
   STORE
========================================================= */

export const getVendorStore =
  async (): Promise<VendorStoreData> => {
    const { data } = await apiClient.get(`/vendor/store`);
    return data;
  };

export const updateVendorStore = async (payload: any) => {
  const { data } = await apiClient.patch(
    `/vendor/store`,
    payload
  );
  return data;
};

export const getVendorStoreSettings =
  async (): Promise<VendorStoreSettingsData> => {
    const { data } = await apiClient.get(
      `/vendor/store/settings`
    );
    return data;
  };

export const updateVendorStoreSettings = async (
  payload: Partial<VendorStoreSettings>
) => {
  const { data } = await apiClient.patch(
    `/vendor/store/settings`,
    payload
  );
  return data;
};

/* =========================================================
   SECURITY
========================================================= */

export const getVendorSecurity =
  async (): Promise<VendorSecurityData> => {
    const { data } = await apiClient.get(`/vendor/security`);
    return data;
  };

export const updateVendorSecurity = async (payload: any) => {
  const { data } = await apiClient.patch(
    `/vendor/security`,
    payload
  );
  return data;
};

export const revokeSession = async (sessionId: string) => {
  const { data } = await apiClient.delete(
    `/vendor/security/sessions/${sessionId}`
  );
  return data;
};

/* =========================================================
   PAYOUT SETTINGS
========================================================= */

export const getVendorPayoutSettings =
  async (): Promise<VendorPayoutSettingsData> => {
    const { data } = await apiClient.get(
      `/vendor/payout-settings`
    );
    return data;
  };

export const updateVendorPayoutSettings = async (
  payload: any
) => {
  const { data } = await apiClient.patch(
    `/vendor/payout-settings`,
    payload
  );
  return data;
};

/* =========================================================
   PRODUCT PERFORMANCE
========================================================= */

export const getVendorProductPerformance =
  async (): Promise<ProductPerformanceData> => {
    const { data } = await apiClient.get(
      `/vendor/product-performance`
    );
    return data;
  };




  export const createBusinessShippingRate =
  async (
    payload: CreateBusinessShippingRatePayload
  ) => {
    const res = await apiClient.post(
      "/business-shipping-rate/create-business-shipping-rate",
      payload
    );

    return res.data;
  };