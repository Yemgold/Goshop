




import { useQuery } from "@tanstack/react-query";
import { getVendorOrderDetails } from "../../services/vendor/orders.service";
import { useAuthStore } from "../../store/auth.store";

export const useVendorOrder = (orderId?: string) => {
  const user = useAuthStore((state) => state.user);
  const businessId = user?.businessId;

  return useQuery({
    queryKey: ["vendor-order", businessId, orderId],
    queryFn: () => getVendorOrderDetails(businessId!, orderId!),
    enabled: !!businessId && !!orderId,
  });
};