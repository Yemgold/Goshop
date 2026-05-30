import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVendorOrderAPI } from "../../api/user/vendor.api";
import { vendorKeys } from "../../query/vendorKeys";




type Order = {
  id: string;
  status: "processing" | "shipped" | "delivered" | "canceled";
  // 
  // "processing" | "accepted" | "rejected" | "delivered";
  riderId: string | null;
  deliveryStatus: string;
};

type OrdersResponse = {
  orders: Order[];
  recentOrders?: Order[];
};

export const useUpdateVendorOrder = (page = 1) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: Order["status"];
    }) => updateVendorOrderAPI(id, status),

    /* ================= OPTIMISTIC UPDATE ================= */
    onMutate: async ({ id, status }) => {
      const ordersKey = vendorKeys.orders(page);
      const dashboardKey = vendorKeys.dashboard;

      await queryClient.cancelQueries({ queryKey: ordersKey });
      await queryClient.cancelQueries({ queryKey: dashboardKey });

      const previousOrders =
        queryClient.getQueryData<OrdersResponse>(ordersKey);

      const previousDashboard =
        queryClient.getQueryData<any>(dashboardKey);

      // 🔥 UPDATE ORDERS CACHE
      queryClient.setQueryData<OrdersResponse>(ordersKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          orders: old.orders.map((o) =>
            o.id === id
              ? {
                  ...o,
                  status,
                  riderId:
                    status === "shipped" ? "RIDER-001" : o.riderId,
                  deliveryStatus:
                    status === "shipped"
                      ? "Assigned"
                      : o.deliveryStatus,
                }
              : o
          ),
        };
      });

      // 🔥 UPDATE DASHBOARD RECENT ORDERS
      queryClient.setQueryData(dashboardKey, (old: any) => {
        if (!old?.recentOrders) return old;

        return {
          ...old,
          recentOrders: old.recentOrders.map((o: any) =>
            o.id === id
              ? {
                  ...o,
                  status,
                }
              : o
          ),
        };
      });

      return { previousOrders, previousDashboard };
    },

    /* ================= ROLLBACK ================= */
    onError: (_err, _vars, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(
          vendorKeys.orders(page),
          context.previousOrders
        );
      }

      if (context?.previousDashboard) {
        queryClient.setQueryData(
          vendorKeys.dashboard,
          context.previousDashboard
        );
      }
    },

    /* ================= SYNC ================= */
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: vendorKeys.orders(page),
      });

      queryClient.invalidateQueries({
        queryKey: vendorKeys.dashboard,
      });
    },
  });
};