


import type { Product } from "../types/buyer.types";

export const toProduct = (data: any): Product => {
  return {
    _id: data._id,

    name: data.name,

    title: data.name,

    description: data.description ?? "",

    price: Number(data.price ?? 0),

    category: data.category ?? "",

    inStock: Boolean(data.inStock),

    stock: Number(data.stock ?? 0),

    businessId: data.businessId,

    media: data.media ?? [],
  };
};