




// ================= SHIPPING RATE TYPES =================

export interface WeightRange {
  min: number;
  max: number;
  price: number;
}

export interface BusinessShippingRate {
  _id: string;
  businessId: string;
  originState: string;
  destinationState: string;
  weightRanges: WeightRange[];
  createdAt: string;
  updatedAt: string;
}

/* ================= RESPONSE ================= */

export type BusinessShippingRateResponse = BusinessShippingRate[];