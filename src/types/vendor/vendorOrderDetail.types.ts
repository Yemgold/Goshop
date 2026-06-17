


export type VendorOrderDetail = {
  id: string;
  customer: string;
  email?: string;
  quantity?: number;
  paymentStatus?: string;
  shippingAddress?: string;
  total: number;
  orderStatus: string;
  createdAt?: string;
};