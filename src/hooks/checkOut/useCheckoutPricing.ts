

// USING ONLY CART ITEM AS source of truth

import { useMemo } from "react";
import { calculateShipping } from "../../services/engine/shipping.engine";

export function useCheckoutPricing({
  cart,
  products,
  form,
  deliveryRates,
  collectionFeeResponse,
}: any) {

  /* ================= CART ITEMS ================= */
  const cartItems = useMemo(() => {
    return (cart?.vendors || []).flatMap((v: any) => v.items || []);
  }, [cart]);

  const selectedState = form?.selectedState?.trim();
  const deliveryMode = form?.deliveryMode || "homeDelivery";

  const canCalculateShipping = Boolean(selectedState && deliveryMode);

  /* ================= SHIPPING ================= */

  const emptyShipping = {
  vendors: [],
  shippingFeeSummation: 0,
  deliveryFeeSummation: 0,
  totalShipping: 0,
  totalWeight: 0,
};

  const shipping = useMemo(() => {
    if (!canCalculateShipping) {
      return emptyShipping; 
    }

    return calculateShipping(
      cartItems,
      products,
      selectedState,
      deliveryRates,
      deliveryMode
    );
  }, [
    cartItems,
    products,
    selectedState,
    deliveryRates,
    deliveryMode,
    canCalculateShipping,
  ]);

  const vendorsWithShipping = useMemo(() => {
    return shipping?.vendors || [];
  }, [shipping]);

  /* ================= COLLECTION FEE ================= */
  const collectionFee = useMemo(() => {

    console.log("BUYER STATE:", selectedState);

vendorsWithShipping.forEach((v: any) => {
  console.log("VENDOR STATE:", v.businessState);
});


    if (!collectionFeeResponse || !selectedState) return 0;

    const baseFee = collectionFeeResponse.baseFee || 0;
    const additionalFee = collectionFeeResponse.additionalFee || 0;

    const buyerState = selectedState.toLowerCase();

    const interstateVendorCount = vendorsWithShipping.filter(
      (v: any) =>
        (v.businessState || "").toLowerCase() !== buyerState
    ).length;

    if (interstateVendorCount === 0) return 0;

    return (
      baseFee +
      Math.max(0, interstateVendorCount - 1) * additionalFee
    );
  }, [
    collectionFeeResponse,
    vendorsWithShipping,
    selectedState,
  ]);

  /* ================= SUBTOTAL ================= */
  const subtotal = cart?.total || 0;

  /* ================= GRAND TOTAL ================= */
  const grandTotal = useMemo(() => {
    return (
      subtotal +
      (shipping?.shippingFeeSummation || 0) +
      (shipping?.deliveryFeeSummation || 0) +
      (collectionFee || 0)
    );
  }, [subtotal, shipping, collectionFee]);

  return {
    cartItems,
    shipping,
    vendorsWithShipping,
    collectionFee,
    subtotal,
    grandTotal,
  };
}