



import { useQuery } from "@tanstack/react-query";
import { getVendorAnalyticsAPI } from "../../api/user/vendor.api";
import { vendorKeys } from "../../query/vendorKeys";
import type { AnalyticsData } from "../../types/vendor.types";

export const useVendorAnalytics = () => {
  return useQuery<AnalyticsData>({
    queryKey: vendorKeys.analytics,
    queryFn: getVendorAnalyticsAPI,
  });
};