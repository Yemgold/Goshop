

import type { BuyerProduct, CartItem } from "../types/buyer.types";

/**
 * Converts API Product → CartItem automatically
 */
export const toCartItem = (product: BuyerProduct): CartItem => {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    vendor: product.vendor,
    quantity: 1,
  };
};