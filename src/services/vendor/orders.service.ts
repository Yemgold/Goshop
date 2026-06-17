

import { apiClient } from "../../api/core/api.client";
import type { Order } from "../../types/vendor/vendor.types";

import { normalizeVendorOrderList } from "../../mappers/vendorOrder.mapper";
import type { VendorOrderListItem } from "../../types/vendor/vendorOrderList.types";




/* =========================================================
   GET ORDERS TO FULFIL
========================================================= */


export const getVendorOrdersToFulfil = async (
  businessId: string
): Promise<VendorOrderListItem[]> => {
  const { data } = await apiClient.get(
    `/orders/business-orders-to-fulfil/${businessId}`
  );

   console.log("API RESPONSE:", data);

  return (data?.data || []).map(normalizeVendorOrderList);
};





/* =========================================================
   GET SINGLE ORDER DETAILS
========================================================= */

export const getVendorOrderDetails = async (
  businessId: string,
  orderId: string
): Promise<Order> => {
  const { data } = await apiClient.get(
    `/orders/business-single-order-to-fulfil/${businessId}/${orderId}`
  );

  return data.data;
};

/* =========================================================
   SEND ORDER TO PICKUP CENTER
========================================================= */

export const sendOrderToPickupCenter = async (
  businessId: string,
  orderId: string
): Promise<Order> => {
  const { data } = await apiClient.post(
    `/orders/send-single-order-to-pickup/${businessId}/${orderId}`
  );

  return data.data;
};






// export const getVendorOrdersToFulfil = async (
//   businessId: string
// ): Promise<VendorOrderListItem[]> => {
//   const { data } = await apiClient.get(
//     `/orders/business-orders-to-fulfil/${businessId}`
//   );

//   console.log("API RESPONSE:", data);

//   const raw =
//     data?.data?.[0]?.data ||   // nested format
//     data?.data ||             // flat array format
//     [];                       // fallback

//   const orders = Array.isArray(raw) ? raw : [];

//   return orders.map(normalizeVendorOrderList);
// };