

export interface Vendor {
  id: number;
  name: string;
  rating: number;
}


type DeliveryRule = {
  state: string;
  price: number;
  _id?: string;
};

/* ================= PRODUCTS ================= */

export type MediaType = "image" | "video";

export interface ProductMedia {
  _id?: string;
  type: MediaType;
  url: string;
  publicUrl?: string;
}

export type Product = {
  _id: string;
  id?: string;

  title?: string;
  name: string;

  description?: string;

  price: number;

  image?: string;

  productWeight?: string;

  deliveryRules?: DeliveryRule[];

  category?: string;

  inStock?: boolean;

  vendor?:
  | string
  | {
      _id: string;
      businessName?: string;

      
    };

  businessId?: {
  _id: string;

  businessName: string;

  businessAddress?: {
    state?: string;
    town?: string;
    address?: string;
  };
};

  stock?: number;


  media?: ProductMedia[];
};

/* ================= ORDERS ================= */

export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled";

export interface Order {
  id: string;

  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];

  total: number;

  date: string;

  status: OrderStatus;
}

/* ================= TRACKING ================= */

export interface TrackingOrder {
  id: string;

  status: string;

  deliveryStatus: string;

  estimatedDelivery: string;

  timeline: {
    step: string;
    completed: boolean;
    time?: string;
  }[];

  rider?: {
    id: string;
    name: string;
    phone: string;
    vehicle: string;
  };
}

/* ================= CHECKOUT ================= */

export type OrderItemPayload = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type VendorOrderPayload = {
  businessId: string;

  items: OrderItemPayload[];

  subtotal: number;

  status: OrderStatus;
};

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

/* ================= CART ================= */

export interface CartItem {
  id: string;

  title?: string;

  name: string;

  price: number;

  image?: string;

  vendor: string;

  acceptsGiftCard?: boolean;

  quantity: number;

  productId: string;

  businessId: string;
}

export type CartPayload = {
  productId: string;

  businessId: string;

  quantity: number;

  // optional frontend UI helpers
  name?: string;

  price?: number;

  image?: string;
};

export interface Cart {
  userId: string;
  items: CartItem[];
  total: number;
}

/**
 * UI Cart item
 */
export type CartItemUI = {
  id: string;

  title: string;

  price: number;

  image: string;

  vendor: string;

  quantity: number;
};

/**
 * Backend Cart item
 */
export type CartItemB = {
  productId: string;

  businessId: string;

  quantity: number;

  name?: string;
  price?: number;
  image?: string;



};

export type OrderItem = {
  id: string;

  title: string;

  quantity: number;

  price: number;
};

/* ================= DASHBOARD ================= */

export interface DashboardStats {
  cartItems: number;
  pendingOrders: number;
  completedOrders: number;
  totalOrders: number;
}

export interface DashboardRecentOrder {
  _id: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface DashboardProduct {
  _id: string;
  name: string;
  price: number;
  media: ProductMedia[];
}

export interface DashboardCart {
  itemsCount: number;
}

export interface DashboardData {
  stats: DashboardStats;

  recentOrders: DashboardRecentOrder[];

  products: DashboardProduct[];

  cart: DashboardCart;
}