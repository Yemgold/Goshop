

import apiClient from "../core/api.client";

import type { Cart, DashboardData, TrackingOrder } from "../../types";

import type { CreateOrderPayload } from "../../types/paymentintent.type";


/* ================= DASHBOARD ================= */
export const getBuyerDashboardAPI = async (): Promise<DashboardData> => {
  const res = await apiClient.get("/dashboard/buyer");
  return res.data.data;
};

/* ================= PRODUCTS ================= */







/* ================= ORDERS ================= */
export const getBuyerOrdersAPI = async (buyerId: string) => {
  const res = await apiClient.get(`/orders/buyer-orders/${buyerId}`);
  return res.data.data;
};

export const placeOrderAPI = async (payload: CreateOrderPayload) => {
  const res = await apiClient.post("/orders/create-order", payload);
  return res.data;
};

export const getOrderTrackingAPI = async (
  orderId: string,
  customerId: string
): Promise<TrackingOrder> => {
  const res = await apiClient.get(
    `/orders/customer-orders/${orderId}/${customerId}`
  );
  return res.data.data;
};

/* ================= CART ================= */

export const getCartAPI = async (): Promise<Cart> => {
  try {
    const res = await apiClient.get("/carts/get-cart");
    return res.data?.data;
  } catch (error: any) {
    const status = error?.response?.status;

    // 👇 treat "no cart yet" as empty cart (NOT error)
    if (status === 404) {
      return {
        userId: "",
        items: [],
        total:0,
      };
    }

    throw error;
  }
};



export const getOrCreateCartAPI = async () => {
  const res = await apiClient.get("/carts/get-or-create-cart");

  console.log(
    "GET CART RESPONSE:",
    JSON.stringify(res.data, null, 2)
  );


  return res.data.data;
};






export const addToCartAPI = async ({
  productId,
  businessId,
  quantity,
}: {
  productId: string;
  businessId: string;
  quantity: number;
}) => {
  const res = await apiClient.post("/carts/add-item-to-cart", {
    productId,
    businessId,
    quantity,
  });

  return res.data.data;
};


export const updateCartItemAPI = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const res = await apiClient.patch(
    `/carts/update-item-quantity/${productId}`,
    { quantity }
  );

  return res.data.data;
};

export const removeCartItemAPI = async (productId: string) => {
  const res = await apiClient.delete(`/carts/remove-item/${productId}`);
  return res.data.data;
};

export const clearCartAPI = async () => {
  const res = await apiClient.delete("/carts/clear-cart");
  return res.data.data;
};


export const getAllPickupCentersAPI = async () => {
  const response = await apiClient.get(
    `/pickup-center/get-all-pickup-centers`
  );

  return response.data;
};


export const getBusStopsByStateAPI = async (state: string) => {
  const response = await apiClient.get(
    `/home-delivery/get-state-delivery-rates-to-nearest-bus-stops/${state}`
  );

  return response.data;
};


export const verifyPaymentAPI = (reference: string) => {
  return apiClient.get(`/payments/verify/${reference}`);
};





