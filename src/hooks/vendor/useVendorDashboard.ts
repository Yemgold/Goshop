

import { useQuery } from "@tanstack/react-query";
import { getVendorDashboardAPI } from "../../api/vendor/vendor.api";
import { vendorKeys } from "../../query/vendorKeys";
import type { DashboardData } from "../../types/vendor.types";

export const useVendorDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: vendorKeys.dashboard, // ✅ array, NOT function
    queryFn: getVendorDashboardAPI,
  });
};