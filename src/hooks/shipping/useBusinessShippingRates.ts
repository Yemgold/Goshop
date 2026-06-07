

import { useQuery } from "@tanstack/react-query";
import { getBusinessShippingRates } from "../../services/vendor/vendor.api.service"; 
import type { BusinessShippingRate } from "../../types/vendor/delivery.types";

export const useBusinessShippingRates = (
  businessId: string
) => {
  return useQuery<BusinessShippingRate[]>({
    queryKey: ["business-shipping-rates", businessId],

    queryFn: () =>
      getBusinessShippingRates(businessId),

    enabled: !!businessId,
  });
};