
import { useQuery } from "@tanstack/react-query";
import { getVendorOrdersToFulfil } from "../../services/vendor/orders.service";
import { useAuthStore } from "../../store/auth.store";

export const useVendorOrders = () => {
  const user = useAuthStore((state) => state.user);
  const businessId = user?.businessId;

  return useQuery({
    queryKey: ["vendor-orders", businessId],
    queryFn: () => getVendorOrdersToFulfil(businessId!),
    enabled: !!businessId,
  });
};