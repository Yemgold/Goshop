
// hooks/vendor/useDeleteProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVendorProduct } from "../../services/vendor.service";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVendorProduct(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["vendor-products"] });

      const previous = queryClient.getQueryData(["vendor-products"]);

      queryClient.setQueryData(["vendor-products"], (old: any) =>
        old?.filter((p: any) => p.id !== id)
      );

      return { previous };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(
        ["vendor-products"],
        context?.previous
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["vendor-products"] });
    },
  });
};