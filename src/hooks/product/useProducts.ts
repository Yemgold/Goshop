

import { useQuery } from "@tanstack/react-query";
import { productService } from "../../services/product.service";

export const useProducts = (params?: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["products", params],

    queryFn: () => productService.getProducts(params),

    initialData: () => ({
      products: [],
      meta: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        total: 0,
        totalPages: 1,
      },
    }),
  });
};