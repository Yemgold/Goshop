

import { useQuery } from "@tanstack/react-query";
import { getVendorOrderByIdAPI } from "../../api/user/vendor.api";
import { vendorKeys } from "../../query/vendorKeys"; 
import type { Order } from "../../types/vendor/vendor.types";

export const useOrder = (id: string) => {
  return useQuery<Order>({
    queryKey: vendorKeys.order(id),
    queryFn: () => getVendorOrderByIdAPI(id),
    enabled: !!id, // prevents running before route param exists
  });
};