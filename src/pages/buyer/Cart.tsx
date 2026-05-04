

import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


import type { CartItem } from "../../types/buyer.types"; 

import { getCart,updateCartItem,removeCartItem,clearCart } from "../../services/buyer.service"; 

// UI
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";

export default function Cart() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* ================= CART QUERY ================= */
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  /* =========================================================
     ➕ OPTIMISTIC UPDATE: UPDATE QTY
  ========================================================= */
  const updateQtyMutation = useMutation({
    mutationFn: ({
      id,
      quantity,
    }: {
      id: string;
      quantity: number;
    }) => updateCartItem(id, quantity),

    // 🔥 instant UI update
    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartItem[]>(["cart"]);

      queryClient.setQueryData<CartItem[]>(["cart"], (old = []) =>
        old.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: newItem.quantity }
            : item
        )
      );

      return { previousCart };
    },

    // ❌ rollback if error
    onError: (_err, _newItem, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  /* =========================================================
     ❌ OPTIMISTIC REMOVE ITEM
  ========================================================= */
  const removeMutation = useMutation({
    mutationFn: removeCartItem,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartItem[]>(["cart"]);

      queryClient.setQueryData<CartItem[]>(["cart"], (old = []) =>
        old.filter((item) => item.id !== id)
      );

      return { previousCart };
    },

    onError: (_err, _id, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  /* =========================================================
     🧹 CLEAR CART (OPTIMISTIC)
  ========================================================= */
  const clearMutation = useMutation({
    mutationFn: clearCart,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartItem[]>(["cart"]);

      queryClient.setQueryData(["cart"], []);

      return { previousCart };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  /* ================= TOTAL ================= */
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading cart...
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (items.length === 0) {
    return (
      <div className="p-6 text-center space-y-4">
        <h2 className="text-xl font-bold">Your cart is empty</h2>

        <Button onClick={() => navigate("/buyer/products")}>
          Go Shopping
        </Button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <PageHeader title="Shopping Cart" />

      {/* ITEMS */}
      <div className="space-y-4">

        {items.map((item: CartItem) => (

<Card
  key={item.id}
  className="p-3 flex flex-col gap-3"
>

  <div className="flex items-center justify-between">

    {/* LEFT */}
    <div className="flex items-center gap-3">

      {/* IMAGE (same pattern) */}
      <div className="w-20 aspect-[4/3] bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        <img
          src={item.image}
          className="w-full h-full object-contain"
        />
      </div>

      <div>
        <h2 className="font-semibold line-clamp-1">
          {item.title}
        </h2>

        <p className="text-sm text-gray-500">
          ₦{item.price.toLocaleString()}
        </p>
      </div>

    </div>

    {/* QTY */}
    <div className="flex items-center gap-2">

      <button
        onClick={() =>
          updateQtyMutation.mutate({
            id: item.id,
            quantity: item.quantity - 1,
          })
        }
        className="px-2 bg-gray-200 rounded"
      >
        -
      </button>

      <span>{item.quantity}</span>

      <button
        onClick={() =>
          updateQtyMutation.mutate({
            id: item.id,
            quantity: item.quantity + 1,
          })
        }
        className="px-2 bg-gray-200 rounded"
      >
        +
      </button>

    </div>

    {/* REMOVE */}
    <button
      onClick={() => removeMutation.mutate(item.id)}
      className="text-red-500 text-sm"
    >
      Remove
    </button>

  </div>

</Card>

        ))}

      </div>

      {/* SUMMARY */}
      <Card>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>

        <div className="flex gap-3 mt-4">

          <Button
            variant="danger"
            onClick={() => clearMutation.mutate()}
          >
            Clear Cart
          </Button>

          <Button onClick={() => navigate("/buyer/checkout")}>
            Checkout
          </Button>

        </div>
      </Card>

    </div>
  );
}