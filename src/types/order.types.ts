


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
};

export type OrderItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
};