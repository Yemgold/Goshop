





import { apiClient } from "../../api/core/api.client";
import type {
  Order,
  VendorOrder,
  VendorOrdersResponse,
} from "../../types/vendor/vendor.types";

/* =========================================================
   TYPES
========================================================= */

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "canceled";

export interface GetVendorOrdersParams {
  vendorId: string;
  page?: number;
  limit?: number;
  status?: OrderStatus;
  search?: string;
}

/* =========================================================
   GET ALL VENDOR ORDERS (MASTER ENDPOINT)
========================================================= */

export const getVendorOrders = async (
  params: GetVendorOrdersParams
): Promise<VendorOrder[]> => {
  const { vendorId, page = 1, limit = 10, status, search = "" } = params;

  const { data } = await apiClient.get<VendorOrdersResponse>(
    `/orders/vendor/${vendorId}`,
    {
      params: {
        page,
        limit,
        status,
        search,
      },
    }
  );

  return data.data;
};

/* =========================================================
   GET SINGLE ORDER (VENDOR CONTEXT)
========================================================= */

export const getVendorOrderById = async (
  id: string
): Promise<Order> => {
  const { data } = await apiClient.get(
    `/orders/${id}`
  );

  return data.data;
};

/* =========================================================
   UPDATE ORDER STATUS (SINGLE SOURCE OF TRUTH)
========================================================= */

export const updateVendorOrderStatus = async (
  id: string,
  status: OrderStatus
): Promise<Order> => {
  const { data } = await apiClient.patch(
    `/orders/${id}/status`,
    { status }
  );

  return data.data;
};

/* =========================================================
   GET BUYER ORDERS (OPTIONAL FEATURE)
========================================================= */

export const getBuyerOrders = async (
  buyerId: string
): Promise<Order[]> => {
  const { data } = await apiClient.get(
    `/orders/buyer/${buyerId}`
  );

  return data.data;
};