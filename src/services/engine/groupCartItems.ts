


import type { EnrichedCartItem } from "../../mappers/cart.mapper";

const normalizeId = (id: any) => String(id ?? "").trim();

export const groupCartItems = (items: EnrichedCartItem[]) => {
  const grouped = new Map<string, any>();

  console.log("========== CART ITEMS ==========");

  items.forEach((item: any) => {
   console.log({
  productId: item.productId,
  businessId: item.businessId,
  name: item.name,
  vendorState: item.vendorState,
});
  });

  for (const item of items || []) {
    const productId = normalizeId(item.productId);

    if (!productId) {
      console.error("Missing productId:", item);
      continue;
    }

    if (!item.businessId) {
      console.error("Missing businessId:", item);
      continue;
    }

    const weight = Number(item.weight ?? 1);

    const resolvedState =
      item.vendorState?.trim?.() || "UNKNOWN";

    let vendor = grouped.get(item.businessId);

    if (!vendor) {
      vendor = {
        businessId: item.businessId,
        businessState: resolvedState,
        items: [],
        subtotal: 0,
        totalWeight: 0,
        shippingFee: 0,
        deliveryFee: 0,
      };

      grouped.set(item.businessId, vendor);
    }

    vendor.items.push({
      ...item,
      shippingRates: item.shippingRates || [],
    });

    vendor.subtotal +=
      Number(item.price || 0) *
      Number(item.quantity || 0);

    vendor.totalWeight +=
      weight *
      Number(item.quantity || 0);
  }

  const vendors = Array.from(grouped.values());

  console.log("Grouped Vendors");

  console.table(
    vendors.map((v) => ({
      businessId: v.businessId,
      state: v.businessState,
      items: v.items.length,
      subtotal: v.subtotal,
      totalWeight: v.totalWeight,
    }))
  );

  return vendors;
};