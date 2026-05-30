

import { useMutation } from "@tanstack/react-query";

import { createVendorProduct } from "../../services/vendor/vendor.service";

export const useCreateVendorProduct = () => {
  return useMutation({
    mutationFn: ({
      businessId,
      formData,
    }: {
      businessId: string;
      formData: FormData;
    }) =>
      createVendorProduct(
        businessId,
        formData
      ),
  });
};









// export const useCreateVendorProduct = () => {
//   return useMutation({
//     mutationFn: async ({
//       businessId,
//       payload,
//     }: {
//       businessId: string | null;
//       payload: any;
//     }) => {
//       if (!businessId) {
//         throw new Error("Missing businessId");
//       }

//       return createVendorProduct(businessId, payload);
//     },
//   });
// };

