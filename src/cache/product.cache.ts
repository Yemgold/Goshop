

import type { Product } from "../types";
import { normalizeProduct } from "../mappers/product.mapper"; 

/* ================= CACHE ================= */

let productCache = new Map<string, Product>();

/* ================= SET CACHE ================= */

export const setProductCache = (products: any[]) => {
  productCache = new Map(
    products.map((p) => {
      const normalized = normalizeProduct(p);

      return [normalized._id, normalized];
    })
  );
};

/* ================= GET FROM CACHE ================= */

export const getProductFromCache = (id: string) => {
  return productCache.get(String(id));
};