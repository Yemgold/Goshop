

import { useQuery } from "@tanstack/react-query";
import { vendorService } from "../../services/vendor/vendor.api.service"; 

export function useShippingRate(
  businessId?: string,
  destinationState?: string,
  weight?: number
) {
  return useQuery({
    queryKey: [
      "shipping-rate",
      businessId,
      destinationState,
      weight,
    ],

    enabled:
      !!businessId &&
      !!destinationState &&
      typeof weight === "number" &&
      weight > 0,

    queryFn: () =>
      vendorService.getShippingRate(
        businessId!,
        destinationState!,
        weight!
      ),

    staleTime: 1000 * 60 * 5,
  });
}