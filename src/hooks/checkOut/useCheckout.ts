


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { checkoutService } from "../../services/checkout.service";
import { useCart } from "../cart/useCart";
import { useAuthStore } from "../../store/auth.store";

export function useCheckout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const { clearCart } = useCart();

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      return await checkoutService.placeOrder(payload);
    },

    onSuccess: async (res) => {
      await clearCart.mutateAsync();

      await queryClient.invalidateQueries({
        queryKey: ["buyer-orders"],
      });

      toast.success("Order placed successfully 🚀");

      const paymentUrl = res.data?.paymentIntent?.paymentUrl;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    },

    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Checkout failed");
    },
  });

  /* ================= PLACE ORDER ================= */

  const placeOrder = async (payload: {
    cart: any;
    cartData: any;
    form: any;
    products: any[];
    vendorsWithShipping: any[];
    contactPhone: string;

    // MUST come from shipping.engine.ts AFTER bus stop API call
    shippingSummary: {
      shippingFeeSummation: number;
      deliveryFeeSummation: number;
    };
  }) => {
    const customerId = user?.id;

    if (!customerId) {
      toast.error("Session expired");
      navigate("/login");
      return;
    }

    if (!payload.shippingSummary) {
      toast.error("Shipping not calculated");
      return;
    }

    if (!payload.cart?.vendors?.length) {
      toast.error("Cart is empty");
      return;
    }

    /* ================= BUILD ITEMS ================= */

    const items =
      payload.cart.vendors.flatMap((v: any) =>
        v.items.map((item: any) => ({
          businessId: v.businessId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        }))
      );

    /* ================= VENDOR ORDERS ================= */

const vendorOrders = payload.vendorsWithShipping.map((v: any) => ({
  businessId: v.businessId,

  items: v.items.map((item: any) => {
    const product = payload.products.find(
      (p: any) => (p._id || p.id) === item.productId
    );

    return {
      productId: item.productId,
      name: String(product?.name || "Product"),
      quantity: Number(item.quantity || 0),
      price: Number(item.price || 0),
      weight: Number(product?.weight || 0),
    };
  }),

  subtotal: v.subtotal,
  totalWeight: v.totalWeight,
  shippingFee: v.shippingFee,
  status: "pending",
}));

    const finalPayload = {
      cartId: payload.cartData._id,
      customerId,
      items,
      contactPhone: payload.contactPhone,

      idempotencyKey: crypto.randomUUID(),
      deliveryMode: payload.form.deliveryMode,

      pickupCenter:
        payload.form.deliveryMode === "pickUpFromOurNearestOffice"
          ? payload.form.pickupCenterId || ""
          : "",

      vendorOrders,

      subTotalSummation: vendorOrders.reduce(
        (s: number, v: any) => s + v.subtotal,
        0
      ),

      /* ================= IMPORTANT FIX ================= */

      // vendor → office
      shippingFeeSummation:
        payload.shippingSummary.shippingFeeSummation,

      // office → customer (THIS is your missing backend requirement)
      deliveryFee: payload.shippingSummary.deliveryFeeSummation,

      buyerState: payload.form.selectedState || "",

      deliveryAddress:
        payload.form.deliveryMode === "homeDelivery"
          ? {
              street: payload.form.address,
              town: payload.form.selectedTown,
              state: payload.form.selectedState,
              country: "Nigeria",
            }
          : null,

      nearestBusStop:
        payload.form.deliveryMode === "homeDelivery"
          ? payload.form.nearestBusStop
          : "",
    };

    return await mutation.mutateAsync(finalPayload);
  };

  return {
    placeOrder,
    isPending: mutation.isPending,
  };
}















// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import { checkoutService } from "../../services/checkout.service";
// import { useCart } from "../cart/useCart";
// import { useAuthStore } from "../../store/auth.store";

// export function useCheckout() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const user = useAuthStore((s) => s.user);
//   const { clearCart } = useCart();

//   const mutation = useMutation({
//     mutationFn: checkoutService.placeOrder,

//     onSuccess: async (res) => {
//       await clearCart.mutateAsync();

//       await queryClient.invalidateQueries({
//         queryKey: ["buyer-orders"],
//       });

//       toast.success("Order placed successfully 🚀");

//       const paymentUrl = res?.data?.paymentIntent?.paymentUrl;

//       if (paymentUrl) {
//         window.location.href = paymentUrl;
//       }
//     },

//     onError: (error: any) => {
//       console.error("CHECKOUT ERROR:", error?.response?.data || error);
//       toast.error(
//         error?.response?.data?.message || "Checkout failed"
//       );
//     },
//   });

//   const placeOrder = async (payload: {
//     cart: any;
//     cartData: any;
//     form: any;
//     products: any[];
//     vendorsWithShipping: any[];
//     contactPhone: string;
//     shippingSummary: {
//       shippingFeeSummation: number;
//       deliveryFeeSummation: number;
//     };
//   }) => {
//     const customerId = user?.id 

//     //  const customerId = user?.id || user?._id;

//     if (!customerId) {
//       toast.error("Session expired");
//       navigate("/login");
//       return;
//     }

//     if (!payload.shippingSummary) {
//       toast.error("Shipping not calculated");
//       return;
//     }

//     if (!payload.cart?.vendors?.length) {
//       toast.error("Cart is empty");
//       return;
//     }

//     /* ================= BUILD VENDOR ORDERS (SOURCE OF TRUTH) ================= */
//     const vendorOrders = (payload.vendorsWithShipping || [])
//       .filter((v: any) => v?.businessId)
//       .map((v: any) => ({
//         businessId: String(v.businessId),

//         items: (v.items || [])
//           .map((item: any) => {
//             const product = payload.products.find(
//               (p: any) => (p._id || p.id) === item.productId
//             );


//               console.log("STOCK CHECK:", {
//       productId: item.productId,
//       name: product?.name,
//       headon: product?.headon,
//       quantity: item.quantity,
//     });

//             return {
//               productId: item.productId,
//               name: product?.name || "Product",
//               quantity: Number(item.quantity || 0),
//               price: Number(item.price || 0),
//               weight: Number(product?.weight || 0),
//             };
//           })
//           .filter((i: any) => i.productId),

//         subtotal: Number(v.subtotal || 0),
//         totalWeight: Number(v.totalWeight || 0),
//         shippingFee: Number(v.shippingFee || 0),
//         status: "pending",
//       }));

//     if (!vendorOrders.length) {
//       toast.error("No valid vendor orders found");
//       return;
//     }

//     /* ================= GRAND TOTAL ================= */
//     const grandTotal =
//       vendorOrders.reduce((sum, v) => sum + v.subtotal, 0) +
//       (payload.shippingSummary.shippingFeeSummation || 0) +
//       (payload.shippingSummary.deliveryFeeSummation || 0);

//     /* ================= FINAL PAYLOAD ================= */
//     const finalPayload = {
//       customerId: String(customerId),

//       cartId: payload.cartData?._id,

//       contactPhone: payload.contactPhone,

//       idempotencyKey: crypto.randomUUID(),

//       deliveryMode: payload.form.deliveryMode,

//       /* ================= ADDRESS ================= */
//       address: payload.form.address || "",
//       city: payload.form.selectedTown || "",
//       state: payload.form.selectedState || "",
//       country: "Nigeria",

//       /* ================= REQUIRED BY BACKEND ================= */
//       vendorOrders,

//       grandTotal,

//       shippingFeeSummation:
//         payload.shippingSummary.shippingFeeSummation || 0,

//       deliveryFee:
//         payload.shippingSummary.deliveryFeeSummation || 0,

//       /* ================= PICKUP ================= */
//       pickupCenter:
//         payload.form.deliveryMode === "pickUpFromOurNearestOffice"
//           ? payload.form.pickupCenterId || ""
//           : "",

//       nearestBusStop:
//         payload.form.deliveryMode === "homeDelivery"
//           ? payload.form.nearestBusStop || ""
//           : "",
//     };

//     console.log("🚀 FINAL CHECKOUT PAYLOAD:", finalPayload);

//     return await mutation.mutateAsync(finalPayload as any);
//   };

//   return {
//     placeOrder,
//     isPending: mutation.isPending,
//   };
// }