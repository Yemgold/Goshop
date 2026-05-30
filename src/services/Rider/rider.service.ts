

import type {
  Order,
  DeliveryStatus,
  RiderAnalytics,
  RiderActiveJob,
  RiderHistoryItem,
  RiderEarnings,
  RiderPayout,
  RiderTransaction,
  RiderZone,
  RiderRatings,
  RiderVehicle,
  RiderSettings,
  RiderSupportTicket,
} from "../../types/rider.types";

/* =========================================================
   RIDER ANALYTICS
========================================================= */

export const getRiderAnalytics =
  async (): Promise<RiderAnalytics> => {
    return {
      totalDeliveries: 120,

      completed: 110,

      cancelled: 10,

      acceptanceRate: 92,

      earnings: 450000,

      earningsChart: [
        {
          day: "Mon",
          value: 12000,
        },
        {
          day: "Tue",
          value: 18000,
        },
        {
          day: "Wed",
          value: 15000,
        },
        {
          day: "Thu",
          value: 22000,
        },
        {
          day: "Fri",
          value: 30000,
        },
        {
          day: "Sat",
          value: 40000,
        },
        {
          day: "Sun",
          value: 25000,
        },
      ],
    };
  };

/* =========================================================
   RIDER JOBS
========================================================= */

export const getRiderJobs =
  async (): Promise<Order[]> => {
    return [
      {
        id: "ORD-1001",

        items: [
          {
            id: "ITEM-1",
            name: "Nike Sneakers",
            quantity: 1,
            price: 5000,
          },
        ],

        total: 5000,

        status: "paid",

        deliveryStatus: "Pending",

        riderId: null,

        pickup: "Shoprite Ikeja",

        dropoff: "Lekki Phase 1",

        pickupAddress:
          "12 Allen Avenue, Ikeja, Lagos",

        dropoffAddress:
          "Lekki Phase 1, Lagos",

        customerName: "John Doe",

        customerPhone: "+2348012345678",

        createdAt: "2026-05-17T10:00:00Z",
      },

      {
        id: "ORD-1002",

        items: [
          {
            id: "ITEM-2",
            name: "Phone Charger",
            quantity: 2,
            price: 3500,
          },
        ],

        total: 7000,

        status: "paid",

        deliveryStatus: "Assigned",

        riderId: "RIDER-1",

        pickup: "Computer Village",

        dropoff: "Yaba",

        pickupAddress:
          "Computer Village, Ikeja",

        dropoffAddress:
          "Yaba, Lagos",

        customerName: "Sarah James",

        customerPhone: "+2348098765432",

        createdAt: "2026-05-17T11:30:00Z",
      },
    ];
  };

/* =========================================================
   ACCEPT RIDER JOB
========================================================= */

export const acceptRiderJob =
  async (
    orderId: string
  ): Promise<{
    success: boolean;
    message: string;
    orderId: string;
  }> => {
    return {
      success: true,

      message: "Job accepted successfully",

      orderId,
    };
  };

/* =========================================================
   UPDATE RIDER JOB STATUS
========================================================= */

export const updateRiderJobStatus =
  async (
    orderId: string,
    status: DeliveryStatus
  ): Promise<{
    success: boolean;
    message: string;
    orderId: string;
    status: DeliveryStatus;
  }> => {
    return {
      success: true,

      message: "Delivery status updated",

      orderId,

      status,
    };
  };

/* =========================================================
   ACTIVE RIDER JOB
========================================================= */

export const getRiderActiveJob =
  async (): Promise<RiderActiveJob | null> => {
    return {
      id: "ORD-1002",

      pickup: "Computer Village",

      dropoff: "Yaba",

      status: "in_transit",

      eta: "15 mins",
    };
  };

/* =========================================================
   RIDER HISTORY
========================================================= */

export const getRiderHistory =
  async (): Promise<RiderHistoryItem[]> => {
    return [
      {
        id: "HIS-1001",

        pickup: "Ikeja",

        dropoff: "Lekki",

        date: "2026-05-10",

        fee: 2500,

        status: "delivered",
      },

      {
        id: "HIS-1002",

        pickup: "Yaba",

        dropoff: "Ajah",

        date: "2026-05-12",

        fee: 1800,

        status: "cancelled",
      },
    ];
  };

/* =========================================================
   RIDER EARNINGS
========================================================= */

export const getRiderEarnings =
  async (): Promise<RiderEarnings> => {
    return {
      total: 250000,

      chart: [
        {
          day: "Mon",
          amount: 12000,
        },
        {
          day: "Tue",
          amount: 18000,
        },
        {
          day: "Wed",
          amount: 14000,
        },
        {
          day: "Thu",
          amount: 20000,
        },
        {
          day: "Fri",
          amount: 25000,
        },
      ],
    };
  };

/* =========================================================
   RIDER PAYOUTS
========================================================= */

export const getRiderPayouts =
  async (): Promise<RiderPayout[]> => {
    return [
      {
        id: "PAY-1001",

        amount: 45000,

        status: "completed",

        date: "2026-05-01",
      },

      {
        id: "PAY-1002",

        amount: 30000,

        status: "pending",

        date: "2026-05-15",
      },
    ];
  };

/* =========================================================
   RIDER TRANSACTIONS
========================================================= */

export const getRiderTransactions =
  async (): Promise<RiderTransaction[]> => {
    return [
      {
        id: "TXN-1001",

        type: "earnings",

        amount: 5000,

        date: "2026-05-01",
      },

      {
        id: "TXN-1002",

        type: "payout",

        amount: -20000,

        date: "2026-05-02",
      },
    ];
  };

/* =========================================================
   RIDER DELIVERY ZONES
========================================================= */

export const getRiderZones =
  async (): Promise<RiderZone[]> => {
    return [
      {
        id: "ZONE-1",

        name: "Lagos Mainland",

        active: true,
      },

      {
        id: "ZONE-2",

        name: "Lekki",

        active: true,
      },

      {
        id: "ZONE-3",

        name: "Ikorodu",

        active: false,
      },
    ];
  };

/* =========================================================
   RIDER RATINGS
========================================================= */

export const getRiderRatings =
  async (): Promise<RiderRatings> => {
    return {
      average: 4.8,

      totalReviews: 230,

      breakdown: [
        {
          stars: 5,
          count: 180,
        },

        {
          stars: 4,
          count: 35,
        },

        {
          stars: 3,
          count: 10,
        },

        {
          stars: 2,
          count: 3,
        },

        {
          stars: 1,
          count: 2,
        },
      ],
    };
  };

/* =========================================================
   RIDER VEHICLE
========================================================= */

export const getRiderVehicle =
  async (): Promise<RiderVehicle> => {
    return {
      type: "Bike",

      model: "Honda CG 125",

      plateNumber: "LAG-123-XY",

      verified: true,
    };
  };

/* =========================================================
   RIDER SETTINGS
========================================================= */

export const getRiderSettings =
  async (): Promise<RiderSettings> => {
    return {
      availability: true,

      notifications: true,

      language: "en",
    };
  };

/* =========================================================
   RIDER SUPPORT TICKETS
========================================================= */

export const getRiderSupportTickets =
  async (): Promise<
    RiderSupportTicket[]
  > => {
    return [
      {
        id: "SUP-1001",

        subject: "Delayed payout",

        status: "open",
      },

      {
        id: "SUP-1002",

        subject: "Customer unreachable",

        status: "closed",
      },
    ];
  };