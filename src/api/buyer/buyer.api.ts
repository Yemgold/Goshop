// C:\ecom\frontend\src\api\buyer.api.ts


import { apiClient } from "../core/api.client";
import type { BuyerProduct } from "../../types/buyer.types";


import type {
  Order,
  TrackingOrder,
  CheckoutPayload,
  CheckoutResponse,
  CartItem,
} from "../../types/buyer.types";

/* ================= PRODUCTS ================= */


export const getBuyerProductsAPI = async (): Promise<BuyerProduct[]> => {
  const res = await apiClient.get("/products");
  return res.data;
};

export const getBuyerProductByIdAPI = async (
  id: string
): Promise<BuyerProduct> => {
  const res = await apiClient.get(`/products/${id}`);

  // 🔥 FIX: never allow null
  if (!res.data) {
    throw new Error("Product not found");
  }

  return res.data;
};

/* ================= ORDERS ================= */

export const getBuyerOrdersAPI = async (): Promise<Order[]> => {
  const res = await apiClient.get<Order[]>("/buyer/orders");
  return res.data ?? [];
};

export const getOrderTrackingAPI = async (
  id: string
): Promise<TrackingOrder> => {
  const res = await apiClient.get<TrackingOrder | null>(`/orders/${id}`);

  if (!res.data) {
    throw new Error("Tracking not found");
  }

  return res.data;
};

/* ================= CHECKOUT ================= */

export const placeOrderAPI = async (
  payload: CheckoutPayload
): Promise<CheckoutResponse> => {
  const res = await apiClient.post<CheckoutResponse>("/orders", payload);
  return res.data;
};

/* ================= CART ================= */

export const getCartAPI = async (): Promise<CartItem[]> => {
  const res = await apiClient.get<CartItem[]>("/cart");
  return res.data ?? [];
};

export const addToCartAPI = async (
  item: CartItem
): Promise<CartItem[]> => {
  const res = await apiClient.post<CartItem[]>("/cart", item);
  return res.data ?? [];
};

export const updateCartItemAPI = async (
  id: string,
  quantity: number
): Promise<CartItem[]> => {
  const res = await apiClient.patch<CartItem[]>(`/cart/${id}`, {
    quantity,
  });

  return res.data ?? [];
};

export const removeCartItemAPI = async (
  id: string
): Promise<CartItem[]> => {
  const res = await apiClient.delete<CartItem[]>(`/cart/${id}`);
  return res.data ?? [];
};

export const clearCartAPI = async (): Promise<void> => {
  await apiClient.delete("/cart");
};





