

import { useMemo } from "react";
import { calculateShipping } from "../../services/shipping.engine";

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

  /* ================= SHIPPING ================= */
  const shipping = useMemo(() => {
    if (!form.selectedState || !form.deliveryMode) {
      return {
        vendors: [],
        shippingFeeSummation: 0,
        deliveryFeeSummation: 0,
        totalShipping: 0,
        totalWeight: 0,
      };
    }

    return calculateShipping(
      cartItems,
      products,
      form.selectedState,
      deliveryRates,
      form.deliveryMode
    );
  }, [cartItems, products, form.selectedState, form.deliveryMode, deliveryRates]);

  const vendorsWithShipping = useMemo(
    () => shipping?.vendors || [],
    [shipping]
  );

  /* ================= COLLECTION FEE ================= */
  const collectionFee = useMemo(() => {
    if (!collectionFeeResponse) return 0;

    const baseFee = collectionFeeResponse.baseFee || 0;
    const additionalFee = collectionFeeResponse.additionalFee || 0;

    const buyerState = form.selectedState?.trim().toLowerCase();

    const interstateVendorCount = vendorsWithShipping.filter(
      (vendor: any) =>
        vendor.businessState?.trim().toLowerCase() !== buyerState
    ).length;

    if (interstateVendorCount === 0) return 0;

    return baseFee + Math.max(0, interstateVendorCount - 1) * additionalFee;
  }, [collectionFeeResponse, vendorsWithShipping, form.selectedState]);

  /* ================= SUBTOTAL ================= */
  const subtotal = cart?.total || 0;

  /* ================= GRAND TOTAL ================= */
  const grandTotal =
    subtotal +
    (shipping.shippingFeeSummation || 0) +
    (shipping.deliveryFeeSummation || 0) +
    (collectionFee || 0);

  return {
    cartItems,
    shipping,
    vendorsWithShipping,
    collectionFee,
    subtotal,
    grandTotal,
  };
}