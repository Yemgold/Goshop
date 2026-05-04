
// hooks/vendor/useUpdateOrderStatus.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVendorOrder } from "../../services/vendor.service";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "Processing" | "Accepted" | "Rejected" | "Delivered";
    }) => updateVendorOrder(id, status),

    // 🔥 OPTIMISTIC UPDATE
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["vendor-orders"] });

      const previousOrders = queryClient.getQueryData(["vendor-orders"]);

      queryClient.setQueryData(["vendor-orders"], (old: any) =>
        old?.map((order: any) =>
          order.id === id
            ? { ...order, status }
            : order
        )
      );

      return { previousOrders };
    },

    // rollback on error
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        ["vendor-orders"],
        context?.previousOrders
      );
    },

    // refetch after success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["vendor-orders"] });
      queryClient.invalidateQueries({ queryKey: ["vendor-order"] });
    },
  });
};