
import type { CartItem } from "../../types/buyer.types";

/* =========================================================
   🛒 MOCK CART STATE
========================================================= */

export let mockCart: CartItem[] = [
  {
    id: "p1",
    title: "Wireless Headphones",
    price: 45000,
    quantity: 1,
     vendor: "Tech Store",
    image: "/images/WirelessHeadphones.jpg",
  },
];

/* =========================================================
   ➕ ADD TO CART
========================================================= */
export const addToCartMock = (
  id: string,
  title: string,
  price: number,
  image: string,
  vendor: string,
  quantity: number
): CartItem[] => {
  const existing = mockCart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    mockCart.push({
      id,
      title,
      price,
      image,
     vendor,
      quantity,
    });
  }

  return mockCart;
};

/* =========================================================
   🔄 UPDATE CART ITEM
========================================================= */
export const updateCartItemMock = (
  id: string,
  quantity: number
): CartItem[] => {
  mockCart = mockCart.map((item) =>
    item.id === id ? { ...item, quantity } : item
  );

  return mockCart;
};

/* =========================================================
   ❌ REMOVE FROM CART
========================================================= */
export const removeFromCartMock = (id: string): CartItem[] => {
  mockCart = mockCart.filter((item) => item.id !== id);
  return mockCart;
};

/* =========================================================
   🧹 CLEAR CART
========================================================= */
export const clearCartMock = (): CartItem[] => {
  mockCart = [];
  return mockCart;
};

/* =========================================================
   📥 GET CART
========================================================= */
export const getCartMock = (): CartItem[] => {
  return mockCart;
};