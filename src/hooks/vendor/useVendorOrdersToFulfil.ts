







import { useQuery } from "@tanstack/react-query";
import { getVendorOrders } from "../../services/vendor/orders";

export const useVendorOrdersToFulfil = (businessId: string) => {
  return useQuery({
    queryKey: ["vendor-fulfil-orders", businessId],

    queryFn: async () => {
      const res = await getVendorOrders({
        businessId,
      });

      console.log("SERVICE RESULT:", res);

      return res;
    },

    enabled: !!businessId,
  });
};