


import { useQuery } from "@tanstack/react-query";
import { getVendorOrderDetails } from "../../services/vendor/orders.service";

export const useVendorOrderDetails = (
  businessId: string,
  orderId: string
) => {
  return useQuery({
    queryKey: ["vendor-order", businessId, orderId],
    queryFn: () => getVendorOrderDetails(businessId, orderId),
    enabled: !!businessId && !!orderId,
  });
};