






import type {
  Campaign,
  CampaignDetails,
  Commission,
  Coupon,
  DashboardSummary,
  Earnings,
  EarningsHistory,
  Notification,
  PromoterProductPerformance,
  PromoterProfile,
  Referral,
  SupportTicket,
  Transaction,
  TrainingMaterial,
  WithdrawalPayload,
} from "../../types/promoter.types";

/* ======================================================
   HELPERS
====================================================== */

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

/* ======================================================
   PROFILE
====================================================== */

export const getPromoterProfile =
  async (): Promise<PromoterProfile> => {
    await delay(400);

    return {
      id: "p1",
      fullName: "John Doe",
      email: "john@demo.com",
      phone: "08012345678",
      avatar: "",
      referralCode: "JOHN2026",
      walletBalance: 25000,
      totalEarnings: 120000,
      totalReferrals: 34,
    };
  };

export const updatePromoterProfile =
  async (payload: Partial<PromoterProfile>) => {
    await delay(300);

    return {
      success: true,
      payload,
    };
  };

/* ======================================================
   ANALYTICS
====================================================== */

export const getAnalytics =
  async (): Promise<DashboardSummary> => {
    await delay(500);

    return {
      stats: {
        totalOrders: 320,
        pendingOrders: 40,
        inProgressOrders: 55,
        completedOrders: 225,
        totalRevenue: 1250000,
        averageOrderValue: 3900,
      },

      breakdown: {
        pending: 40,
        assigned: 25,
        pickedUp: 30,
        enRoute: 15,
        delivered: 225,
      },

      recentOrders: [
        {
          id: "o1",
          items: [
            {
              id: "i1",
              name: "Nike Shoes",
              quantity: 1,
              price: 25000,
            },
          ],
          total: 25000,
          deliveryStatus: "Delivered",
          riderId: "r1",
          pickup: "Lagos Warehouse",
          dropoff: "Victoria Island",
          date: "2026-01-12",
        },
        {
          id: "o2",
          items: [
            {
              id: "i2",
              name: "Apple Watch",
              quantity: 1,
              price: 150000,
            },
          ],
          total: 150000,
          deliveryStatus: "EnRoute",
          riderId: null,
          pickup: "Ikeja Hub",
          dropoff: "Lekki",
          date: "2026-01-13",
        },
      ],
    };
  };

/* ======================================================
   CAMPAIGNS
====================================================== */

export const getCampaigns =
  async (): Promise<Campaign[]> => {
    await delay(500);

    return [
      {
        id: "c1",
        title: "Summer Promo",
        description: "Earn more this summer",
        commissionRate: 10,
        status: "active",
        startDate: "2026-01-01",
        endDate: "2026-06-01",
      },
      {
        id: "c2",
        title: "Winter Deals",
        description: "Hot deals campaign",
        commissionRate: 8,
        status: "paused",
        startDate: "2025-11-01",
        endDate: "2026-02-01",
      },
    ];
  };

export const getCampaignDetails =
  async (id: string): Promise<CampaignDetails> => {
    await delay(400);

    return {
      id,
      title: "Summer Promo",
      description:
        "Earn more commissions with summer sales campaign",
      commissionRate: 10,
      status: "active",
      startDate: "2026-01-01",
      endDate: "2026-06-01",
      totalClicks: 3400,
      totalConversions: 180,
      totalRevenue: 125000,

      products: [
        {
          productId: "pp1",
          title: "Nike Shoes",
          clicks: 500,
          conversions: 30,
          revenue: 45000,
        },
        {
          productId: "pp2",
          title: "Apple Watch",
          clicks: 300,
          conversions: 18,
          revenue: 32000,
        },
      ],
    };
  };  

/* ======================================================
   PRODUCT PERFORMANCE
====================================================== */

export const getProductPerformance =
  async (): Promise<PromoterProductPerformance[]> => {
    await delay(400);

    return [
      {
        id: "pp1",
        productTitle: "Nike Shoes",
        clicks: 500,
        conversions: 30,
        sales: 30,
        revenue: 45000,
        commissionEarned: 7000,
        conversionRate: (30 / 500) * 100,
      },
      {
        id: "pp2",
        productTitle: "Apple Watch",
        clicks: 300,
        conversions: 18,
        sales: 18,
        revenue: 32000,
        commissionEarned: 5000,
        conversionRate: (18 / 300) * 100,
      },
    ];
  };

/* ======================================================
   REFERRALS
====================================================== */

export const getReferrals = async (): Promise<Referral[]> => {
  await delay(300);

  return [
    {
      id: "r1",
      customerName: "Alice",
      joinedAt: "2026-01-10",
      totalOrders: 5,
      totalSpent: 30000,
    },
    {
      id: "r2",
      customerName: "Michael",
      joinedAt: "2026-01-12",
      totalOrders: 3,
      totalSpent: 15000,
    },
  ];
};

export const getReferralStats = async () => {
  await delay(300);

  return {
    totalReferrals: 34,
    activeReferrals: 12,
    totalReferralRevenue: 45000,
    totalEarnings: 45000,
    conversionRate: 3.8,
    clicks: 1400,
    referrals: [
      {
        id: "r1",
        customerName: "Alice",
        joinedAt: "2026-01-10",
        totalOrders: 5,
        totalSpent: 30000,
      },
      {
        id: "r2",
        customerName: "Michael",
        joinedAt: "2026-01-12",
        totalOrders: 3,
        totalSpent: 15000,
      },
    ],
  };
};

/* ======================================================
   COUPONS
====================================================== */

export const getCoupons = async (): Promise<Coupon[]> => {
  await delay(300);

  return [
    {
      id: "cp1",
      code: "SAVE10",
      discount: 10,
      expiresAt: "2026-12-31",
      usageCount: 120,
    },
  ];
};

/* ======================================================
   REWARDS
====================================================== */

export const getRewards = async () => {
  await delay(300);

  return {
    totalPoints: 1200,
    availableRewards: 2,
    redeemed: 1,
    rewards: [
      {
        id: "rw1",
        title: "Bronze Badge",
        pointsRequired: 100,
        image: "",
        available: true,
      },
      {
        id: "rw2",
        title: "Silver Badge",
        pointsRequired: 500,
        image: "",
        available: false,
      },
    ],
  };
};

/* ======================================================
   TRAINING
====================================================== */

export const getTrainingMaterials =
  async (): Promise<TrainingMaterial[]> => {
    await delay(300);

    return [
      {
        id: "t1",
        title: "How to Promote Products",
        description: "Learn the basics of affiliate promotion.",
        videoUrl: "#",
        createdAt: "2026-01-10",
      },
      {
        id: "t2",
        title: "Social Media Conversion Tips",
        description:
          "Increase conversions using social media.",
        documentUrl: "#",
        createdAt: "2026-01-11",
      },
    ];
  };

/* ======================================================
   EARNINGS
====================================================== */

export const getEarnings = async (): Promise<Earnings> => {
  await delay(300);

  return {
    total: 120000,
    pending: 20000,
    withdrawn: 50000,
    available: 50000,
  };
};

export const getEarningsHistory =
  async (): Promise<EarningsHistory[]> => {
    await delay(300);

    return [
      {
        id: "e1",
        type: "credit", // ✅ REQUIRED (FIXED)
        amount: 5000,
        source: "Referral Bonus",
        createdAt: "2026-01-10",
      },
      {
        id: "e2",
        type: "credit", // or "debit" depending on your logic
        amount: 7000,
        source: "Campaign Commission",
        createdAt: "2026-01-12",
      },
    ];
  };

/* ======================================================
   WITHDRAWALS
====================================================== */

export const requestWithdrawal = async (
  payload: WithdrawalPayload
) => {
  await delay(400);

  return {
    success: true,
    message: "Withdrawal requested",
    payload,
  };
};

/* ======================================================
   PAYOUTS
====================================================== */

export const getPayouts = async () => {
  await delay(300);

  return [
    {
      id: "p1",
      amount: 10000,
      status: "completed",
      date: "2026-01-10",
    },
    {
      id: "p2",
      amount: 15000,
      status: "pending",
      date: "2026-01-14",
    },
  ];
};

/* ======================================================
   TRANSACTIONS
====================================================== */

export const getTransactions =
  async (): Promise<Transaction[]> => {
    await delay(300);

    return [
      {
        id: "t1",
        type: "credit",
        amount: 5000,
        description: "Referral bonus",
        createdAt: "2026-01-10",
      },
      {
        id: "t2",
        type: "debit",
        amount: 2000,
        description: "Withdrawal",
        createdAt: "2026-01-11",
      },
    ];
  };

/* ======================================================
   COMMISSIONS
====================================================== */

export const getCommissions =
  async (): Promise<Commission[]> => {
    await delay(300);

    return [
      {
        id: "cm1",
        orderId: "o1",
        productTitle: "Shoes",
        amount: 2000,
        status: "pending",
        createdAt: "2026-01-11",
      },
      {
        id: "cm2",
        orderId: "o2",
        productTitle: "Watch",
        amount: 3500,
        status: "paid",
        createdAt: "2026-01-12",
      },
    ];
  };

/* ======================================================
   NOTIFICATIONS
====================================================== */

export const getNotifications =
  async (): Promise<Notification[]> => {
    await delay(200);

    return [
      {
        id: "n1",
        title: "New Commission",
        message: "You earned ₦2000",
        read: false,
        createdAt: "2026-01-12",
      },
      {
        id: "n2",
        title: "Withdrawal Approved",
        message: "₦15000 payout approved",
        read: true,
        createdAt: "2026-01-13",
      },
    ];
  };

export const markNotificationRead = async (id: string) => {
  await delay(200);

  return {
    success: true,
    id,
  };
};

/* ======================================================
   SUPPORT
====================================================== */

export const createSupportTicket = async (payload: {
  subject: string;
  message: string;
}) => {
  await delay(300);

  return {
    success: true,
    ticket: payload,
  };
};

export const getTickets =
  async (): Promise<SupportTicket[]> => {
    await delay(300);

    return [
      {
        id: "t1",
        subject: "Payment Issue",
        message: "I did not receive payout",
        status: "open",
        createdAt: "2026-01-12",
      },
      {
        id: "t2",
        subject: "Commission Delay",
        message: "Commission pending too long",
        status: "pending",
        createdAt: "2026-01-14",
      },
    ];
  };



