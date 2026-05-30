


/* =========================================================
   TYPES
========================================================= */

export type GiftCardPayload = {
  cardNumber: string;
};

export type GiftCardData = {
  valid: boolean;
  cardNumber: string;
  ownerName: string;
  balance: number;
  currency: string;
  expiresAt: string;
  active: boolean;
  usable: boolean;
};

export type GiftCardResponse = {
  success: boolean;
  data: GiftCardData;
  message?: string;
};