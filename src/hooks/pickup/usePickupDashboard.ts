
import { useQuery } from "@tanstack/react-query";
import { getPickupDashboardAPI } from "../../api/user/pickup.api";
import { pickupKeys } from "../../query/pickupKeys";
import type { DashboardData } from "../../types/pickup/pickup.types";

export const useVendorDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: pickupKeys.dashboard, 
    queryFn: getPickupDashboardAPI,
  });
};