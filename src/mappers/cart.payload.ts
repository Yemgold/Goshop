

// src/mappers/cart.payload.ts

// export const toCartPayload = (product: any, quantity: number) => {
//   const productId = product._id;

//   const businessId =
//     typeof product.businessId === "string"
//       ? product.businessId
//       : product.businessId?._id;

//   if (!productId || !businessId) {
//     throw new Error("Invalid product or businessId");
//   }

//   return {
//     productId,
//     businessId,
//     quantity,
//   };
// };

// ......................................

// src/mappers/cart.payload.ts

export const toCartPayload = (
  product: any,
  quantity: number
) => {
  const productId =
    product._id || product.id;

  const businessId =
    product.business?.id ||
    product.businessId?._id ||
    product.businessId;

  console.log("CART DEBUG:", {
    productId,
    businessId,
    product,
  });

  if (!productId) {
    throw new Error("Invalid productId");
  }

  if (!businessId) {
    console.error(
      "Missing businessId in product:",
      product
    );

    throw new Error("Invalid businessId");
  }

  return {
    productId,
    businessId,
    quantity,
  };
};