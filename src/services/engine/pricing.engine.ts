

import type { ShippingSummary } from "./shipping.engine";
import type { DeliverySummary } from "./delivery.engine";
import type { CollectionFeeResponse } from "./collectionFee.engine";

/* ================= TYPES ================= */

export type PricingSummary = {
  subtotal: number;

  shippingFee: number;
  deliveryFee: number;
  collectionFee: number;

  grandTotal: number;
};

/* ================= ENGINE ================= */

export const calculatePricing = ({
  subtotal,
  shipping,
  delivery,
  collection,
}: {
  subtotal: number;
  shipping: ShippingSummary;
  delivery: DeliverySummary;
  collection: CollectionFeeResponse;
}): PricingSummary => {
  const shippingFee =
    shipping.shippingFeeSummation || 0;

  const deliveryFee =
    delivery.deliveryFeeSummation || 0;

  const collectionFee =
    collection.totalFee || 0;

  const grandTotal =
    subtotal +
    shippingFee +
    deliveryFee +
    collectionFee;

  return {
    subtotal,

    shippingFee,
    deliveryFee,
    collectionFee,

    grandTotal,
  };
};