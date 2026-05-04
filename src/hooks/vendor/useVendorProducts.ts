import { useInfiniteQuery } from "@tanstack/react-query";
import { getVendorProductsAPI } from "../../api/vendor/vendor.api";
import { vendorKeys } from "../../query/vendorKeys";

import type { Product } from "../../types/vendor.types";

type ProductPage = {
  items: Product[];
  nextPage: number | null;
};

export const useVendorProducts = (limit = 10) => {
  return useInfiniteQuery<ProductPage>({
    queryKey: vendorKeys.products(),

    queryFn: async ({ pageParam = 1 }) => {
      const products = await getVendorProductsAPI(); // ✅ NO args, NO .data

      const start = ((pageParam as number) - 1) * limit;
      const end = start + limit;

      const paginated = products.slice(start, end);

      return {
        items: paginated,
        nextPage: end < products.length ? (pageParam as number) + 1 : null,
      };
    },

    getNextPageParam: (lastPage) => lastPage.nextPage,

    initialPageParam: 1,
  });
};



