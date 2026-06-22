





import type { ShippingVendor } from "./shipping.engine";

/* ================= TYPES ================= */

export type DeliveryRate = {
  buyerState: string;
  buyerTown?: string;
  nearestBusStop?: string;

  weightRanges: {
    min: number;
    max: number | null;
    price: number;
  }[];
};

export type DeliveryVendor = {
  businessId: string;
  businessState: string;

  totalWeight: number;

  // Pack Center → Customer Home
  deliveryFee: number;
};

export type DeliverySummary = {
  vendors: DeliveryVendor[];

  deliveryFeeSummation: number;
};

/* ================= HELPERS ================= */

const findWeightPrice = (
  weightRanges: any[] = [],
  weight: number
): number => {
  const range = weightRanges.find(
    (w) =>
      weight >= w.min &&
      (w.max === null || weight <= w.max)
  );

  return range?.price || 0;
};

/* ================= ENGINE ================= */

export const calculateDeliveryFee = (
  vendors: ShippingVendor[],
  buyerState: string,
  deliveryRates: DeliveryRate[],
  deliveryMode: "homeDelivery" | "pickUpFromOurNearestOffice"
): DeliverySummary => {
  // Pickup customers pay no delivery fee
  if (deliveryMode === "pickUpFromOurNearestOffice") {
    return {
      vendors: [],
      deliveryFeeSummation: 0,
    };
  }

  const stateRate = deliveryRates.find(
    (rate) =>
      rate.buyerState?.trim().toLowerCase() ===
      buyerState?.trim().toLowerCase()
  );

  if (!stateRate) {
    return {
      vendors: [],
      deliveryFeeSummation: 0,
    };
  }

  const deliveryVendors: DeliveryVendor[] = [];

  let deliveryFeeSummation = 0;

  for (const vendor of vendors) {
    const deliveryFee = findWeightPrice(
      stateRate.weightRanges,
      vendor.totalWeight
    );

    deliveryVendors.push({
      businessId: vendor.businessId,
      businessState: vendor.businessState,
      totalWeight: vendor.totalWeight,
      deliveryFee,
    });

    deliveryFeeSummation += deliveryFee;
  }

  return {
    vendors: deliveryVendors,
    deliveryFeeSummation,
  };
};