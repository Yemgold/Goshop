

import { useQuery } from "@tanstack/react-query";
import { buyerService } from "../../services/buyer.api.service";

export function useBuyerProduct(productId?: string) {
  return useQuery({
    queryKey: ["product", productId],

    queryFn: async () => {
      if (!productId) {
        throw new Error("Missing product id");
      }

      return await buyerService.getProductById(productId);
    },

    enabled: !!productId,
  });
}






// import { useQuery } from "@tanstack/react-query";

// import { buyerService } from "../../services/buyer.api.service";

// export function useBuyerProduct(productId?: string) {
//   return useQuery({
//     queryKey: ["product", productId],

//     queryFn: () => {
//       if (!productId) {
//         throw new Error("Missing product id");
//       }

//       return buyerService.getProductById(productId);
//     },

//     enabled: !!productId,
//   });
// }