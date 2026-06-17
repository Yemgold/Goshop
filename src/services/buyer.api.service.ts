


import {
  getBuyerDashboardAPI,
  getBuyerOrdersAPI,
  placeOrderAPI,
  getOrderTrackingAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
  getCartAPI,
  getOrCreateCartAPI,
  getBusStopsByStateAPI,
  verifyPaymentAPI,
  getAllPickupCentersAPI,
} from "../api/user/buyer.api";


/* ================= SERVICE ================= */


export const buyerService = {
  /* dashboard */
  getDashboard: getBuyerDashboardAPI,



  /* orders */
  getOrders: getBuyerOrdersAPI,
  placeOrder: placeOrderAPI,
  getOrderTracking: getOrderTrackingAPI,

  /* cart */
  getCart: getCartAPI,
  getOrCreateCart: getOrCreateCartAPI,

  addToCart: addToCartAPI,
  updateCartItem: updateCartItemAPI,
  removeCartItem: removeCartItemAPI,
  clearCart: clearCartAPI,

  /* Pickup */
  getPickupCenters: getAllPickupCentersAPI,

  /* BusStop */
  getBusStopsByState: getBusStopsByStateAPI,

  /* Payment */
  getverifyPayment: verifyPaymentAPI,
};