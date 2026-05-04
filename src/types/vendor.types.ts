
export interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;

  status: "Processing" | "Accepted" | "Rejected" | "Delivered";

  riderId: string | null;

  deliveryStatus:
    | "Pending"
    | "Assigned"
    | "PickedUp"
    | "EnRoute"
    | "Delivered";
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: "Active" | "Inactive";
  barcode?: string; 
}

export interface DashboardData {
  revenue: number;
  orders: number;
  products: number;
  vendorName: string;

  recentOrders: {
  id: string;
  customer: string;
  amount: number;
  status: "Processing" | "Accepted" | "Rejected" | "Delivered";
}[];
}

export interface AnalyticsData {
  revenue: number;
  orders: number;
  conversionRate: number;

  salesChart: { day: string; revenue: number }[];

  topProducts: { name: string; sales: number }[];

  insights: {
    bestDay: string;
    topCategory: string;
    returnRate: number;
  };
}



export type CartItemType  = Product &{
  id: string;
  name: string;
  price: number;
  qty: number;
};

