
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";

import { useCart } from "../../hooks/cart/useCart";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyCartState } from "../../components/ui/empty-states/EmptyCartState";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    isLoading,
    isError,
    updateQty,
    removeItem,
    clearCart,
  } = useCart();

  /* ================= CART ITEMS ================= */

  const items = useMemo(() => {
    return Array.isArray(cart?.items) ? cart.items : [];
  }, [cart]);

  const hasItems = items.length > 0;
  const isReady = !isLoading;
  const isEmpty = isReady && !hasItems;

  /* ================= ENRICH CART ================= */

  const enrichedItems = useMemo(() => {
    if (!items.length) return [];

    return items.map((item: any) => ({
      ...item,

      title:
        item.name ||
        item.productName ||
        item.product?.name ||
        "Unknown Product",

      category:
        item.category ||
        item.product?.category ||
        "Uncategorized",

      price:
        item.price ||
        item.product?.price ||
        0,

      image:
        item.media?.find((m: any) => m?.url)?.url ||
        item.media?.[0]?.url ||
        item.image ||
        item.thumbnail ||
        item.product?.media?.find((m: any) => m?.url)?.url ||
        item.product?.media?.[0]?.url ||
        item.product?.image ||
        item.product?.thumbnail ||
        "/placeholder.png",
    }));
  }, [items]);

/* ================= STOCK VALIDATION ================= */

const stockIssues = useMemo(() => {
  return enrichedItems.filter((item: any) => {
    const stock =
      Number(item.stock) ||
      Number(item.product?.stock) ||
      0;

    return Number(item.quantity) > stock;
  });
}, [enrichedItems]);

const hasStockIssues = stockIssues.length > 0;










  /* ================= DEBUG ================= */

  useEffect(() => {
    console.log("CART:", cart);
    console.log("CART ITEMS:", items);
    console.log("ENRICHED ITEMS:", enrichedItems);
  }, [cart, items, enrichedItems]);

  /* ================= ERROR ================= */

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load cart
      </div>
    );
  }

  /* ================= LOADING ================= */

  if (!isReady) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4 animate-pulse">
        <PageHeader title="Shopping Cart" />

        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="h-24 bg-gray-100 rounded" />
          </Card>
        ))}
      </div>
    );
  }

  /* ================= EMPTY ================= */

  if (isEmpty) {
    return (
      <EmptyCartState
        loading={false}
        hasItems={false}
      />
    );
  }

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader title="Shopping Cart" />

      <div className="space-y-4">
        {enrichedItems.map((item: any) => (
          <Card
            key={`${item.productId}-${item.businessId}`}
            className="p-4"
          >
            <div className="flex gap-4">

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title || "product"}
                className="w-24 h-24 rounded object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "/placeholder.png";
                }}
              />

              {/* DETAILS */}
              <div className="flex-1 space-y-2">
                <h2 className="font-bold">
                  {item.title}
                </h2>

                <p className="text-gray-500 text-sm">
                  {item.category}
                </p>

                <p className="font-semibold">
  ₦{Number(item.price).toLocaleString()}
</p>

{Number(item.quantity) >
  (Number(item.stock) ||
    Number(item.product?.stock) ||
    0) && (
  <p className="text-red-600 text-sm font-medium">
    Only{" "}
    {Number(item.stock) ||
      Number(item.product?.stock) ||
      0}
    {" "}left in stock
  </p>
)}

                {/* QUANTITY */}
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() =>
                      updateQty.mutate({
                        productId:
                          item.productId,
                        quantity: Math.max(
                          1,
                          item.quantity - 1
                        ),
                      })
                    }
                    className="px-3 py-1 border rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQty.mutate({
                        productId:
                          item.productId,
                        quantity:
                          item.quantity + 1,
                      })
                    }
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <Button
                  variant="danger"
                  onClick={() =>
                    removeItem.mutate(
                      item.productId
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ACTIONS */}
      <Card className="p-4 space-y-4">
        <div className="flex gap-3">
          <Button
            variant="danger"
            onClick={() =>
              clearCart.mutate()
            }
          >
            Clear Cart
          </Button>

        <Button
  disabled={hasStockIssues}
  onClick={() =>
    navigate("/buyers/checkout")
  }
>
  {hasStockIssues
    ? "Stock Unavailable"
    : "Checkout"}
</Button>

        </div>
      </Card>
    </div>
  );
}