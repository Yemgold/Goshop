

// ===============================
// RIDER CORE TYPES
// ===============================

export type DeliveryStatus =
  | "Pending"
  | "Assigned"
  | "PickedUp"
  | "EnRoute"
  | "Delivered";

export type RiderStatus =
  | "Offline"
  | "Online"
  | "Busy";

// ===============================
// ORDER / DELIVERY TYPES
// ===============================

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

  pickupAddress?: string;
  dropoffAddress?: string;

  customerName?: string;
  customerPhone?: string;

  createdAt: string;

  pickup: string;   // ✅ ADD THIS
  dropoff: string

  date: string;
}

// ===============================
// RIDER TYPES
// ===============================

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

// ===============================
// UI / DASHBOARD TYPES
// ===============================

export interface RiderStats {
  trips: number;
  earnings: number;
  rating: number;
  cancellations: number;
}

// ===============================
// DELIVERY ACTION TYPES
// ===============================

export type DeliveryAction =
  | "ACCEPT"
  | "PICKUP"
  | "START_TRIP"
  | "COMPLETE"
  | "CANCEL";

// ===============================
// LOCATION TYPES (future-ready)
// ===============================

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

// ===============================
// API RESPONSE TYPES (optional)
// ===============================

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}