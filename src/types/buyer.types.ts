



export type BuyerProduct = {
  id: string;
  title: string;
  price: number;
  image: string;
  vendor: string;
  description: string;

  inStock: boolean; // ❗ make REQUIRED (fixes TS chaos)
  category?: string;
};

export type Order = {
  id: string;
  items: {
    id: string;
    title: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  date: string;
  status: "Processing" | "Delivered" | "Cancelled";
};

export interface TrackingOrder {
  id: string;
  deliveryStatus: string;
  estimatedDelivery: string;

  timeline: {
    step: string;
    completed: boolean;
    time?: string;
  }[];

  // ✅ ADD THIS
  rider?: {
    id: string;
    name: string;
    phone: string;
    vehicle: string;
  };
}


export type CheckoutPayload = {
  address: string;
  city: string;
  paymentMethod: string;
  items: {
    id: string;
    title: string;
    quantity: number;
    
    price: number;
  }[];
  total: number;
};

export type CheckoutResponse = {
  orderId: string;
};


export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  vendor: string;
  acceptsGiftCard?: boolean;
  quantity: number;
};
