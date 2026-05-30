

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// import {createSupportTicket,getAnalytics,
//   getCampaignDetails,
//   getCampaigns,
//   getCommissions,
//   getCoupons,
//   getEarnings,
//   getEarningsHistory,
//   getNotifications,
//   getPayouts,
//   getProductPerformance,
//   getPromoterProfile,
//   getReferralStats,
//   getReferrals,
//   getRewards,
//   getTickets,
//   getTransactions,
//   getTrainingMaterials,
//   markNotificationRead,
//   requestWithdrawal,
//   updatePromoterProfile, } from "../../services/promoter/promoter.api.service";



import {createSupportTicket,getAnalytics,
  getCampaignDetails,
  getCampaigns,
  getCommissions,
  getCoupons,
  getEarnings,
  getEarningsHistory,
  getNotifications,
  getPayouts,
  getProductPerformance,
  getPromoterProfile,
  getReferralStats,
  getReferrals,
  getRewards,
  getTickets,
  getTransactions,
  getTrainingMaterials,
  markNotificationRead,
  requestWithdrawal,
  updatePromoterProfile, } from "../../services/promoter/promoter.mock.service"; 






/* ======================================================
   PROFILE
====================================================== */

export const usePromoterProfile = () => {
  return useQuery({
    queryKey: ["promoter-profile"],
    queryFn: getPromoterProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePromoterProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["promoter-profile"],
      });
    },
  });
};

/* ======================================================
   ANALYTICS
====================================================== */

export const useAnalytics = () => {
  return useQuery({
    queryKey: ["promoter-analytics"],
    queryFn: getAnalytics,
  });
};

/* ======================================================
   CAMPAIGNS
====================================================== */

export const useCampaigns = () => {
  return useQuery({
    queryKey: ["promoter-campaigns"],
    queryFn: getCampaigns,
  });
};

export const useCampaignDetails = (
  id: string,
  options?: any
) => {
  return useQuery({
    queryKey: ["campaign-details", id],
    queryFn: () => getCampaignDetails(id),
    enabled: !!id,
    ...options,
  });
};

/* ======================================================
   PRODUCT PERFORMANCE
====================================================== */

export const useProductPerformance =
  () => {
    return useQuery({
      queryKey: [
        "promoter-product-performance",
      ],

      queryFn:
        getProductPerformance,
    });
  };

/* ======================================================
   REFERRALS
====================================================== */

export const useReferrals = () => {
  return useQuery({
    queryKey: ["promoter-referrals"],
    queryFn: getReferrals,
  });
};

export const useReferralStats =
  () => {
    return useQuery({
      queryKey: [
        "promoter-referral-stats",
      ],

      queryFn: getReferralStats,
    });
  };

/* ======================================================
   COUPONS
====================================================== */

export const useCoupons = () => {
  return useQuery({
    queryKey: ["promoter-coupons"],
    queryFn: getCoupons,
  });
};

/* ======================================================
   TRAINING
====================================================== */

export const useTrainingMaterials =
  () => {
    return useQuery({
      queryKey: [
        "promoter-training",
      ],

      queryFn:
        getTrainingMaterials,
    });
  };

/* ======================================================
   REWARDS
====================================================== */

export const useRewards = () => {
  return useQuery({
    queryKey: ["promoter-rewards"],
    queryFn: getRewards,
  });
};

/* ======================================================
   EARNINGS
====================================================== */

export const useEarnings = () => {
  return useQuery({
    queryKey: ["promoter-earnings"],
    queryFn: getEarnings,
  });
};

export const useEarningsHistory =
  () => {
    return useQuery({
      queryKey: [
        "promoter-earnings-history",
      ],

      queryFn:
        getEarningsHistory,
    });
  };

/* ======================================================
   WITHDRAWALS
====================================================== */

export const useWithdrawal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestWithdrawal,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "promoter-earnings",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "promoter-transactions",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "promoter-payouts",
        ],
      });
    },
  });
};

/* ======================================================
   PAYOUTS
====================================================== */

export const usePayouts = () => {
  return useQuery({
    queryKey: ["promoter-payouts"],
    queryFn: getPayouts,
  });
};

/* ======================================================
   TRANSACTIONS
====================================================== */

export const useTransactions =
  () => {
    return useQuery({
      queryKey: [
        "promoter-transactions",
      ],

      queryFn: getTransactions,
    });
  };

/* ======================================================
   COMMISSIONS
====================================================== */

export const useCommissions =
  () => {
    return useQuery({
      queryKey: [
        "promoter-commissions",
      ],

      queryFn: getCommissions,
    });
  };

/* ======================================================
   NOTIFICATIONS
====================================================== */

export const useNotifications =
  () => {
    return useQuery({
      queryKey: [
        "promoter-notifications",
      ],

      queryFn: getNotifications,
    });
  };

export const useReadNotification =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        markNotificationRead,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "promoter-notifications",
          ],
        });
      },
    });
  };

/* ======================================================
   SUPPORT / TICKETS
====================================================== */

export const useCreateTicket =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createSupportTicket,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            "promoter-tickets",
          ],
        });
      },
    });
  };

export const useTickets = () => {
  return useQuery({
    queryKey: ["promoter-tickets"],
    queryFn: getTickets,
  });
};