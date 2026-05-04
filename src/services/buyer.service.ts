

import {
  getBuyerProductsAPI,
  getBuyerProductByIdAPI,
  getBuyerOrdersAPI,
  getOrderTrackingAPI,
  placeOrderAPI,
  getCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
} from "../api/buyer/buyer.api";

import { MOCK_BUYER_PRODUCTS } from "../mocks/buyer/Products.mock";
import { MOCK_BUYER_ORDERS } from "../mocks/buyer/Orders.mock";
import { MOCK_TRACKING } from "../mocks/buyer/Tracking.mock";

import { USE_MOCK } from "../config/env";

import type {
  BuyerProduct,
  Order,
  TrackingOrder,
  CartItem,
} from "../types/buyer.types";

/* =========================================================
   PRODUCTS
========================================================= */

export const getBuyerProducts = async (): Promise<BuyerProduct[]> => {
  if (USE_MOCK) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_BUYER_PRODUCTS), 400)
    );
  }
  return getBuyerProductsAPI();
};

export const getBuyerProductById = async (
  id: string
): Promise<BuyerProduct | null> => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      const product =
        MOCK_BUYER_PRODUCTS.find((p) => p.id === id) || null;

      setTimeout(() => resolve(product), 300);
    });
  }

  return getBuyerProductByIdAPI(id);
};

/* =========================================================
   ORDERS
========================================================= */

export const getBuyerOrders = async (): Promise<Order[]> => {
  if (USE_MOCK) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(MOCK_BUYER_ORDERS), 400)
    );
  }
  return getBuyerOrdersAPI();
};

export const getOrderTracking = async (
  id: string
): Promise<TrackingOrder> => {
  if (USE_MOCK) {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            id,
            ...MOCK_TRACKING,
          }),
        400
      )
    );
  }
  return getOrderTrackingAPI(id);
};

/* =========================================================
   CHECKOUT
========================================================= */

export const placeOrder = async (
  payload: any
): Promise<{ orderId: string }> => {
  if (USE_MOCK) {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve({ orderId: `ORD-${Date.now()}` }),
        500
      )
    );
  }

  return placeOrderAPI(payload);
};

/* =========================================================
   CART (FIXED TYPES)
========================================================= */

export const getCart = async (): Promise<CartItem[]> => {
  if (USE_MOCK) {
    return JSON.parse(localStorage.getItem("mock_cart") || "[]");
  }
  return getCartAPI();
};

export const addToCart = async (
  item: CartItem
): Promise<CartItem[]> => {
  if (USE_MOCK) {
    const cart: CartItem[] = JSON.parse(
      localStorage.getItem("mock_cart") || "[]"
    );

    const updated = [...cart, item];
    localStorage.setItem("mock_cart", JSON.stringify(updated));
    return updated;
  }

  return addToCartAPI(item);
};

export const updateCartItem = async (
  id: string,
  qty: number
): Promise<CartItem[]> => {
  if (USE_MOCK) {
    const cart: CartItem[] = JSON.parse(
      localStorage.getItem("mock_cart") || "[]"
    );

    const updated = cart.map((i) =>
      i.id === id ? { ...i, quantity: qty } : i
    );

    localStorage.setItem("mock_cart", JSON.stringify(updated));
    return updated;
  }

  return updateCartItemAPI(id, qty);
};

export const removeCartItem = async (
  id: string
): Promise<CartItem[]> => {
  if (USE_MOCK) {
    const cart: CartItem[] = JSON.parse(
      localStorage.getItem("mock_cart") || "[]"
    );

    const updated = cart.filter((i) => i.id !== id);

    localStorage.setItem("mock_cart", JSON.stringify(updated));
    return updated;
  }

  return removeCartItemAPI(id);
};

export const clearCart = async (): Promise<void> => {
  if (USE_MOCK) {
    localStorage.removeItem("mock_cart");
    return;
  }

  return clearCartAPI();
};