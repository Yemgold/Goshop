

import { useMutation } from "@tanstack/react-query";

import { updateVendorProduct } from "../../services/vendor/vendor.service";

// useUpdateVendorProduct.ts
export const useUpdateVendorProduct = () => {
  return useMutation({
    mutationFn: ({
      businessId,
      productId,
      formData,
    }: {
      businessId: string;
      productId: string;
      formData: FormData;
    }) =>
      updateVendorProduct(
        businessId,
        productId,
        formData
      ),
  });
};