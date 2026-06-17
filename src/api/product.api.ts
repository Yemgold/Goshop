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






// import { getBuyerProductsAPI } from "../api/product.api";
// import { normalizeProduct } from "../mappers/product.mapper";

// export const productService = {
//   getProducts: async (params?: { page?: number; limit?: number }) => {
//     const res = await getBuyerProductsAPI(params);

//     const products = Array.isArray(res?.products)
//       ? res.products.map(normalizeProduct)
//       : [];

//     return {
//       products,
//       meta: res?.meta ?? {
//         page: params?.page ?? 1,
//         limit: params?.limit ?? 10,
//         total: 0,
//         totalPages: 1,
//       },
//     };
//   },
// };





// import { useQuery } from "@tanstack/react-query";
// import { productService } from "../../services/product.service";

// export const useProducts = (params?: {
//   page?: number;
//   limit?: number;
// }) => {
//   return useQuery({
//     queryKey: ["products", params],
//     queryFn: () => productService.getProducts(params),
//     initialData: {
//       products: [],
//       meta: {
//         page: 1,
//         limit: 10,
//         total: 0,
//         totalPages: 1,
//       },
//     },
//   });
// };








// const { data, isLoading, isError } = useProducts();
// const products = data?.products ?? [];


// queryKey: ["products", params]