import apiClient from "../../api";

/* ================= PROFILE ================= */
export const getPromoterProfile = async () => {
  const { data } = await apiClient.get("/promoter/profile");
  return data;
};

export const updatePromoterProfile = async (payload: any) => {
  const { data } = await apiClient.put("/promoter/profile", payload);
  return data;
};

/* ================= ANALYTICS ================= */
export const getAnalytics = async () => {
  const { data } = await apiClient.get("/promoter/analytics");
  return data;
};

/* ================= CAMPAIGNS ================= */
export const getCampaigns = async () => {
  const { data } = await apiClient.get("/promoter/campaigns");
  return data;
};

export const getCampaignDetails = async (id: string) => {
  const { data } = await apiClient.get(`/promoter/campaigns/${id}`);
  return data;
};

/* ================= PRODUCT PERFORMANCE ================= */
export const getProductPerformance = async () => {
  const { data } = await apiClient.get("/promoter/product-performance");
  return data;
};

/* ================= REFERRALS ================= */
export const getReferrals = async () => {
  const { data } = await apiClient.get("/promoter/referrals");
  return data;
};

export const getReferralStats = async () => {
  const { data } = await apiClient.get("/promoter/referral-stats");
  return data;
};

/* ================= COUPONS ================= */
export const getCoupons = async () => {
  const { data } = await apiClient.get("/promoter/coupons");
  return data;
};

/* ================= TRAINING ================= */
export const getTrainingMaterials = async () => {
  const { data } = await apiClient.get("/promoter/training");
  return data;
};

/* ================= REWARDS ================= */
export const getRewards = async () => {
  const { data } = await apiClient.get("/promoter/rewards");
  return data;
};

/* ================= EARNINGS ================= */
export const getEarnings = async () => {
  const { data } = await apiClient.get("/promoter/earnings");
  return data;
};

export const getEarningsHistory = async () => {
  const { data } = await apiClient.get("/promoter/earnings-history");
  return data;
};

/* ================= WITHDRAWALS ================= */
export const requestWithdrawal = async (payload: any) => {
  const { data } = await apiClient.post("/promoter/withdrawals", payload);
  return data;
};

/* ================= PAYOUTS ================= */
export const getPayouts = async () => {
  const { data } = await apiClient.get("/promoter/payouts");
  return data;
};

/* ================= TRANSACTIONS ================= */
export const getTransactions = async () => {
  const { data } = await apiClient.get("/promoter/transactions");
  return data;
};

/* ================= COMMISSIONS ================= */
export const getCommissions = async () => {
  const { data } = await apiClient.get("/promoter/commissions");
  return data;
};

/* ================= NOTIFICATIONS ================= */
export const getNotifications = async () => {
  const { data } = await apiClient.get("/promoter/notifications");
  return data;
};

export const markNotificationRead = async (id: string) => {
  const { data } = await apiClient.patch(
    `/promoter/notifications/${id}`
  );
  return data;
};

/* ================= SUPPORT ================= */
export const createSupportTicket = async (payload: any) => {
  const { data } = await apiClient.post("/promoter/support", payload);
  return data;
};

export const getTickets = async () => {
  const { data } = await apiClient.get("/promoter/tickets");
  return data;
};




// import apiClient from "../../api";

// import type {
//   Analytics,
//   Campaign,
//   CampaignDetails,
//   Coupon,
//   Earnings,
//   EarningsHistory,
//   Notification,
//   ProductPerformance,
//   PromoterProfile,
//   Referral,
//   ReferralStats,
//   Reward,
//   TrainingMaterial,
//   WithdrawalPayload,
//   UpdatePromoterProfilePayload,
//   CreateTicketPayload,
//   SupportTicket,
//   Transaction,
//   Commission,
// } from "../../types/promoter.types";

// /* ================= PROFILE ================= */

// export const getPromoterProfile = async () => {
//   const { data } =
//     await apiClient.get<PromoterProfile>(
//       "/promoter/profile"
//     );

//   return data;
// };

// export const updatePromoterProfile = async (
//   payload: UpdatePromoterProfilePayload
// ) => {
//   const { data } = await apiClient.put(
//     "/promoter/profile",
//     payload
//   );

//   return data;
// };

// /* ================= ANALYTICS ================= */

// export const getAnalytics = async () => {
//   const { data } =
//     await apiClient.get<Analytics>(
//       "/promoter/analytics"
//     );

//   return data;
// };

// /* ================= CAMPAIGNS ================= */

// export const getCampaigns = async () => {
//   const { data } = await apiClient.get<
//     Campaign[]
//   >("/promoter/campaigns");

//   return data;
// };

// export const getCampaignDetails = async (
//   id: string
// ) => {
//   const { data } =
//     await apiClient.get<CampaignDetails>(
//       `/promoter/campaign-details/${id}`
//     );

//   return data;
// };

// /* ================= PRODUCT PERFORMANCE ================= */

// export const getProductPerformance =
//   async () => {
//     const { data } = await apiClient.get<
//       ProductPerformance[]
//     >("/promoter/product-performance");

//     return data;
//   };

// /* ================= REFERRALS ================= */

// export const getReferrals = async () => {
//   const { data } = await apiClient.get<
//     Referral[]
//   >("/promoter/referrals");

//   return data;
// };

// export const getReferralStats =
//   async () => {
//     const { data } =
//       await apiClient.get<ReferralStats>(
//         "/promoter/referral-stats"
//       );

//     return data;
//   };

// /* ================= COUPONS ================= */

// export const getCoupons = async () => {
//   const { data } = await apiClient.get<
//     Coupon[]
//   >("/promoter/coupons");

//   return data;
// };

// /* ================= TRAINING ================= */

// export const getTrainingMaterials =
//   async () => {
//     const { data } = await apiClient.get<
//       TrainingMaterial[]
//     >("/promoter/training");

//     return data;
//   };

// /* ================= REWARDS ================= */

// export const getRewards = async () => {
//   const { data } = await apiClient.get<
//     Reward[]
//   >("/promoter/rewards");

//   return data;
// };

// /* ================= EARNINGS ================= */

// export const getEarnings = async () => {
//   const { data } =
//     await apiClient.get<Earnings>(
//       "/promoter/earnings"
//     );

//   return data;
// };

// export const getEarningsHistory =
//   async () => {
//     const { data } = await apiClient.get<
//       EarningsHistory[]
//     >("/promoter/earnings-history");

//     return data;
//   };

// /* ================= WITHDRAWALS ================= */

// export const requestWithdrawal =
//   async (
//     payload: WithdrawalPayload
//   ) => {
//     const { data } = await apiClient.post(
//       "/promoter/withdrawals",
//       payload
//     );

//     return data;
//   };

// /* ================= PAYOUTS ================= */

// export const getPayouts = async () => {
//   const { data } = await apiClient.get(
//     "/promoter/payouts"
//   );

//   return data;
// };

// /* ================= TRANSACTIONS ================= */

// export const getTransactions =
//   async () => {
//     const { data } =
//       await apiClient.get<Transaction[]>(
//         "/promoter/transactions"
//       );

//     return data;
//   };

// /* ================= COMMISSIONS ================= */

// export const getCommissions =
//   async () => {
//     const { data } =
//       await apiClient.get<Commission[]>(
//         "/promoter/commissions"
//       );

//     return data;
//   };

// /* ================= NOTIFICATIONS ================= */

// export const getNotifications =
//   async () => {
//     const { data } =
//       await apiClient.get<Notification[]>(
//         "/promoter/notifications"
//       );

//     return data;
//   };

// export const markNotificationRead =
//   async (id: string) => {
//     const { data } =
//       await apiClient.patch(
//         `/promoter/notifications/${id}`
//       );

//     return data;
//   };

// /* ================= SUPPORT ================= */

// export const createSupportTicket =
//   async (
//     payload: CreateTicketPayload
//   ) => {
//     const { data } = await apiClient.post(
//       "/promoter/support",
//       payload
//     );

//     return data;
//   };

// export const getTickets = async () => {
//   const { data } = await apiClient.get<
//     SupportTicket[]
//   >("/promoter/tickets");

//   return data;
// };