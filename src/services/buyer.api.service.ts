
import {
  getBuyerDashboardAPI,
  getBuyerProductsAPI,
  getBuyerProductByIdAPI,
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
  getAllPickupCentersAPI,
} from "../api/user/buyer.api";

/* ================= SERVICE ================= */
export const buyerService = {
  /* dashboard */
  getDashboard: getBuyerDashboardAPI,

  /* products */
  getProducts: getBuyerProductsAPI,
  getProductById: getBuyerProductByIdAPI,

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
  getPickupCenters:getAllPickupCentersAPI,

  /* BusStop */
  getBusStopsByState:getBusStopsByStateAPI,

};