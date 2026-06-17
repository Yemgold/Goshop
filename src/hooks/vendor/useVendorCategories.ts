

import { useQuery } from "@tanstack/react-query";
import { getVendorCategories } from "../../services/vendor/vendor.service";
import type { VendorCategoriesData } from "../../types/vendor/vendor.types";

export const useVendorCategories = () => {
  return useQuery<VendorCategoriesData>({
    queryKey: ["vendor-categories"],
    queryFn: getVendorCategories,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};