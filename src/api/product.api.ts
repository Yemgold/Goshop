import { apiClient } from "../api/core/api.client";

export const getBuyerProductsAPI = async (params?: {
  page?: number;
  limit?: number;
}) => {
  const res = await apiClient.get("/buyers/products", {
    params,
  });

  return {
    products: Array.isArray(res?.data?.data?.data)
      ? res.data.data.data
      : [],

    meta: {
      page:
        res?.data?.data?.meta?.page ??
        params?.page ??
        1,

      limit:
        res?.data?.data?.meta?.limit ??
        params?.limit ??
        10,

      total:
        res?.data?.data?.meta?.total ??
        0,

      totalPages:
        res?.data?.data?.meta?.totalPages ??
        1,
    },
  };
};

export const getBuyerProductByIdAPI = async (id: string) => {
  const res = await apiClient.get(`/buyers/products/${id}`);

  return res?.data?.data ?? null;
};

