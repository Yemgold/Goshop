
// hooks/vendor/useDeleteProduct.ts
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteVendorProduct } from "../../services/vendor/vendor.service";

// export const useDeleteProduct = () => {
//   const queryClient = useQueryClient();

// // 

//   return useMutation({
//     mutationFn: (id: string) => deleteVendorProduct(id),

//     onMutate: async (id) => {
//       await queryClient.cancelQueries({ queryKey: ["vendor-products"] });

//       const previous = queryClient.getQueryData(["vendor-products"]);

//       queryClient.setQueryData(["vendor-products"], (old: any) =>
//         old?.filter((p: any) => p.id !== id)
//       );

//       return { previous };
//     },

//     onError: (_err, _id, context) => {
//       queryClient.setQueryData(
//         ["vendor-products"],
//         context?.previous
//       );
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["vendor-products"] });
//     },
//   });
// };



import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/auth.store";
import { deleteVendorProduct } from "../../services/vendor/vendor.service";

export const useDeleteVendorProduct = () => {
  const businessId = useAuthStore(
    (state) => state.user?.businessId
  );

  return useMutation({
    mutationFn: (productId: string) => {
      if (!businessId) {
        throw new Error("Business ID not found");
      }

      return deleteVendorProduct(
        businessId,
        productId
      );
    },
  });
};