

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
  cartId: string;
  form: any;
  
  vendorsWithShipping: any[];
  contactPhone: string;

  shippingSummary: {
    shippingFeeSummation: number;
    deliveryFeeSummation: number;
  };

  deliveryAddress?: string;
  collectionFee?: number;


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

  items: v.items.map((item: any) => ({
    productId: item.productId,
    name: String(item.title || item.name || "Product"),
    quantity: Number(item.quantity || 0),
    price: Number(item.price || 0),
    weight: Number(item.weight || 0),
  })),

  subtotal: v.subtotal,
  totalWeight: v.totalWeight,
  shippingFee: v.shippingFee,
  status: "pending",
}));

    const finalPayload = {
      cartId: payload.cartId,
      customerId,
      items,
      contactPhone: payload.contactPhone,

      idempotencyKey: crypto.randomUUID(),
      deliveryMode: payload.form.deliveryMode,

      interStatePickupFee: payload.collectionFee || 0,

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

    console.log("Place Order",finalPayload )

    return await mutation.mutateAsync(finalPayload);
  };

  return {
    placeOrder,
    isPending: mutation.isPending,
  };
}


