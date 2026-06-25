





import { apiClient } from "../../api/core/api.client";
import { getBusinessSingleOrderToFulfilAPI } from "../../api/user/vendor.api";
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
  businessId: string;
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
  const { businessId, page = 1, limit = 10, status, search = "" } = params;

  const response = await apiClient.get<VendorOrdersResponse>(
    `/orders/business-orders-to-fulfil/${businessId}`,
    {
      params: {
        page,
        limit,
        status,
        search,
      },
    }
  );

  console.log("FULL RESPONSE", response.data);

  return response.data.data.data;
};

/* =========================================================
   GET SINGLE ORDER (VENDOR CONTEXT)
========================================================= */

// export const getBusinessSingleOrderToFulfil = async (
//   businessId: string,
//   orderId: string
// ) => {
//   console.log("BUSINESS ID SENT:", businessId);
//   console.log("ORDER ID SENT:", orderId);

//   const response =
//     await getBusinessSingleOrderToFulfilAPI(
//       businessId,
//       orderId
//     );

//   console.log("ORDER DETAILS RESPONSE:", response);
//   console.log("FIRST ITEM:", response.data?.[0]);

//   return response.data?.[0];
// };



export const getBusinessSingleOrderToFulfil = async (
  businessId: string,
  orderId: string
) => {
  console.log("BUSINESS ID SENT:", businessId);
  console.log("ORDER ID SENT:", orderId);

  const response =
    await getBusinessSingleOrderToFulfilAPI(
      businessId,
      orderId
    );

  console.log("ORDER DETAILS RESPONSE:", response);
  console.log("FIRST ITEM:", response.data?.[0]);

  return response.data?.[0] || null;
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