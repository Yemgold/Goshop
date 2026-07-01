


import * as api from "../../api/user/vendor.api";
import { apiClient } from "../../api/core/api.client";

import type {
  AnalyticsData,
  VendorDiscountsData,
  Order,
  VendorSalesData,
  VendorInventoryData,
  VendorCategoriesData,
  VendorPendingOrdersData,
  VendorCompletedOrdersData,
  VendorReturnsData,
  VendorShippingData,
  VendorDeliveryZonesData,
  VendorRevenueData,
  VendorPayoutsData,
  VendorTransactionsData,
  VendorTaxesData,
  VendorCustomersData,
  VendorReviewsData,
  VendorStoreData,
  VendorStoreSettings,
  VendorStoreSettingsData,
  VendorSecurityData,
  VendorPayoutSettingsData,
  ProductPerformanceData,
} from "../../types/vendor/vendor.types";

import type{ Product } from "../../types";

/* ================= ORDERS ================= */


export const updateVendorOrder = async (
  id: string,
  status: Order["status"]
): Promise<Order> => {
  return api.updateVendorOrderAPI(id, status);
};

/* ================= PRODUCTS ================= */

export const getVendorProducts = async (
  businessId: string,
  page = 1,
  limit = 10
): Promise<Product[]> => {
  return api.getVendorProductsAPI(
    businessId,
    page,
    limit
  );
};

/* ================= UPDATE PRODUCT ================= */

export const updateVendorProduct = (
  businessId: string,
  productId: string,
  formData: FormData
) => {
  return apiClient.patch(
    `products/update-product-by-productId/${businessId}/${productId}`,
    formData
  );
};

/* ================= DELETE PRODUCT ================= */

export const deleteVendorProduct = (
  businessId: string,
  productId: string
) => {
  return apiClient.delete(
    `products/delete-product-by-productId/${businessId}/${productId}`
  );
};

/* ================= CREATE PRODUCT ================= */

export const createVendorProduct = (
  businessId: string,
  formData: FormData
) => {
  return apiClient.post(
    `products/create-product/${businessId}`,
    formData
  );
};

/* ================= GET SINGLE PRODUCT ================= */

export const getVendorProductById = (
  businessId: string,
  productId: string
) => {
  return apiClient.get(
    `products/get-product-by-businessId/${businessId}/${productId}`
  );
};

/* ================= ANALYTICS ================= */

export const getVendorAnalytics =
  async (): Promise<AnalyticsData> => {
    return api.getVendorAnalyticsAPI();
  };

/* ================= SALES ================= */

export const getVendorSales =
  async (): Promise<VendorSalesData> => {
    return api.getVendorSalesAPI();
  };

/* ================= INVENTORY ================= */

export const getVendorInventory =
  async (): Promise<VendorInventoryData> => {
    return api.getVendorInventoryAPI();
  };

/* ================= CATEGORIES ================= */

export const getVendorCategories =
  async (): Promise<VendorCategoriesData> => {
    return api.getVendorCategoriesAPI();
  };

export const createCategory = async (
  name: string
) => {
  return api.createCategoryAPI(name);
};

export const deleteCategory = async (
  id: string
) => {
  return api.deleteCategoryAPI(id);
};

/* ================= DISCOUNTS ================= */

export const getVendorDiscounts =
  async (): Promise<VendorDiscountsData> => {
    return api.getVendorDiscountsAPI();
  };

export const createDiscount = async (
  payload: {
    code: string;
    type: "percentage" | "fixed";
    value: number;
    usageLimit: number;
    expiresAt: string;
  }
) => {
  return api.createDiscountAPI(payload);
};

export const toggleDiscountStatus = async (
  id: string
) => {
  return api.toggleDiscountStatusAPI(id);
};



export const updateOrderStatus = async (
  id: string,
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "canceled"
) => {
  return api.updateOrderStatusAPI(id, status);
};

/* ================= PENDING ORDERS ================= */

export const getVendorPendingOrders =
  async (): Promise<VendorPendingOrdersData> => {
    return api.getVendorPendingOrdersAPI();
  };

export const updatePendingOrderStatus =
  async (
    id: string,
    status:
      | "pending"
      | "processing"
      | "shipped"
  ) => {
    return api.updatePendingOrderStatusAPI(
      id,
      status
    );
  };

/* ================= COMPLETED ORDERS ================= */

export const getVendorCompletedOrders =
  async (): Promise<VendorCompletedOrdersData> => {
    return api.getVendorCompletedOrdersAPI();
  };

/* ================= RETURNS ================= */

export const getVendorReturns =
  async (): Promise<VendorReturnsData> => {
    return api.getVendorReturnsAPI();
  };

export const updateReturnStatus =
  async (
    id: string,
    status:
      | "approved"
      | "rejected"
  ) => {
    return api.updateReturnStatusAPI(id, status);
  };

/* ================= SHIPPING ================= */

export const getVendorShipping =
  async (): Promise<VendorShippingData> => {
    return api.getVendorShippingAPI();
  };

export const updateShipmentStatus =
  async (
    id: string,
    status:
      | "pending"
      | "shipped"
      | "delivered"
      | "failed"
  ) => {
    return api.updateShipmentStatusAPI(
      id,
      status
    );
  };

/* ================= DELIVERY ZONES ================= */

export const getVendorDeliveryZones =
  async (): Promise<VendorDeliveryZonesData> => {
    return api.getVendorDeliveryZonesAPI();
  };

export const createDeliveryZone =
  async (payload: {
    name: string;
    states: string[];
    deliveryFee: number;
    estimatedDays: string;
  }) => {
    return api.createDeliveryZoneAPI(payload);
  };

export const toggleDeliveryZone =
  async (id: string) => {
    return api.toggleDeliveryZoneAPI(id);
  };

/* ================= REVENUE ================= */

export const getVendorRevenue =
  async (): Promise<VendorRevenueData> => {
    return api.getVendorRevenueAPI();
  };

/* ================= PAYOUTS ================= */

export const getVendorPayouts =
  async (): Promise<VendorPayoutsData> => {
    return api.getVendorPayoutsAPI();
  };

export const requestVendorPayout =
  async (payload: {
    amount: number;
    bankName: string;
    accountNumber: string;
  }) => {
    return api.requestVendorPayoutAPI(payload);
  };

/* ================= TRANSACTIONS ================= */

export const getVendorTransactions =
  async (): Promise<VendorTransactionsData> => {
    return api.getVendorTransactionsAPI();
  };

/* ================= TAXES ================= */

export const getVendorTaxes =
  async (): Promise<VendorTaxesData> => {
    return api.getVendorTaxesAPI();
  };

/* ================= CUSTOMERS ================= */

export const getVendorCustomers =
  async (): Promise<VendorCustomersData> => {
    return api.getVendorCustomersAPI();
  };

/* ================= REVIEWS ================= */

export const getVendorReviews =
  async (): Promise<VendorReviewsData> => {
    return api.getVendorReviewsAPI();
  };

/* ================= STORE ================= */

export const getVendorStore =
  async (): Promise<VendorStoreData> => {
    return api.getVendorStoreAPI();
  };

export const updateVendorStore =
  async (payload: Partial<any>) => {
    return api.updateVendorStoreAPI(payload);
  };

/* ================= SETTINGS ================= */

export const getVendorStoreSettings =
  async (): Promise<VendorStoreSettingsData> => {
    return api.getVendorStoreSettingsAPI();
  };

export const updateVendorStoreSettings =
  async (
    payload: Partial<VendorStoreSettings>
  ) => {
    return api.updateVendorStoreSettingsAPI(
      payload
    );
  };

/* ================= SECURITY ================= */

export const getVendorSecurity =
  async (): Promise<VendorSecurityData> => {
    return api.getVendorSecurityAPI();
  };

export const updateVendorSecurity =
  async (payload: Partial<any>) => {
    return api.updateVendorSecurityAPI(payload);
  };

export const revokeSession =
  async (sessionId: string) => {
    return api.revokeSessionAPI(sessionId);
  };

/* ================= PAYOUT SETTINGS ================= */

export const getVendorPayoutSettings =
  async (): Promise<VendorPayoutSettingsData> => {
    return api.getVendorPayoutSettingsAPI();
  };

export const updateVendorPayoutSettings =
  async (payload: Partial<any>) => {
    return api.updateVendorPayoutSettingsAPI(
      payload
    );
  };

/* ================= PRODUCT PERFORMANCE ================= */

export const getVendorProductPerformance =
  async (): Promise<ProductPerformanceData> => {
    return api.getVendorProductPerformanceAPI();
  };




export type ShippingRateResponse = {
  success: boolean;
  message: string;
  data: number;
};



// ================= SHIPPING RATE TYPES =================

export interface CreateWeightRange {
  min: number;
  max: number | null;
  price: number;
}

export interface CreateBusinessShippingRatePayload {
  businessId: string;
  originState: string;
  destinationState: string;
  weightRanges: CreateWeightRange[];
}

/* ================= RESPONSE ================= */

export interface BusinessShippingRate {
  _id: string;
  businessId: string;
  originState: string;
  destinationState: string;
  weightRanges: CreateWeightRange[];
  createdAt: string;
  updatedAt: string;
}

export interface BusinessShippingRateResponse {
  success: boolean;
  message: string;
  data: BusinessShippingRate;
}