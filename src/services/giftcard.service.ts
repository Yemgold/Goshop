


// services/giftcard.service.ts
import apiClient from "../api";

import type {
  GiftCardPayload,
  GiftCardResponse,
} from "../types/giftcard.types";

/* =========================================================
   GIFT CARD SERVICE
========================================================= */

export const giftCardService = {
  validate: async (
    data: GiftCardPayload
  ): Promise<GiftCardResponse> => {
    const response = await apiClient.post(
      "/gift-card",
      data
    );

    return response.data;
  },
};