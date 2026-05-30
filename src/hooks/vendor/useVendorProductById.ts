


import { useQuery } from "@tanstack/react-query";
import { getVendorProductById } from "../../services/vendor/vendor.service"; 
import { useAuthStore } from "../../store/auth.store";

export const useVendorProductById = (productId?: string) => {
  const businessId = useAuthStore((s) => s.user?.businessId);

  return useQuery({
    queryKey: ["vendor-product", businessId, productId],
    queryFn: async () => {
      if (!businessId || !productId) throw new Error("Missing IDs");

      const res = await getVendorProductById(businessId, productId);
      return res.data.data.data; // 👈 because of your response structure
    },
    enabled: !!businessId && !!productId,
  });
};