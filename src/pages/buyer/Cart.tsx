

import { useNavigate } from "react-router-dom";


import { useCart } from "../../hooks/buyer/useCart";
import {
  enrichCartItems,
  calculateCartTotal,
} from "../../mappers/cart.mapper";

// UI
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";

// import { CartSkeleton } from "../../components/ui/empty-states/CartSkeleton"; 
 import { EmptyCartState } from "../../components/ui/empty-states/EmptyCartState";


export default function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    products,
    isLoading,
    isError,
    updateQty,
    removeItem,
    clearCart,
  } = useCart();

  const items = cart?.items || [];

  const enrichedItems = enrichCartItems(items, products);
  const total = calculateCartTotal(enrichedItems);

  /* ================= STATES ================= */

  const isInitialLoading = isLoading && !cart;
  const isEmpty = !isLoading && items.length === 0;

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load cart
      </div>
    );
  }

  // 🔥 FIX: ONLY show loading when NO cached cart exists
  if (isInitialLoading) {
    return <EmptyCartState loading={true} hasItems={false} />;
  }

  // 🔥 FIX: ONLY show empty AFTER loading finishes
  if (isEmpty) {
    return <EmptyCartState loading={false} hasItems={false} />;
  }

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader title="Shopping Cart" />

      <div className="space-y-4">
        {enrichedItems.map((item) => (
          <Card key={item.productId} className="p-4">
            <div className="flex gap-4">
              <img src={item.image} className="w-24 h-24 rounded" />

              <div className="flex-1 space-y-2">
                <h2 className="font-bold">{item.title}</h2>

                <p className="text-gray-500 text-sm">
                  {item.category}
                </p>

                <p className="font-semibold">
                  ₦{item.price.toLocaleString()}
                </p>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() =>
                      updateQty.mutate({
                        productId: item.productId,
                        quantity: Math.max(1, item.quantity - 1),
                      })
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQty.mutate({
                        productId: item.productId,
                        quantity: item.quantity + 1,
                      })
                    }
                  >
                    +
                  </button>
                </div>

                <Button
                  variant="danger"
                  onClick={() =>
                    removeItem.mutate(item.productId)
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 space-y-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>

        <div className="flex gap-3">
          <Button
            variant="danger"
            onClick={() => clearCart.mutate()}
          >
            Clear Cart
          </Button>

          <Button
            onClick={() => navigate("/buyers/checkout")}
          >
            Checkout
          </Button>
        </div>
      </Card>
    </div>
  );
}










