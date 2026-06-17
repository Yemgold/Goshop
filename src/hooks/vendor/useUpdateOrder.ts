

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateVendorOrderStatus } from "../../services/vendor/orders.service";
// import type { OrderStatus } from "../../services/vendor/orders.service";

// /* ================= TYPES ================= */

// interface UpdateOrderPayload {
//   id: string;
//   status: OrderStatus;
// }

// /* ================= HOOK ================= */

// export const useUpdateOrder = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, status }: UpdateOrderPayload) =>
//       updateVendorOrderStatus(id, status),

//     /* ================= OPTIMISTIC UPDATE ================= */
//     onSuccess: (_data, variables) => {
//       const { id,  } = variables;

//       // 1. Update single order cache
//       queryClient.invalidateQueries({
//         queryKey: ["order", id],
//       });

//       // 2. Refresh orders list
//       queryClient.invalidateQueries({
//         queryKey: ["vendor-orders"],
//       });

//       // optional: if you use filters
//       queryClient.invalidateQueries({
//         queryKey: ["vendor-orders-filtered"],
//       });
//     },
//   });
// };