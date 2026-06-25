


import { useQuery } from "@tanstack/react-query";
import { getBusinessSingleOrderToFulfil } from "../../services/vendor/orders";

export const useVendorOrderDetails = (
  businessId: string,
  orderId: string
) => {
  return useQuery({
    queryKey: [
      "vendor-order-details",
      businessId,
      orderId,
    ],

    queryFn: async () => {
      const res = await getBusinessSingleOrderToFulfil(
        businessId,
        orderId
      );

      return res;
    },

    enabled: !!businessId && !!orderId,
  });
};