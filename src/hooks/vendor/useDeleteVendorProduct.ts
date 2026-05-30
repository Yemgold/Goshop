


import { useMutation } from "@tanstack/react-query";

import { deleteVendorProduct } from "../../services/vendor/vendor.service";

export const useDeleteVendorProduct = () => {
  return useMutation({
    mutationFn: ({
      businessId,
      productId,
    }: {
      businessId: string;
      productId: string;
    }) =>
      deleteVendorProduct(
        businessId,
        productId
      ),
  });
};;