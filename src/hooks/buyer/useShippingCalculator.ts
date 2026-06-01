

import { useShippingRate } from "../../hooks/buyer/useShippingRate";

export function useShippingCalculator(
  businessId?: string,
  destinationState?: string,
  totalWeight?: number
) {
  const { data: shippingFee = 0 } = useShippingRate(
    businessId,
    destinationState,
    totalWeight
  );

  return {
    shippingFee,
  };
}