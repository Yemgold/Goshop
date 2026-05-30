
// import { useCallback } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import { checkoutService } from "../../services/checkout.service";
// import { buildCheckoutPayload } from "../../mappers/checkout.mapper";

// import { useCartStore } from "../../store/cart.store";
// import { useAuthStore } from "../../store/auth.store";

// type DeliveryMode = "vendor" | "office" | "home";

// type Args = {
//   deliveryMode: DeliveryMode | null;

//   address?: string;
//   city?: string;

//   officeAddress?: string;

//   contactPhone: string;
// };

// export function useCheckout({
//   deliveryMode,
//   address,
//   city,
//   officeAddress,
//   contactPhone,
// }: Args) {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const user = useAuthStore((s) => s.user);
//   const items = useCartStore((s) => s.items);
//   const clearCart = useCartStore((s) => s.clearCart);
//   const cartId = useCartStore((s) => s.cartId);

//   const buyerId = user?.id;

//   /* ================= MUTATION ================= */

//   const mutation = useMutation({
//     mutationFn: checkoutService.placeOrder,

//     onSuccess: async (res) => {
//       await clearCart();

//       queryClient.invalidateQueries({
//         queryKey: ["buyer-orders"],
//       });

//       toast.success("Order placed successfully 🚀");

//       navigate("/buyers/order-success", {
//         state: {
//           orderId: res.data.order._id,
//           paymentUrl: res.data.paymentIntent.paymentUrl,
//         },
//       });
//     },

//     onError: (error: any) => {
//       console.log("CHECKOUT ERROR:", error.response?.data);
//       toast.error(
//         error.response?.data?.message || "Checkout failed"
//       );
//     },
//   });

//   /* ================= PLACE ORDER ================= */

//   const placeOrder = useCallback(async () => {
//     if (!buyerId) return toast.error("User not found");
//     if (!cartId) return toast.error("Cart not found");
//     if (!items.length) return toast.error("Cart is empty");
//     if (!deliveryMode)
//       return toast.error("Select delivery mode");

//     const payload = buildCheckoutPayload({
//       cartId,
//       items,
//       buyerId,

//       deliveryMode,

//       address,
//       city,
//       officeAddress,

//       contactPhone,
//     });

//     console.log("FINAL PAYLOAD:", payload);

//     await mutation.mutateAsync(payload);
//   }, [
//     buyerId,
//     cartId,
//     items,
//     deliveryMode,
//     address,
//     city,
//     officeAddress,
//     contactPhone,
//     mutation,
//   ]);

//   return {
//     placeOrder,
//     isPending: mutation.isPending,
//   };
// }









import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { checkoutService } from "../../services/checkout.service";
import { buildCheckoutPayload } from "../../mappers/checkout.mapper";

import { useCartStore } from "../../store/cart.store";
import { useAuthStore } from "../../store/auth.store";

type DeliveryMode = "vendor" | "office" | "home";

type VendorInfo = {
  state?: string;
  town?: string;
};

type Args = {
  deliveryMode: DeliveryMode | null;

  address?: string;
  city?: string;

  officeAddress?: string;

  vendorInfo?: VendorInfo | null;

  contactPhone: string;
};

export function useCheckout({
  deliveryMode,
  address,
  city,
  officeAddress,
  vendorInfo,
  contactPhone,
}: Args) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const user = useAuthStore((s) => s.user);

  const items = useCartStore((s) => s.items);

  const clearCart = useCartStore((s) => s.clearCart);

  const cartId = useCartStore((s) => s.cartId);

  const buyerId = user?.id;

  /* ================= MUTATION ================= */

  const mutation = useMutation({
    mutationFn: checkoutService.placeOrder,

    onSuccess: async (res) => {
      await clearCart();

      queryClient.invalidateQueries({
        queryKey: ["buyer-orders"],
      });

      toast.success("Order placed successfully 🚀");

      navigate("/buyers/order-success", {
        state: {
          orderId: res.data.order._id,
          paymentUrl:
            res.data.paymentIntent.paymentUrl,
        },
      });
    },

    onError: (error: any) => {
      console.log(
        "CHECKOUT ERROR:",
        error.response?.data
      );

      toast.error(
        error.response?.data?.message ||
          "Checkout failed"
      );
    },
  });

  /* ================= PLACE ORDER ================= */

  const placeOrder = useCallback(async () => {
    /* ================= BASIC VALIDATION ================= */

    if (!buyerId) {
      return toast.error("User not found");
    }

    if (!cartId) {
      return toast.error("Cart not found");
    }

    if (!items.length) {
      return toast.error("Cart is empty");
    }

    if (!deliveryMode) {
      return toast.error(
        "Select delivery mode"
      );
    }

    if (!contactPhone.trim()) {
      return toast.error(
        "Contact phone is required"
      );
    }

    /* ================= HOME DELIVERY VALIDATION ================= */

    if (deliveryMode === "home") {
      if (!address?.trim()) {
        return toast.error(
          "Delivery address required"
        );
      }

      if (!city?.trim()) {
        return toast.error("City required");
      }
    }

    /* ================= OFFICE PICKUP VALIDATION ================= */

    if (deliveryMode === "office") {
      if (!officeAddress?.trim()) {
        return toast.error(
          "Office pickup address required"
        );
      }
    }

    /* ================= BUILD PAYLOAD ================= */

    const payload = buildCheckoutPayload({
      cartId,

      items,

      buyerId,

      deliveryMode,

      address,

      city,

      officeAddress,

      vendorState:
        vendorInfo?.state ?? "Unknown State",

      vendorTown:
        vendorInfo?.town ?? "Unknown Town",

      contactPhone,
    });

    console.log(
      "FINAL CHECKOUT PAYLOAD:",
      payload
    );

    /* ================= API REQUEST ================= */

    await mutation.mutateAsync(payload);
  }, [
    buyerId,
    cartId,
    items,
    deliveryMode,
    address,
    city,
    officeAddress,
    vendorInfo,
    contactPhone,
    mutation,
  ]);

  return {
    placeOrder,

    isPending: mutation.isPending,
  };
}