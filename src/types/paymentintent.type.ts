

export type PaymentMethod =
  | "card"
  | "transfer";

/* =========================
   CREATE ORDER PAYLOAD
========================= */

export interface CreateOrderItemPayload {
  productId: string;
  businessId: string;
  quantity: number;
   customerId: string;
  _id?: string;
}

export interface CreateOrderPayload {
  buyerId: string;

  deliveryMode: "office" | "home" | null;

  address: string | null;
  city: string | null;
  contactPhone: string;

  vendors: {
    businessId: string;

    items: {
      productId: string;
      quantity: number;
      price: number;
    }[];

    subtotal: number;
    shippingFee: number;
    total: number;
  }[];

  grandTotal: number;

  idempotencyKey?: string;

  notes?: string;
}









// export interface CreateOrderPayload {
//   cartId: string;

//   items: {
//     productId: string;
//     businessId: string;
//     quantity: number;
//   }[];

//   customerId: string;
//   deliveryAddress: string | null;
//   contactPhone: string;
//   idempotencyKey: string;

//   deliveryFee: number;  

//   notes?: string;
// }

/* =========================
   PAYMENT INTENT
========================= */

export interface PaymentIntent {
  provider: string;

  reference: string;

  providerReference: string;

  paymentUrl: string;
}

/* =========================
   ORDER RESPONSE
========================= */

export interface OrderItem {
  productId: string;

  businessId: string;

  quantity: number;

  _id?: string;
}

export interface Order {
  _id: string;

  cartId: string;

  customerId: string;

  items: OrderItem[];

  subtotal: number;

  deliveryFee: number;

  total: number;

  deliveryAddress: string;

  phone: string;

  isPaid: boolean;

  paymentMethod: PaymentMethod;

  status:
    | "pending"
    | "processing"
    | "delivered"
    | "cancelled"
    | "paid";

  createdAt: string;

  updatedAt: string;

  __v: number;
}

/* =========================
   API RESPONSE
========================= */

export interface CreateOrderResponse {
  success: boolean;

  message: string;

  data: {
    paymentIntent: PaymentIntent;

    order: Order;
  };
}

/* =========================
   CART ITEM
========================= */

export type CartItemB = {
  productId: string;

  businessId: string;

  quantity: number;

  _id?: string;
};



































