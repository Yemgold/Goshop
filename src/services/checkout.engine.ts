


// export function buildCheckoutEngine({
//   cartItems,
//   products,
//   selectedState,
//   deliveryMode,
//   deliveryRates,
//   collectionFee,
//   shippingSummary,
// }: any) {
//   // prevent invalid states
//   if (!selectedState || !deliveryMode) {
//     return {
//       cart: null,
//       shipping: {
//         vendors: [],
//         shippingFeeSummation: 0,
//         deliveryFeeSummation: 0,
//       },
//       subtotal: 0,
//       grandTotal: 0,
//       collectionFee: 0,
//     };
//   }

//   const cart = buildCartSummary(cartItems, products);

//   const shipping = calculateShipping(
//     cartItems,
//     products,
//     selectedState,
//     deliveryRates,
//     deliveryMode
//   );

//   const subtotal = cart.total || 0;

//   const grandTotal =
//     subtotal +
//     shipping.shippingFeeSummation +
//     shipping.deliveryFeeSummation +
//     (collectionFee || 0);

//   return {
//     cart,
//     shipping,
//     subtotal,
//     grandTotal,
//     collectionFee: collectionFee || 0,
//   };
// }







import { buildCartSummary } from "./cart.engine";
import { calculateShipping } from "./shipping.engine";

export function buildCheckoutEngine({
  cartItems,
  products,
  selectedState,
  deliveryMode,
  deliveryRates,
  collectionFee,
}: any) {
  // prevent invalid states
  if (!selectedState || !deliveryMode) {
    return {
      cart: { vendors: [], total: 0 },
      shipping: {
        vendors: [],
        shippingFeeSummation: 0,
        deliveryFeeSummation: 0,
        totalShipping: 0,
        totalWeight: 0,
      },
      subtotal: 0,
      grandTotal: 0,
      collectionFee: 0,
    };
  }

  const cart = buildCartSummary(cartItems, products);

  const shipping = calculateShipping(
    cartItems,
    products,
    selectedState,
    deliveryRates,
    deliveryMode
  );

  const subtotal = cart.total || 0;

  const grandTotal =
    subtotal +
    (shipping.shippingFeeSummation || 0) +
    (shipping.deliveryFeeSummation || 0) +
    (collectionFee || 0);

  return {
    cart,
    shipping,
    subtotal,
    grandTotal,
    collectionFee: collectionFee || 0,
  };
}