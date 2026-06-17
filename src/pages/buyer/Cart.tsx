
// import { useNavigate } from "react-router-dom";
// import { useMemo, useEffect } from "react";

// import { useCart } from "../../hooks/cart/useCart";
// import { useProducts } from "../../hooks/product/useProducts";

// import { Card } from "../../components/ui/Card";
// import { Button } from "../../components/ui/Button";
// import { PageHeader } from "../../components/ui/PageHeader";
// import { EmptyCartState } from "../../components/ui/empty-states/EmptyCartState";

// export default function Cart() {
//   const navigate = useNavigate();

//   const {
//     cart,
//     isLoading,
//     isError,
//     updateQty,
//     removeItem,
//     clearCart,
//   } = useCart();

//  /* ================= PRODUCTS ================= */

// const { data: productData } = useProducts();

// const products = useMemo(() => {
//   return productData?.products ?? [];
// }, [productData]);

// /* ================= HELPERS ================= */

// const normalizeId = (id: any) => String(id?._id ?? id);

// const getProductImage = (product: any) => {
//   return (
//     product?.media?.find((m: any) => m?.url)?.url ||
//     product?.media?.[0]?.url ||
//     product?.image ||
//     product?.thumbnail ||
//     "/placeholder.png"
//   );
// };

// /* ================= PRODUCT MAP ================= */

// const productMap = useMemo(() => {
//   const map = new Map<string, any>();

//   products.forEach((p: any) => {
//     map.set(normalizeId(p), p);
//   });

//   return map;
// }, [products]);

//   /* ================= CART ITEMS ================= */

//   const items = useMemo(() => {
//     return Array.isArray(cart?.items) ? cart.items : [];
//   }, [cart]);

//   const hasItems = items.length > 0;
//   const isReady = !isLoading;
//   const isEmpty = isReady && !hasItems;

 

// /* ================= ENRICH CART ================= */

// const enrichedItems = useMemo(() => {
//   if (!items.length) return [];

//   console.log("AVAILABLE PRODUCT IDS:", Array.from(productMap.keys()));

//   return items.map((item: any) => {
//     const product = productMap.get(
//   normalizeId(item.productId)
// );
//      console.log({
//   productId: item.productId,
//   normalized: normalizeId(item.productId),
//   matched: productMap.has(normalizeId(item.productId)),
// });

    

//     return {
//       ...item,

//       title: product?.name || item.name,
//       category: product?.category || "Uncategorized",
//       price: product?.price || item.price,

//       image: getProductImage(product),
//     };
//   });
// }, [items, productMap]);

//   /* ================= DEBUG ================= */

//   useEffect(() => {
//     console.log("CART ITEMS:", items);
//     console.log("PRODUCTS:", products);
//     console.log("ENRICHED ITEMS:", enrichedItems);
//   }, [items, products, enrichedItems]);

//   /* ================= ERROR ================= */

//   if (isError) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         Failed to load cart
//       </div>
//     );
//   }

//   /* ================= LOADING ================= */

//   if (!isReady) {
//     return (
//       <div className="p-6 max-w-4xl mx-auto space-y-4 animate-pulse">
//         <PageHeader title="Shopping Cart" />
//         {[1, 2, 3].map((i) => (
//           <Card key={i} className="p-4">
//             <div className="h-24 bg-gray-100 rounded" />
//           </Card>
//         ))}
//       </div>
//     );
//   }

//   /* ================= EMPTY ================= */

//   if (isEmpty) {
//     return <EmptyCartState loading={false} hasItems={false} />;
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       <PageHeader title="Shopping Cart" />

//       <div className="space-y-4">
//         {enrichedItems.map((item: any) => (
//           <Card
//             key={`${item.productId}-${item.businessId}`}
//             className="p-4"
//           >
//             <div className="flex gap-4">

//               {/* IMAGE */}
//               <img
//                 src={item.image}
//                 alt={item.title || "product"}
//                 className="w-24 h-24 rounded object-cover"
//                 onError={(e) => {
//                   e.currentTarget.src = "/placeholder.png";
//                 }}
//               />

//               {/* DETAILS */}
//               <div className="flex-1 space-y-2">
//                 <h2 className="font-bold">
//                   {item.title || "Unknown Product"}
//                 </h2>

//                 <p className="text-gray-500 text-sm">
//                   {item.category || "Uncategorized"}
//                 </p>

//                 <p className="font-semibold">
//                   ₦{Number(item.price || 0).toLocaleString()}
//                 </p>

//                 {/* QUANTITY */}
//                 <div className="flex gap-3 items-center">
//                   <button
//                     onClick={() =>
//                       updateQty.mutate({
//                         productId: item.productId,
//                         quantity: Math.max(1, item.quantity - 1),
//                       })
//                     }
//                     className="px-3 py-1 border rounded"
//                   >
//                     -
//                   </button>

//                   <span>{item.quantity}</span>

//                   <button
//                     onClick={() =>
//                       updateQty.mutate({
//                         productId: item.productId,
//                         quantity: item.quantity + 1,
//                       })
//                     }
//                     className="px-3 py-1 border rounded"
//                   >
//                     +
//                   </button>
//                 </div>

//                 {/* REMOVE */}
//                 <Button
//                   variant="danger"
//                   onClick={() =>
//                     removeItem.mutate(item.productId)
//                   }
//                 >
//                   Remove
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* ACTIONS */}
//       <Card className="p-4 space-y-4">
//         <div className="flex gap-3">
//           <Button
//             variant="danger"
//             onClick={() => clearCart.mutate()}
//           >
//             Clear Cart
//           </Button>

//           <Button onClick={() => navigate("/buyers/checkout")}>
//             Checkout
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }





























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
                  ₦
                  {Number(item.price).toLocaleString()}
                </p>

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
            onClick={() =>
              navigate(
                "/buyers/checkout"
              )
            }
          >
            Checkout
          </Button>
        </div>
      </Card>
    </div>
  );
}