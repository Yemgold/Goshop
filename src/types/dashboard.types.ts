


/* ================= DASHBOARD ================= */

import type { OrderStatus } from "./order.types";
import type { ProductMedia } from "./product.types";

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