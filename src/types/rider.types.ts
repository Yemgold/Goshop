

// // ===============================
// // RIDER CORE TYPES
// // ===============================

// export type DeliveryStatus =
//   | "Pending"
//   | "Assigned"
//   | "PickedUp"
//   | "EnRoute"
//   | "Delivered";

// export type RiderStatus =
//   | "Offline"
//   | "Online"
//   | "Busy";

// // ===============================
// // ORDER / DELIVERY TYPES
// // ===============================

// export interface OrderItem {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
//   image?: string;
// }

// export interface Order {
//   id: string;
//   items: OrderItem[];
//   total: number;
//   status: string;

//   deliveryStatus: DeliveryStatus;

//   riderId: string | null;

//   pickupAddress?: string;
//   dropoffAddress?: string;

//   customerName?: string;
//   customerPhone?: string;

//   createdAt: string;

//   pickup: string;   // ✅ ADD THIS
//   dropoff: string

//   date: string;
// }

// // ===============================
// // RIDER TYPES
// // ===============================

// export interface Rider {
//   id: string;
//   name: string;
//   phone: string;

//   status: RiderStatus;

//   rating: number;

//   totalTrips: number;
//   totalEarnings: number;

//   currentOrderId?: string | null;
// }

// // ===============================
// // UI / DASHBOARD TYPES
// // ===============================

// export interface RiderStats {
//   trips: number;
//   earnings: number;
//   rating: number;
//   cancellations: number;
// }

// // ===============================
// // DELIVERY ACTION TYPES
// // ===============================

// export type DeliveryAction =
//   | "ACCEPT"
//   | "PICKUP"
//   | "START_TRIP"
//   | "COMPLETE"
//   | "CANCEL";

// // ===============================
// // LOCATION TYPES (future-ready)
// // ===============================

// export interface Location {
//   lat: number;
//   lng: number;
//   address?: string;
// }

// // ===============================
// // API RESPONSE TYPES (optional)
// // ===============================

// export interface ApiResponse<T> {
//   success: boolean;
//   message?: string;
//   data: T;
// }




// export type RiderPartnerDataType={
      
//         vehicleType: string;
//         licenseNumber: string;
//         bankName: string;
//         accountNumber: string;
//         accountName: string;
//     }


//  //.................................................




 // ======================================================
// CORE ENUMS
// ======================================================

export type DeliveryStatus =
  | "Pending"
  | "Assigned"
  | "PickedUp"
  | "EnRoute"
  | "Delivered"
  | "Cancelled";

export type RiderStatus =
  | "Offline"
  | "Online"
  | "Busy";

export type DeliveryAction =
  | "ACCEPT"
  | "PICKUP"
  | "START_TRIP"
  | "COMPLETE"
  | "CANCEL";

export type RiderJobStatus =
  | "pending"
  | "accepted"
  | "in_transit"
  | "delivered"
  | "cancelled";

// ======================================================
// CORE ORDER SYSTEM (SOURCE OF TRUTH)
// ======================================================

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;

  items: OrderItem[];

  total: number;

  status: string;

  deliveryStatus: DeliveryStatus;

  riderId: string | null;

  pickup: string;

  dropoff: string;

  pickupAddress?: string;

  dropoffAddress?: string;

  customerName?: string;

  customerPhone?: string;

  createdAt: string;
}

// ======================================================
// RIDER CORE ENTITY
// ======================================================

export interface Rider {
  id: string;
  name: string;
  phone: string;

  status: RiderStatus;

  rating: number;

  totalTrips: number;

  totalEarnings: number;

  currentOrderId?: string | null;
}

// ======================================================
// UI / DASHBOARD STATS
// ======================================================

export interface RiderStats {
  trips: number;
  earnings: number;
  rating: number;
  cancellations: number;
}

// ======================================================
// LOCATION (FUTURE MAP READY)
// ======================================================

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

// ======================================================
// RIDER JOBS (UI VIEW MODEL)
// ======================================================

export interface RiderJob {
  id: string;

  pickup: string;

  dropoff: string;

  distance: number;

  fee: number;

  status: RiderJobStatus;
}

// ======================================================
// ACTIVE DELIVERY
// ======================================================

export interface RiderActiveJob {
  id: string;

  pickup: string;

  dropoff: string;

  status: string;

  eta: string;
}

// ======================================================
// HISTORY
// ======================================================

export interface RiderHistoryItem {
  id: string;

  pickup: string;

  dropoff: string;

  date: string;

  fee: number;

  status: "delivered" | "cancelled";
}

// ======================================================
// ANALYTICS
// ======================================================

export interface RiderAnalytics {
  totalDeliveries: number;

  completed: number;

  cancelled: number;

  acceptanceRate: number;

  earnings: number;

  earningsChart: {
    day: string;
    value: number;
  }[];
}

// ======================================================
// FINANCIAL SYSTEM
// ======================================================

export interface RiderEarnings {
  total: number;

  chart: {
    day: string;
    amount: number;
  }[];
}

export interface RiderPayout {
  id: string;

  amount: number;

  status: "pending" | "completed" | "failed";

  date: string;
}

export interface RiderTransaction {
  id: string;

  type: "earnings" | "payout" | "adjustment";

  amount: number;

  date: string;
}

// ======================================================
// ZONES
// ======================================================

export interface RiderZone {
  id: string;

  name: string;

  active: boolean;
}

// ======================================================
// RATINGS
// ======================================================

export interface RiderRatings {
  average: number;

  totalReviews: number;

  breakdown: {
    stars: number;
    count: number;
  }[];
}

// ======================================================
// VEHICLE
// ======================================================

export interface RiderVehicle {
  type: string;

  model: string;

  plateNumber: string;

  verified: boolean;
}

// ======================================================
// SETTINGS
// ======================================================

export interface RiderSettings {
  availability: boolean;

  notifications: boolean;

  language: string;
}

// ======================================================
// SUPPORT
// ======================================================

export interface RiderSupportTicket {
  id: string;

  subject: string;

  status: "open" | "closed";
}

// ======================================================
// PARTNER / BANK INFO
// ======================================================

export interface RiderPartnerDataType {
  vehicleType: string;

  licenseNumber: string;

  bankName: string;

  accountNumber: string;

  accountName: string;
}

// ======================================================
// GENERIC API RESPONSE WRAPPER
// ======================================================

export interface ApiResponse<T> {
  success: boolean;

  message?: string;

  data: T;
}