
export type CartItem = {
  productId: string;
  businessId: string;
  quantity: number;
  name: string;
  price: number;
  vendorState: string;
  vendorTown: string;
  weight: number;
};



export type CartPayload = {
  productId: string;
  businessId: string;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
  weight?: string;
};

export interface Cart {
  _id?: string;
  userId: string;
  items: CartItem[];
  total: number;
};

export type CartItemUI = {
  id: string;
  title: string;
  price: number;
  image: string;
  vendor: string;
  quantity: number;
};

export type CartItemB = {
  productId: string;
  businessId: string;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
  weight?: string;
};