
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



/* ================= SHIPPING ================= */

export type ShippingRate = {
  destinationState: string;
  originState: string;

  weightRanges: {
    min: number;
    max: number | null;
    price: number;
  }[];
};

/* Optional legacy rule (keep if backend still uses it) */
export type DeliveryRule = {
  state: string;
  price: number;
  _id?: string;
};