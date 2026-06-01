

import { useShippingRate } from "../buyer/useShippingRate";

export function useMultiVendorShipping(vendors: any[], destinationState: string) {
  return vendors.map((vendor) => {
    const { data: shippingFee = 0 } = useShippingRate(
      vendor.businessId,
      destinationState,
      vendor.totalWeight
    );

    return {
      ...vendor,
      shippingFee,
      total: vendor.subtotal + shippingFee,
    };
  });
}