
// ===============================
// CORE ORDER TYPE (shared with rider system)
// ===============================

import type { DeliveryStatus } from "./rider.types";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

// ===============================
// ORDER MODEL
// ===============================

export interface Order {
  id: string;
  items: OrderItem[];

  total: number;

  deliveryStatus: DeliveryStatus;

  riderId: string | null;

  pickup: string;
  dropoff: string;

  date: string;
}

// ===============================
// PROMOTER DASHBOARD STATS
// ===============================

export interface PromoterStats {
  totalOrders: number;
  pendingOrders: number;
  inProgressOrders: number;
  completedOrders: number;

  totalRevenue: number;
  averageOrderValue: number;
}

// ===============================
// STATUS BREAKDOWN
// ===============================

export interface StatusBreakdown {
  pending: number;
  assigned: number;
  pickedUp: number;
  enRoute: number;
  delivered: number;
}

// ===============================
// DASHBOARD SUMMARY VIEW MODEL
// ===============================

export interface DashboardSummary {
  stats: PromoterStats;
  breakdown: StatusBreakdown;
  recentOrders: Order[];
}

// ===============================
// FILTER OPTIONS (for future UI filters)
// ===============================

export type OrderFilter =
  | "ALL"
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED";