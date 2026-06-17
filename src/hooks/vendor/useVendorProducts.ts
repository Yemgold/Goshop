

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../../api";
import { useAuthStore } from "../../store/auth.store";
import type { Product } from "../../types/vendor/vendor.types";

/* ================= TYPES ================= */

type ApiResponse = {
  success: boolean;
  message: string;
  data: {
    message: string;
    data: {
      products: Product[];
      totalCount: number;
      totalPages: number;
      currentPage: number;
    };
  };
};

type PaginatedProducts = {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

/* ================= FETCH ================= */

const fetchProductsByBusiness = async (
  businessId: string,
  page: number,
  limit: number
): Promise<PaginatedProducts> => {
  try {
    const endpoint =
      `products/get-products-by-businessId/${businessId}?page=${page}&limit=${limit}`;

    const response = await apiClient.get<ApiResponse>(endpoint);

    const apiData = response.data?.data;
    const result = apiData?.data;

    if (!result) {
      return {
        products: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: page,
      };
    }

    return {
      products: result.products ?? [],
      totalCount: result.totalCount ?? 0,
      totalPages: result.totalPages ?? 1,
      currentPage: result.currentPage ?? page,
    };
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return {
        products: [],
        totalCount: 0,
        totalPages: 1,
        currentPage: page,
      };
    }

    throw error;
  }
};

/* =========================================================
   1. ORIGINAL HOOK (UNCHANGED — SAFE FOR ADMIN PAGES)
========================================================= */

export const useVendorProducts = (
  page: number = 1,
  limit: number = 10
) => {
  const businessId = useAuthStore((state) => state.user?.businessId);

  return useQuery({
    queryKey: ["vendor-products", businessId, page, limit],

    queryFn: () => {
      if (!businessId) throw new Error("Missing businessId");

      return fetchProductsByBusiness(businessId, page, limit);
    },

    enabled: !!businessId,

    staleTime: 1000 * 60 * 2,
  });
};

/* =========================================================
   2. NEW HOOK (FOR VIRAL FEED ONLY — NO BREAKING CHANGES)
========================================================= */

export const useVendorProductsFeed = (limit: number = 10) => {
  const businessId = useAuthStore((state) => state.user?.businessId);

  return useInfiniteQuery({
    queryKey: ["vendor-products-feed", businessId, limit],

    enabled: !!businessId,

    queryFn: ({ pageParam = 1 }) => {
      if (!businessId) throw new Error("Missing businessId");

      return fetchProductsByBusiness(businessId, pageParam, limit);
    },

    getNextPageParam: (lastPage) => {
      const next = lastPage.currentPage + 1;

      return next <= lastPage.totalPages ? next : undefined;
    },

    initialPageParam: 1,
  });
};



