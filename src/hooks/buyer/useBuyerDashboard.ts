
import { useQuery } from "@tanstack/react-query";
import { getBuyerDashboardAPI } from "../../api/user/buyer.api";
import { buyerKeys } from "../../query/buyerKeys";
import type { DashboardData } from "../../types/buyer.types";

export const useBuyerDashboard = () => {
  return useQuery<DashboardData>({
    queryKey: buyerKeys.dashboard, 
    queryFn: getBuyerDashboardAPI,
  });
};