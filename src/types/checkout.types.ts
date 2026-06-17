



/* ================= CHECKOUT ================= */

import type { OrderStatus } from "./order.types";

/* ---------- payload for single product in checkout ---------- */
export type OrderItemPayload = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

/* ---------- grouped vendor order ---------- */
export type VendorOrderPayload = {
  businessId: string;
  items: OrderItemPayload[];
  subtotal: number;
  status: OrderStatus;
};

/* ---------- create order request ---------- */
export interface CreateOrderPayload {
  cartId: string;

  items: {
    productId: string;
    businessId: string;
    quantity: number;
  }[];

  customerId: string;
  deliveryAddress: string;
  contactPhone: string;
  idempotencyKey: string;
  deliveryFee: number;
  notes?: string;
}

/* ---------- full checkout request ---------- */
export type CheckoutPayload = {
  customerId: string;
  vendorOrders: VendorOrderPayload[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: string;
  idempotencyKey: string;
  contactPhone: string;
  notes?: string;
  isPaid: boolean;
};

/* ---------- backend response ---------- */
export type CheckoutResponse = {
  success: boolean;
  message: string;

  data: {
    order: {
      _id: string;
      customerId: string;
      subtotal: number;
      total: number;
      deliveryFee: number;
      deliveryAddress: string;
      contactPhone: string;
      status: OrderStatus;
      isPaid: boolean;
    };

    paymentIntent: {
      provider: string;
      reference: string;
      providerReference: string;
      paymentUrl: string;
    };
  };
};