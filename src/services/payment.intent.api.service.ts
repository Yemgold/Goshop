

import { apiClient } from "../api/core/api.client";

/* ================= CHECKOUT ================= */

import type {
  CreateOrderPayload,
  CreateOrderResponse,
} from "../types/paymentintent.type";

export const placeOrder = async (
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> => {
  const response =
    await apiClient.post(
      "/orders/create-order",
      payload
    );

  console.log(
    "🟡 FULL RESPONSE:",
    response
  );

  console.log(
    "🟢 RESPONSE DATA:",
    response.data
  );

  return response.data;
};