

import { useQuery } from "@tanstack/react-query";

import { getBusinessShippingRates } from "../../api/user/vendor.api";

export const useBusinessShippingRates = (
  businessId: string
) => {
  return useQuery({
    queryKey: [
      "business-shipping-rates",
      businessId,
    ],

    queryFn: () =>
      getBusinessShippingRates(
        businessId
      ),

    enabled: !!businessId,
  });
};