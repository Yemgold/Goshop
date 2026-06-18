
import {
  getCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
} from "../api/user/buyer.api"; 

export const cartService = {
  getCart: getCartAPI,

  addToCart: addToCartAPI,

  updateCartItem: updateCartItemAPI,

  removeCartItem: removeCartItemAPI,

  clearCart: clearCartAPI,
};