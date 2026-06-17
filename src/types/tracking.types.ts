

/* ================= TRACKING ================= */

export interface TrackingOrder {
  id: string;

  status: string;

  deliveryStatus: string;

  estimatedDelivery: string;

  timeline: {
    step: string;
    completed: boolean;
    time?: string;
  }[];

  rider?: {
    id: string;
    name: string;
    phone: string;
    vehicle: string;
  };
}