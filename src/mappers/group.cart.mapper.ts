

export function groupCartByVendor(items: any[] = []) {
  if (!Array.isArray(items)) return [];

  const grouped: Record<string, any> = {};

  for (const item of items) {
    if (!item?.productId) continue;

    const businessId = item.businessId;

    if (!businessId) {
      console.warn("Cart item missing businessId", item);
      continue;
    }

    const quantity = Math.max(1, Number(item.quantity ?? 1));

    const price = Number(item.price ?? 0);

    const weight = Number(item.weight ?? 0);

    const title = item.name || "Unknown Product";

    const image =
      item.media?.find(
        (m: any) => m?.type === "image" && m?.url
      )?.url ||
      item.media?.[0]?.url ||
      item.image ||
      "/placeholder.png";

    if (!grouped[businessId]) {
      grouped[businessId] = {
        businessId,

        businessState:
          item.vendorState ||
          "",

        items: [],

        subtotal: 0,

        totalWeight: 0,
      };
    }

   grouped[businessId].items.push({
  ...item,

  productId: item.productId,
  businessId,

  quantity,
  price,
  title,
  image,
  weight,

  vendorState: item.vendorState,
  vendorTown: item.vendorTown,
  businessState: item.businessState,
  shippingRates: item.shippingRates ?? [],
});

    grouped[businessId].subtotal += price * quantity;

    grouped[businessId].totalWeight +=
      weight * quantity;
  }

  const result = Object.values(grouped);

  console.log(
    "GROUPED VENDORS",
    result.map((v: any) => ({
      businessId: v.businessId,
      state: v.businessState,
      itemCount: v.items.length,
    }))
  );

  return result;
}