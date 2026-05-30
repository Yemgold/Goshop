
// hooks/vendor/useVendorOrders.ts
import { useQuery } from "@tanstack/react-query";
import { getVendorOrders } from "../../services/vendor/vendor.service";

export const useVendorOrders = () => {
  return useQuery({
    queryKey: ["vendor-orders"],
    queryFn: getVendorOrders,
  });
};