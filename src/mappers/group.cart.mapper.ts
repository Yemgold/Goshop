export function groupCartByVendor(
  items: any[] = [],
  products: any[] = []
) {
  if (!Array.isArray(items)) return [];

  /* ================= PRODUCT MAP ================= */

  const productMap = new Map(
    (Array.isArray(products) ? products : []).map((p: any) => [
      String(p?._id || p?.id),
      p,
    ])
  );

  const grouped: Record<string, any> = {};

  for (const item of items) {
    if (!item?.productId) continue;

    const product = productMap.get(String(item.productId));

    const quantity = Math.max(1, Number(item.quantity ?? 1));

    const price = Number(
      product?.price ?? item.price ?? 0
    );

    const weight = Number(
      product?.weight ?? item.weight ?? 0
    );

    const title =
      product?.name ||
      product?.title ||
      "Unknown Product";

    /* ================= IMAGE RESOLVER (CLEAN FIX) ================= */

    const image =
      product?.media?.find(
        (m: any) => m?.type === "image" && m?.url
      )?.url ||
      product?.media?.[0]?.url ||
      item.image ||
      "/placeholder.png";

    /* ================= BUSINESS ID (STRICTER) ================= */

    const businessId =
      product?.businessId ||
      product?.business?._id ||
      product?.business?.id ||
      item.businessId;

    if (!businessId) continue;

    /* ================= INIT GROUP ================= */

    if (!grouped[businessId]) {
      grouped[businessId] = {
        businessId,
        items: [],
        subtotal: 0,
        totalWeight: 0,
      };
    }

    /* ================= PUSH ITEM ================= */

    grouped[businessId].items.push({
      productId: item.productId,
      businessId,
      quantity,
      price,
      title,
      image,
      weight,
    });

    /* ================= TOTALS ================= */

    grouped[businessId].subtotal += price * quantity;
    grouped[businessId].totalWeight += weight * quantity;
  }

  return Object.values(grouped);
}