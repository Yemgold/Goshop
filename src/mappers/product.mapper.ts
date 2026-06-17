


import type { Product } from "../types"; 

export const normalizeProduct = (data: any): Product => {
  if (!data) {
    console.warn("normalizeProduct received empty data");
    return {} as Product;
  }

  const id = String(data?._id || data?.id || "");

  return {
    ...data, // 👈 IMPORTANT: preserve everything

    _id: id,

    id, // 👈 ADD THIS (CRITICAL FIX for matching)

    name: data?.name || data?.title || "Unnamed Product",
    title: data?.title || data?.name || "Unnamed Product",

    description: data?.description ?? "",
    price: Number(data?.price ?? 0),
    category: data?.category ?? "",
    inStock: Boolean(data?.inStock),
    stock: Number(data?.stock ?? 0),

    businessId:
      typeof data?.businessId === "string"
        ? data.businessId
        : data?.businessId?._id ||
          data?.business?._id ||
          data?.business?.id ||
          "",

    media: Array.isArray(data?.media)
      ? data.media
      : data?.image
      ? [{ url: data.image }]
      : [],
  };
};