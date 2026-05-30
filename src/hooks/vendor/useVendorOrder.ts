

// hooks/vendor/useVendorOrder.ts
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../services/vendor/vendor.service";

export const useVendorOrder = (id: string) => {
  return useQuery({
    queryKey: ["vendor-order", id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });
};