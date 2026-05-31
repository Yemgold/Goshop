

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVendorProductAPI } from "../../api/user/vendor.api";
import { vendorKeys } from "../../query/vendorKeys";
import type { Product } from "../../types/vendor/vendor.types";

export const useDeleteVendorProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVendorProductAPI(id),

    /* ================= OPTIMISTIC UPDATE ================= */
    onMutate: async (id: string) => {
      // cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: vendorKeys.products(),
      });

      // snapshot previous state
      const previousProducts =
        queryClient.getQueryData<Product[]>(vendorKeys.products());

      // optimistically update cache
      queryClient.setQueryData<Product[]>(
        vendorKeys.products(),
        (old) => {
          if (!old) return [];

          return old.filter((product) => product._id !== id);
        }
      );

      return { previousProducts };
    },

    /* ================= ROLLBACK ================= */
    onError: (_err, _id, context) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(
          vendorKeys.products(),
          context.previousProducts
        );
      }
    },

    /* ================= SYNC SERVER ================= */
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: vendorKeys.products(),
      });
    },
  });
};





