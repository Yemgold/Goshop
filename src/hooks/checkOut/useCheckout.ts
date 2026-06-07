


// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import { checkoutService } from "../../services/checkout.service";
// import { useCart } from "../cart/useCart";
// import { useAuthStore } from "../../store/auth.store";


// /* ================= HOOK ================= */

// export function useCheckout() {

//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const user = useAuthStore((s) => s.user);


//   const { clearCart } = useCart();

//   const mutation = useMutation({
//     mutationFn: async (payload: any) => {
//       const result =
//         await checkoutService.placeOrder(payload);

//       return result;
//     },

//     onSuccess: async (res) => {

//       await clearCart.mutateAsync();

//       await queryClient.invalidateQueries({
//         queryKey: ["buyer-orders"],
//       });

//       toast.success(
//         "Order placed successfully 🚀"
//       );

//       navigate("/buyers/order-success", {
//         state: {
//           orderId: res.data.order._id,
//           paymentUrl:
//             res.data.paymentIntent.paymentUrl,
//         },
//       });
//     },

//     onError: (error: any) => {
//       toast.error(
//         error.response?.data?.message ||
//           "Checkout failed"
//       );
//     },
//   });

//   /* ================= PLACE ORDER ================= */

//   const placeOrder = async (payload: {
//     cart: any;
//     cartData: any;
//     shippingTotal: number;
//     form: any;
//     vendorsWithShipping: any[];
//     contactPhone: string;
//   }) => {

//     const customerId = user?.id;


//     if (!customerId) {

//       toast.error(
//         "Session expired. Please login again."
//       );

//       navigate("/login");

//       return;
//     }

//     if (!payload.cart?.vendors?.length) {

//       toast.error("Cart is empty");
//       return;
//     }

//     if (!payload.form?.deliveryMode) {
  

//       toast.error(
//         "Select delivery mode"
//       );

//       return;
//     }

//     if (!payload.contactPhone?.trim()) {
  
//       toast.error(
//         "Phone number required"
//       );

//       return;
//     }

//     if (
//       payload.form.deliveryMode ===
//         "homeDelivery" &&
//       !payload.form.selectedState
//     ) {
//       toast.error("Select state");
//       return;
//     }

//     if (
//       payload.form.deliveryMode ===
//         "homeDelivery" &&
//       !payload.form.selectedTown
//     ) {

//       toast.error("Select town");
//       return;
//     }

//     const vendorOrders =
//       payload.vendorsWithShipping.map(
//         (vendor: any) => ({
//           businessId: vendor.businessId,

//           items: (
//             vendor.items || []
//           ).map((item: any) => ({
//             productId: item.productId,
//             name: item.name || "",
//             quantity: item.quantity,
//             price: item.price || 0,
//             weight: item.weight || 0,
//           })),

//           subtotal: vendor.subtotal,
//           totalWeight:
//             vendor.totalWeight,
//           shippingFee:
//             vendor.shippingFee,
//           status: "pending",
//         })
//       );

//     const items =
//       payload.cart?.vendors?.flatMap?.(
//         (v: any) =>
//           v.items.map(
//             (item: any) => ({
//               businessId:
//                 v.businessId,
//               productId:
//                 item.productId,
//               quantity:
//                 item.quantity,
//               price: item.price,
//             })
//           )
//       ) || [];

//     const cartId =
//       payload.cartData?._id;

//     if (!cartId) {
      
//       toast.error(
//         "Cart ID missing"
//       );

//       return;
//     }

//     const finalPayload = {
//   cartId,
//   customerId,
//   items,

//   contactPhone: payload.contactPhone,

//   idempotencyKey: crypto.randomUUID(),

//   deliveryMode: payload.form.deliveryMode,

//   pickupCenter:
//     payload.form.deliveryMode === "pickUpFromOurNearestOffice"
//       ? String(payload.form.pickupCenterId || "")
//       : "",

//   vendorOrders,

//   subTotalSummation:
//     vendorOrders.reduce(
//       (sum: number, vendor: any) =>
//         sum + vendor.subtotal,
//       0
//     ),

//   shippingFeeSummation:
//     payload.shippingTotal || 0,

//   buyerState:
//     payload.form.selectedState || "",

//   /* HOME DELIVERY ONLY */

//   deliveryAddress:
//   payload.form.deliveryMode === "homeDelivery"
//     ? {
//         street: payload.form.address || "",
//         town: payload.form.selectedTown || "",
//         state: payload.form.selectedState || "",
//         country: "Nigeria",
//       }
//     : null,

//   nearestBusStop:
//     payload.form.deliveryMode === "homeDelivery"
//       ? String(payload.form.nearestBusStop || "")
//       : "",

//   deliveryFee:
//     payload.form.deliveryMode === "homeDelivery"
//       ? payload.shippingTotal
//       : 0,
// };


// if (payload.form.deliveryMode === "homeDelivery") {
//   if (
//     !payload.form.address ||
//     !payload.form.selectedTown ||
//     !payload.form.selectedState
//   ) {
//     toast.error("Complete delivery address details");
//     return;
//   }
// }

//     const result =
//       await mutation.mutateAsync(
//         finalPayload
//       );

//     return result;
//   };

//   return {
//     placeOrder,
//     isPending: mutation.isPending,
//   };
// }

















import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { checkoutService } from "../../services/checkout.service";
import { useCart } from "../cart/useCart";
import { useAuthStore } from "../../store/auth.store";


/* ================= HOOK ================= */

export function useCheckout() {
  console.log("🚀 useCheckout HOOK LOADED");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = useAuthStore((s) => s.user);

  console.log("👤 USER:", user);

  const { clearCart } = useCart();

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      console.log("🔥 MUTATION FN STARTED");

      console.log(
        "🔥 MUTATION PAYLOAD:",
        JSON.stringify(payload, null, 2)
      );

      const result =
        await checkoutService.placeOrder(payload);

      console.log(
        "🔥 SERVICE RESPONSE:",
        result
      );

      return result;
    },

    onSuccess: async (res) => {
      console.log(
        "✅ MUTATION SUCCESS:",
        res
      );

      await clearCart.mutateAsync();

      await queryClient.invalidateQueries({
        queryKey: ["buyer-orders"],
      });

      toast.success(
        "Order placed successfully 🚀"
      );

      const paymentUrl =
  res.data.paymentIntent?.paymentUrl;

if (!paymentUrl) {
  toast.error("Unable to initialize payment");
  return;
}

window.location.href = paymentUrl;


    },

    onError: (error: any) => {
      console.log("❌ MUTATION ERROR");

      console.log(
        "ERROR OBJECT:",
        error
      );

      console.log(
        "RESPONSE DATA:",
        JSON.stringify(
          error.response?.data,
          null,
          2
        )
      );

      console.log(
        "STATUS:",
        error.response?.status
      );

      console.log(
        "MESSAGE:",
        error.response?.data?.message
      );

      toast.error(
        error.response?.data?.message ||
          "Checkout failed"
      );
    },
  });

  /* ================= PLACE ORDER ================= */

  const placeOrder = async (payload: {
    cart: any;
    cartData: any;
    shippingTotal: number;
    form: any;
    vendorsWithShipping: any[];
    contactPhone: string;
  }) => {
    console.log(
      "🚨 PLACE ORDER CALLED"
    );

    console.log(
      "STEP 1 - USER CHECK"
    );



 console.log("USER INSIDE placeOrder:", user);

console.log("USER FROM STORE:",
  useAuthStore.getState().user
);

const customerId =
  useAuthStore.getState().user?.id;

console.log(
  "STEP 2 - customerId:",
  customerId
);

    if (!customerId) {
      console.log(
        "❌ customerId missing"
      );

      toast.error(
        "Session expired. Please login again."
      );

      navigate("/login");

      return;
    }

    console.log("STEP 3");

    if (!payload.cart?.vendors?.length) {
      console.log(
        "❌ Cart vendors missing"
      );

      toast.error("Cart is empty");
      return;
    }

    console.log("STEP 4");

    if (!payload.form?.deliveryMode) {
      console.log(
        "❌ Delivery mode missing"
      );

      toast.error(
        "Select delivery mode"
      );

      return;
    }

    console.log("STEP 5");

    if (!payload.contactPhone?.trim()) {
      console.log(
        "❌ Phone missing"
      );

      toast.error(
        "Phone number required"
      );

      return;
    }

    console.log("STEP 6");

    if (
      payload.form.deliveryMode ===
        "homeDelivery" &&
      !payload.form.selectedState
    ) {
      console.log(
        "❌ State missing"
      );

      toast.error("Select state");
      return;
    }

    console.log("STEP 7");

    if (
      payload.form.deliveryMode ===
        "homeDelivery" &&
      !payload.form.selectedTown
    ) {
      console.log(
        "❌ Town missing"
      );

      toast.error("Select town");
      return;
    }

    console.log(
      "STEP 8 - BUILDING VENDOR ORDERS"
    );

    const vendorOrders =
      payload.vendorsWithShipping.map(
        (vendor: any) => ({
          businessId: vendor.businessId,

          items: (
            vendor.items || []
          ).map((item: any) => ({
            productId: item.productId,
            name: item.name || "",
            quantity: item.quantity,
            price: item.price || 0,
            weight: item.weight || 0,
          })),

          subtotal: vendor.subtotal,
          totalWeight:
            vendor.totalWeight,
          shippingFee:
            vendor.shippingFee,
          status: "pending",
        })
      );

    console.log(
      "STEP 9 - VENDOR ORDERS:",
      vendorOrders
    );

    const items =
      payload.cart?.vendors?.flatMap?.(
        (v: any) =>
          v.items.map(
            (item: any) => ({
              businessId:
                v.businessId,
              productId:
                item.productId,
              quantity:
                item.quantity,
              price: item.price,
            })
          )
      ) || [];

    console.log(
      "STEP 10 - ITEMS:",
      items
    );

    const cartId =
      payload.cartData?._id;

    console.log(
      "STEP 11 - cartId:",
      cartId
    );

    if (!cartId) {
      console.log(
        "❌ cartId missing"
      );

      toast.error(
        "Cart ID missing"
      );

      return;
    }





    const finalPayload = {
  cartId,
  customerId,
  items,

  contactPhone: payload.contactPhone,

  idempotencyKey: crypto.randomUUID(),

  deliveryMode: payload.form.deliveryMode,

  pickupCenter:
    payload.form.deliveryMode === "pickUpFromOurNearestOffice"
      ? String(payload.form.pickupCenterId || "")
      : "",

  vendorOrders,

  subTotalSummation:
    vendorOrders.reduce(
      (sum: number, vendor: any) =>
        sum + vendor.subtotal,
      0
    ),

  shippingFeeSummation:
    payload.shippingTotal || 0,

  buyerState:
    payload.form.selectedState || "",

  /* HOME DELIVERY ONLY */

  deliveryAddress:
  payload.form.deliveryMode === "homeDelivery"
    ? {
        street: payload.form.address || "",
        town: payload.form.selectedTown || "",
        state: payload.form.selectedState || "",
        country: "Nigeria",
      }
    : null,

  nearestBusStop:
    payload.form.deliveryMode === "homeDelivery"
      ? String(payload.form.nearestBusStop || "")
      : "",

  deliveryFee:
    payload.form.deliveryMode === "homeDelivery"
      ? payload.shippingTotal
      : 0,
};


if (payload.form.deliveryMode === "homeDelivery") {
  if (
    !payload.form.address ||
    !payload.form.selectedTown ||
    !payload.form.selectedState
  ) {
    toast.error("Complete delivery address details");
    return;
  }
}




    console.log(
      "STEP 12 - FINAL PAYLOAD"
    );

    console.log(
      JSON.stringify(
        finalPayload,
        null,
        2
      )
    );

    console.log(
      "STEP 13 - ABOUT TO CALL MUTATION"
    );

    const result =
      await mutation.mutateAsync(
        finalPayload
      );



console.log(
  "HOME DELIVERY VALUES",
  {
    deliveryMode: payload.form.deliveryMode,
    address: payload.form.address,
    nearestBusStop: payload.form.nearestBusStop,
    selectedTown: payload.form.selectedTown,
    selectedState: payload.form.selectedState,
  }
);






    console.log(
      "🔥 MUTATION FINISHED:"
    );

    console.log(result);

    return result;
  };

  return {
    placeOrder,
    isPending: mutation.isPending,
  };
}


