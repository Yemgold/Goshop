// src/mappers/cart.payload.ts



export const toCartPayload = (product: any, quantity: number) => {
  const productId = product?._id || product?.id;

  // ✅ normalize ALL possible business shapes
  const businessId =
    typeof product?.businessId === "string"
      ? product.businessId
      : product?.businessId?._id ||
        product?.business?._id ||
        product?.business?.id ||
        product?.businessId?.id;

  console.log("CART DEBUG:", {
    productId,
    businessId,
    product,
  });

  if (!productId) {
    throw new Error("Invalid productId");
  }

  // ⚠️ don't crash UI — just block safely
  if (!businessId) {
    console.warn("Missing businessId in product:", product);
    return {
      productId,
      businessId: "", // fallback (or you can throw if you prefer strict mode)
      quantity,
    };
  }

  return {
    productId,
    businessId,
    quantity,
  };
};