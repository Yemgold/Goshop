


import { apiClient } from "../api/core/api.client";
import type {
  CreateOrderPayload,
  CreateOrderResponse,
} from "../types/paymentintent.type";

export const checkoutService = {
  placeOrder: async (
    payload: CreateOrderPayload
  ): Promise<CreateOrderResponse> => {
    const res = await apiClient.post(
      "/orders/create-order",
      payload );

console.log("🔥 RAW PAYLOAD SENT:", JSON.stringify(payload, null, 2));

    return res.data;
  },
};



