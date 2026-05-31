

export interface WeightRange {
  _id: string;
  min: number;
  max: number;
  price: number;
}

export interface PriceBreakdown {
  _id: string;
  destinationState: string;
  weightRanges: WeightRange[];
}

export interface BusinessShippingRate {
  _id: string;

  businessId: string;

  originState: string;

  priceBreakdown: PriceBreakdown[];

  createdAt: string;

  updatedAt: string;
}