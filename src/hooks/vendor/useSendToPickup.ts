

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendOrderToPickupCenter } from "../../services/vendor/orders.service";

interface Payload {
  businessId: string;
  orderId: string;
}

export const useSendToPickup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ businessId, orderId }: Payload) =>
      sendOrderToPickupCenter(businessId, orderId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["vendor-fulfil-orders", variables.businessId],
      });

      queryClient.invalidateQueries({
        queryKey: ["vendor-order", variables.businessId, variables.orderId],
      });
    },
  });
};