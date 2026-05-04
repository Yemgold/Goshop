
// hooks/vendor/useVendorOrders.ts
import { useQuery } from "@tanstack/react-query";
import { getVendorOrders } from "../../services/vendor.service";

export const useVendorOrders = () => {
  return useQuery({
    queryKey: ["vendor-orders"],
    queryFn: getVendorOrders,
  });
};