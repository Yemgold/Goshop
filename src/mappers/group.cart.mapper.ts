
export function groupCartByVendor(items: any[], products: any[]) {
  if (!Array.isArray(items) || !Array.isArray(products)) return [];

  const productMap = new Map(
    products.map((p: any) => [String(p._id), p])
  );

  const grouped: Record<string, any> = {};

for (const item of items) {
  const product = productMap.get(String(item.productId));

  if (!product) {
    console.log("❌ Missing product for:", item);
    continue;
  }

  console.log("ITEM DEBUG:", {
    productId: item.productId,
    quantity: item.quantity,
    productPrice: product.price,
    lineTotal: Number(product.price || 0) * item.quantity,
  });

  const businessId = product.business.id;

  if (!businessId) {
    console.log("❌ Missing businessId:", product);
    continue;
  }

  if (!grouped[businessId]) {
    grouped[businessId] = {
      businessId,
      items: [],
      subtotal: 0,
      totalWeight: 0,
    };
  }

  const enrichedItem = {
    productId: item.productId,
    quantity: item.quantity,
    price: Number(product.price || 0),
  };

  grouped[businessId].items.push(enrichedItem);

  grouped[businessId].subtotal +=
    enrichedItem.price * enrichedItem.quantity;

  grouped[businessId].totalWeight +=
    (product.weight || 0) * item.quantity;
}

console.log("GROUPED CART:", grouped);

  

  return Object.values(grouped);
}
























// export function groupCartByVendor(items: any[]) {
//   if (!Array.isArray(items)) return [];

//   const grouped: Record<string, any> = {};

//   for (const item of items) {
//     const businessId = item.businessId;

//     if (!businessId) continue;

//     if (!grouped[businessId]) {
//       grouped[businessId] = {
//         businessId,
//         items: [],
//         subtotal: 0,
//         totalWeight: 0,
//       };
//     }

//     const quantity = Number(item.quantity || 0);
//     const price = Number(item.price || 0);
//     const weight = Number(item.weight || 0);

//     grouped[businessId].items.push({
//       productId: item.productId,
//       quantity,
//       price,
//       weight,
//     });

//     grouped[businessId].subtotal += price * quantity;
//     grouped[businessId].totalWeight += weight * quantity;
//   }

//   return Object.values(grouped);
// }