


import { getBuyerProductsAPI, getBuyerProductByIdAPI } from "../api/product.api";
import { normalizeProduct } from "../mappers/product.mapper";

export const productService = {
  getProducts: async (params?: { page?: number; limit?: number }) => {
    const res = await getBuyerProductsAPI(params);

    const products = Array.isArray(res?.products)
      ? res.products.map(normalizeProduct)
      : [];

    return {
      products,
      meta: res?.meta ?? {
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        total: 0,
        totalPages: 1,
      },
    };
  },



getProductsPaginated: async (page: number, limit: number) => {
  const res = await getBuyerProductsAPI({ page, limit });

  const products = res?.products ?? [];

  const meta = res?.meta ?? {
    page,
    totalPages: 1,
  };

  return {
    data: Array.isArray(products)
      ? products.map(normalizeProduct)
      : [],

    meta: {
      currentPage: meta.page ?? page,
      totalPages: meta.totalPages ?? 1,
    },
  };
},



  /* ================= PRODUCT BY ID ================= */

getProductById: async (id: string) => {
  const res = await getBuyerProductByIdAPI(id);

  const product = res?.data?.data ?? res?.data;

  return normalizeProduct(product);


},








};




