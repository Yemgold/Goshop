



import { useState, useMemo } from "react";
import type { Product } from "../../../types/vendor.types";

import ProductGrid from "../../../components/pos/ProductGrid";
import CartPanel from "../../../components/pos/CartPanel";
import ScannerInput from "../../../components/pos/ScannerInput";
import CheckoutModal from "../../../components/pos/CheckoutModal";

type CartItem = Product & {
  qty: number;
};

export default function POSPage() {
  const [products] = useState<Product[]>([
    { id: "1", name: "Rice", price: 5000, stock: 20, status: "Active" },
    { id: "2", name: "Oil", price: 3000, stock: 15, status: "Active" },
    { id: "3", name: "Beans", price: 2500, stock: 10, status: "Active" },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  // 📦 STOCK SAFE MAP
  const cartMap = useMemo(() => {
    return cart.reduce((acc, item) => {
      acc[item.id] = item.qty;
      return acc;
    }, {} as Record<string, number>);
  }, [cart]);

  // 🔍 FILTER PRODUCTS
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // ➕ ADD TO CART
  const addToCart = (product: Product) => {
    const existing = cart.find((c) => c.id === product.id);

    const qty = existing?.qty || 0;
    if (qty >= product.stock) return;

    setCart((prev) => {
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // 🔁 UPDATE QTY
  const updateQty = (id: string, qty: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    if (qty > product.stock) return;

    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) =>
            i.id === id ? { ...i, qty } : i
          )
    );
  };

  // 💰 TOTAL
  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }, [cart]);

  // 📡 SCAN HANDLER
  const handleScan = (code: string) => {
    const product = products.find((p) => p.id === code);
    if (product) addToCart(product);
  };

  // 🧾 CHECKOUT
  const handleConfirmCheckout = (paymentMethod: string) => {
    const order = {
      items: cart.map((i) => ({
        productId: i.id,
        quantity: i.qty,
        price: i.price,
      })),
      total,
      paymentMethod,
      staffId: "staff-001",
      createdAt: new Date().toISOString(),
    };

    console.log(order);

    setCart([]);
    setShowCheckout(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* 🟩 LEFT SIDE */}
      <div className="md:col-span-2 space-y-4">

        <ScannerInput onScan={handleScan} />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full border p-2 rounded"
        />

        <ProductGrid
          products={filteredProducts}
          cartMap={cartMap}
          onSelect={addToCart}
        />
      </div>

      {/* 🟦 RIGHT SIDE */}
      <CartPanel
        cart={cart}
        total={total}
        onIncrease={(id) =>
          updateQty(
            id,
            (cart.find((c) => c.id === id)?.qty || 0) + 1
          )
        }
        onDecrease={(id) =>
          updateQty(
            id,
            (cart.find((c) => c.id === id)?.qty || 0) - 1
          )
        }
        onRemove={(id) => updateQty(id, 0)}
        onCheckout={() => setShowCheckout(true)}
      />

      {/* 💳 CHECKOUT MODAL */}
      <CheckoutModal
        isOpen={showCheckout}
        total={total}
        onClose={() => setShowCheckout(false)}
        onConfirm={handleConfirmCheckout}
      />
    </div>
  );
}