

import type { EnrichedCartItem } from "../../mappers/cart.mapper";
import type { Product } from "../../types";

const normalizeId = (id: any) => String(id ?? "").trim();

export const groupCartItems = (
  items: EnrichedCartItem[],
  products: Product[]
) => {
  const productMap = new Map<string, Product>();

  for (const p of products || []) {
    const id = normalizeId((p as any)._id || (p as any).id);
    if (id) productMap.set(id, p);
  }

  const grouped = new Map<string, any>();

  for (const item of items || []) {
    const product = productMap.get(normalizeId(item.productId));
    if (!product || !item.businessId) continue;

    const weight = Number((product as any)?.weight ?? 1);

    const cartState = (item as any)?.vendorState?.trim?.() || "";
    const productState =
      (product as any)?.business?.businessAddress?.state?.trim?.() || "";

    const resolvedState = cartState || productState || "UNKNOWN";

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

    vendor.items.push(item);
    vendor.subtotal += Number(item.price || 0) * Number(item.quantity || 0);
    vendor.totalWeight += weight * Number(item.quantity || 0);
  }

  return Array.from(grouped.values());
};