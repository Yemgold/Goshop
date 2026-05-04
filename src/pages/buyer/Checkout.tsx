


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { useCartStore } from "../../store/cart.store";
import { placeOrder } from "../../services/buyer.service";
import { PageHeader } from "../../components/ui/PageHeader";

/* ================= TYPES ================= */
type PaymentMethod = "card" | "cash" | "transfer" | "giftcard";

export default function Checkout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("card");

  /* ================= GIFT CARD CHECK ================= */
  const canUseGiftCard = items.every(
    (item) => item.acceptsGiftCard !== false
  );

  /* ================= MUTATION ================= */
  const { mutate, isPending } = useMutation({
    mutationFn: placeOrder,

    onSuccess: (data) => {
      clearCart();

      queryClient.invalidateQueries({
        queryKey: ["buyer-orders"],
      });

      toast.success("Order placed successfully 🚀");

      navigate("/buyer/order-success", {
        state: { orderId: data.orderId },
      });
    },

    onError: () => {
      toast.error("Failed to place order. Try again.");
    },
  });

  /* ================= EMPTY CART ================= */
  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">
          Your cart is empty 🛒
        </h2>

        <button
          onClick={() => navigate("/buyer/home")}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  /* ================= PLACE ORDER ================= */
  const handlePlaceOrder = () => {
    if (address.trim().length < 5) {
      toast.error("Enter a valid address");
      return;
    }

    if (city.trim().length < 2) {
      toast.error("Enter your city/state");
      return;
    }

    if (paymentMethod === "giftcard" && !canUseGiftCard) {
      toast.error("Some items do not accept gift card");
      return;
    }

    const orderPayload = {
      address,
      city,
      paymentMethod,

      items: items.map((item) => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),

      total,
    };

    mutate(orderPayload);
  };

  /* ================= PAYMENT METHODS ================= */
  const paymentMethods: PaymentMethod[] = [
    "card",
    "cash",
    "transfer",
    "giftcard",
  ];

  const getLabel = (method: PaymentMethod) => {
    switch (method) {
      case "card":
        return "💳 Card Payment";
      case "cash":
        return "💵 Cash on Delivery";
      case "transfer":
        return "🏦 Bank Transfer";
      case "giftcard":
        return "🎁 Go-Shopping Gift Card";
    }
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <PageHeader title="Checkout" />

      <div className="grid md:grid-cols-2 gap-6">

        {/* ================= LEFT ================= */}
        <div className="space-y-4">

          <h2 className="font-semibold">Delivery Details</h2>

          <input
            type="text"
            placeholder="Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="City / State"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          {/* ================= PAYMENT ================= */}
          <h2 className="font-semibold mt-4">
            Payment Method
          </h2>

          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const isDisabled =
                method === "giftcard" && !canUseGiftCard;

              return (
                <div
                  key={method}
                  onClick={() => {
                    if (isDisabled) return;
                    setPaymentMethod(method);
                  }}
                  className={`p-3 border rounded-xl transition
                    ${
                      paymentMethod === method
                        ? "border-black bg-gray-100"
                        : ""
                    }
                    ${
                      isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                  `}
                >
                  {getLabel(method)}

                  {/* 🚨 Warning */}
                  {method === "giftcard" && !canUseGiftCard && (
                    <p className="text-xs text-red-500 mt-1">
                      Some items do not support gift card
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="border p-4 rounded-2xl shadow-sm">

          <h2 className="font-semibold mb-3">
            Order Summary
          </h2>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>

                <span>
                  ₦{(
                    item.price * item.quantity
                  ).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>₦{total.toLocaleString()}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isPending}
            className={`w-full mt-4 py-3 rounded-xl text-white font-medium ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black"
            }`}
          >
            {isPending ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}