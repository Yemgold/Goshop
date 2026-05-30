

// // ===============================
// // SHARED IMPORTS
// // ===============================

// import type { DeliveryStatus } from "./rider.types";

// // ===============================
// // CORE ORDER ITEM
// // ===============================

// export interface OrderItem {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
// }

// // ===============================
// // ORDER MODEL
// // ===============================

// export interface Order {
//   id: string;

//   items: OrderItem[];

//   total: number;

//   deliveryStatus: DeliveryStatus;

//   riderId: string | null;

//   pickup: string;
//   dropoff: string;

//   date: string;
// }

// // ===============================
// // PROMOTER DASHBOARD STATS
// // ===============================

// export interface PromoterStats {
//   totalOrders: number;
//   pendingOrders: number;
//   inProgressOrders: number;
//   completedOrders: number;

//   totalRevenue: number;
//   averageOrderValue: number;
// }

// // ===============================
// // STATUS BREAKDOWN
// // ===============================

// export interface StatusBreakdown {
//   pending: number;
//   assigned: number;
//   pickedUp: number;
//   enRoute: number;
//   delivered: number;
// }

// // ===============================
// // DASHBOARD SUMMARY
// // ===============================

// export interface DashboardSummary {
//   stats: PromoterStats;
//   breakdown: StatusBreakdown;
//   recentOrders: Order[];
// }

// // ===============================
// // FILTERS
// // ===============================

// export type OrderFilter =
//   | "ALL"
//   | "PENDING"
//   | "IN_PROGRESS"
//   | "COMPLETED";

// // ===============================
// // BANK / PARTNER DATA
// // ===============================

// export type PromoterPartnerDataType = {
//   bankName: string;
//   accountNumber: string;
//   accountName: string;
// };

// // ===============================
// // PROFILE
// // ===============================

// export interface PromoterProfile {
//   id: string;

//   fullName: string;

//   email: string;

//   phone?: string;

//   avatar?: string;

//   referralCode: string;

//   walletBalance: number;

//   totalEarnings: number;

//   totalReferrals: number;
// }

// // ===============================
// // UPDATE PROFILE PAYLOAD
// // ===============================

// export interface UpdatePromoterProfilePayload {
//   fullName?: string;
//   phone?: string;
//   avatar?: string;
// }

// // ===============================
// // ANALYTICS
// // ===============================

// export interface Analytics {
//   clicks: number;
//   conversions: number;
//   revenue: number;
//   commission: number;
// }

// // ===============================
// // CAMPAIGNS
// // ===============================

// export interface Campaign {
//   id: string;

//   title: string;


//   description: string;

//   commissionRate: number;

//   status: "active" | "paused" | "ended";

//   startDate: string;

//   endDate: string;

//   banner?: string;
// }

// // ===============================
// // CAMPAIGN DETAILS
// // ===============================

// export interface CampaignDetails
//   extends Campaign {
//   totalClicks: number;

//   totalConversions: number;

//   totalRevenue: number;

//   products: PromoterProductPerformance[];
// }

// // ===============================
// // PRODUCT PERFORMANCE
// // ===============================

// export interface PromoterProductPerformance {
//   id: string;

//   productTitle: string;

//   clicks: number;

//   sales: number;

//   conversionRate: number;

//   conversions: number;

//   revenue: number;

//   commissionEarned: number;
// }

// // ===============================
// // REFERRALS
// // ===============================

// export interface Referral {
//   id: string;

//   customerName: string;

//   joinedAt: string;

//   totalOrders: number;

//   totalSpent: number;
// }

// // ===============================
// // REFERRAL STATS
// // ===============================

// export interface ReferralStats {
//   totalReferrals: number;

//   activeReferrals: number;

//   totalReferralRevenue: number;
// }

// // ===============================
// // COUPONS
// // ===============================

// export interface Coupon {
//   id: string;

//   code: string;

//   discount: number;

//   expiresAt: string;

//   usageCount: number;
// }

// // ===============================
// // TRAINING MATERIALS
// // ===============================

// export interface TrainingMaterial {
//   id: string;

//   title: string;

//   description: string;

//   videoUrl?: string;

//   documentUrl?: string;

//   createdAt: string;
// }

// // ===============================
// // REWARDS
// // ===============================

// export interface Reward {
//   id: string;

//   title: string;

//   pointsRequired: number;

//   image?: string;

//   available: boolean;
// }

// // ===============================
// // EARNINGS
// // ===============================

// export interface Earnings {
//   total: number;

//   pending: number;

//   withdrawn: number;

//   available: number;
// }

// // ===============================
// // EARNINGS HISTORY
// // ===============================

// export interface EarningsHistory {
//   id: string;

//   amount: number;

//   source: string;

//   createdAt: string;
// }

// // ===============================
// // WITHDRAWAL
// // ===============================

// export interface WithdrawalPayload {
//   amount: number;

//   bankName: string;

//   accountNumber: string;

//   accountName: string;
// }

// // ===============================
// // TRANSACTIONS
// // ===============================

// export interface Transaction {
//   id: string;

//   type: "credit" | "debit";

//   amount: number;

//   description: string;

//   createdAt: string;
// }

// // ===============================
// // COMMISSIONS
// // ===============================

// export interface Commission {
//   id: string;

//   orderId: string;

//   productTitle: string;

//   amount: number;

//   status: "pending" | "paid";

//   createdAt: string;
// }

// // ===============================
// // NOTIFICATIONS
// // ===============================

// export interface Notification {
//   id: string;

//   title: string;

//   message: string;

//   read: boolean;

//   createdAt: string;
// }

// // ===============================
// // SUPPORT TICKETS
// // ===============================

// export interface SupportTicket {
//   id: string;

//   subject: string;

//   message: string;

//   status: "open" | "closed" | "pending";

//   createdAt: string;
// }

// // ===============================
// // CREATE TICKET PAYLOAD
// // ===============================

// export interface CreateTicketPayload {
//   subject: string;

//   message: string;
// }























// ===============================
// SHARED IMPORTS
// ===============================

import type { DeliveryStatus } from "./rider.types";

// ===============================
// CORE ORDER ITEM
// ===============================

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
// DASHBOARD SUMMARY
// ===============================

export interface DashboardSummary {
  stats: PromoterStats;
  breakdown: StatusBreakdown;
  recentOrders: Order[];
}

// ===============================
// PROFILE
// ===============================

export interface PromoterProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  referralCode: string;
  walletBalance: number;
  totalEarnings: number;
  totalReferrals: number;
}

// ===============================
// CAMPAIGN
// ===============================

export interface Campaign {
  id: string;
  title: string;
  description: string;
  commissionRate: number;
  status: "active" | "paused" | "ended";
  startDate: string;
  endDate: string;
  banner?: string;
}

// ===============================
// PRODUCT PERFORMANCE (FIXED)
// ===============================

export interface PromoterProductPerformance {
  id: string;
  productTitle: string;
  clicks: number;
  conversions: number;
  sales: number;
  revenue: number;
  commissionEarned: number;
  conversionRate: number;
}

// ===============================
// CAMPAIGN DETAILS (FIXED FINAL)
// ===============================

export interface CampaignDetails extends Campaign {
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;

  products: {
    productId: string;
    title: string;
    clicks: number;
    conversions: number;
    revenue: number;
  }[];
}

// ===============================
// REFERRALS
// ===============================

export interface Referral {
  id: string;
  customerName: string;
  joinedAt: string;
  totalOrders: number;
  totalSpent: number;
}

// ===============================
// COUPONS
// ===============================

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  expiresAt: string;
  usageCount: number;
}

// ===============================
// TRAINING MATERIALS
// ===============================

export interface TrainingMaterial {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  documentUrl?: string;
  createdAt: string;
}

// ===============================
// REWARDS
// ===============================

export interface Reward {
  id: string;
  title: string;
  pointsRequired: number;
  image?: string;
  available: boolean;
}

// ===============================
// EARNINGS
// ===============================

export interface Earnings {
  total: number;
  pending: number;
  withdrawn: number;
  available: number;
}

// ===============================
// EARNINGS HISTORY
// ===============================

export interface EarningsHistory {
 
  id: string;
  source?: string;
  createdAt: string;
  type: "credit" | "debit";
  amount: number;
};

// ===============================
// EARNINGS HISTORY
// ===============================

export interface EarningsSummary {
 
total: number;
  pending: number;
  withdrawn: number;
  available: number;
};

// ===============================
// WITHDRAWAL
// ===============================

export interface WithdrawalPayload {
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

// ===============================
// TRANSACTIONS
// ===============================

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  createdAt: string;
}

// ===============================
// COMMISSIONS
// ===============================

export interface Commission {
  id: string;
  orderId: string;
  productTitle: string;
  amount: number;
  status: "pending" | "paid";
  createdAt: string;
}

// ===============================
// NOTIFICATIONS
// ===============================

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// ===============================
// SUPPORT TICKETS
// ===============================

export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: "open" | "closed" | "pending";
  createdAt: string;
}

// ===============================
// CREATE TICKET PAYLOAD
// ===============================

export interface CreateTicketPayload {
  subject: string;
  message: string;
}
