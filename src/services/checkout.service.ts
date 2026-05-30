


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
      payload
    );

    return res.data;
  },
};