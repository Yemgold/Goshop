



import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useState, useMemo, useEffect } from "react";

import { getBuyerProducts,getCart } from "../../services/buyer.service";
import { useCartStore } from "../../store/cart.store";
import type { BuyerProduct } from "../../types/buyer.types";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyState } from "../../components/ui/EmptyState";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Phones",
  "Home",
  "Gaming",
];

export default function BuyerHome() {
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.items);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [toast, setToast] = useState("");
  const [recent, setRecent] = useState<BuyerProduct[]>([]);

  const hydrate = useCartStore((s) => s.hydrateFromAPI);

useEffect(() => {
  let mounted = true;

  async function loadCart() {
    try {
      const apiCart = await getCart();

      if (mounted && apiCart) {
        hydrate(apiCart);
      }
    } catch (err) {
      console.log("No API cart (guest user)");
    }
  }

  loadCart();

  return () => {
    mounted = false;
  };
}, [hydrate]);

  /* ================= PRODUCTS ================= */
  const {
    data: products = [],
    isLoading,
    error,
    refetch,
  } = useQuery<BuyerProduct[]>({
    queryKey: ["products"],
    queryFn: getBuyerProducts,
  });

  /* ================= FEATURED ================= */
  const featured = products.slice(0, 4);

  /* ================= FILTER ================= */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const title = p.title?.toLowerCase() || "";
      const vendor = p.vendor?.toLowerCase() || "";
      const category = p.category?.toLowerCase() || "";

      const searchText = search.toLowerCase();

      const matchSearch =
        title.includes(searchText) || vendor.includes(searchText);

      const matchCategory =
        activeCategory === "All" ||
        category === activeCategory.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [products, search, activeCategory]);

  /* ================= RECOMMENDED ================= */
  const recommended = useMemo(() => {
    if (recent.length === 0) return [];

    const last = recent[0];

    return products.filter(
      (p) => p.category === last.category && p.id !== last.id
    );
  }, [recent, products]);

  /* ================= CART ================= */
  const handleAddToCart = (product: BuyerProduct) => {
    addToCart(product);
    setToast(`Added ${product.title}`);

    setTimeout(() => setToast(""), 1500);
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <PageHeader title="Marketplace" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-56 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="p-6 text-center space-y-4">
        <PageHeader title="Marketplace" />
        <p className="text-red-500">Failed to load products</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">

      {/* ================= HERO ================= */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-xl flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Discover Amazing Deals 🔥
          </h1>
          <p className="text-sm mt-2 text-gray-300">
            Shop top products at the best prices
          </p>

          <Button className="mt-4" onClick={() => setActiveCategory("All")}>
            Shop Now
          </Button>
        </div>

        <img src="/images/hero.png" className="h-32 md:h-40 mt-4 md:mt-0" />
      </div>

      {/* ================= HEADER ================= */}
      <PageHeader title="Marketplace" />

      {/* ================= TOP PICKS ================= */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">🔥 Top Picks</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((product) => (

<Card
  key={product.id}
  className="p-3 flex flex-col h-full group"
>

  {/* IMAGE */}
  <div className="w-full aspect-[4/3] overflow-hidden rounded cursor-pointer bg-gray-100">
    <img
      src={product.image}
      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      onClick={() => {
        setRecent((prev) => {
          const exists = prev.find((p) => p.id === product.id);
          if (exists) return prev;
          return [product, ...prev].slice(0, 4);
        });

        navigate(`/buyer/product/${product.id}`);
      }}
    />
  </div>

  {/* CONTENT */}
  <div className="flex flex-col flex-1">

    <h2 className="font-semibold mt-2 line-clamp-2">
      {product.title}
    </h2>

    <p className="text-xs text-gray-500">
      {product.vendor}
    </p>

    <p className="font-bold mt-1">
      ₦{product.price.toLocaleString()}
    </p>

    {/* PUSH BUTTON TO BOTTOM */}
    <div className="mt-auto pt-3">
      <Button
        onClick={() => handleAddToCart(product)}
        disabled={!product.inStock}
        className="w-full"
      >
        Add to Cart
      </Button>
    </div>

  </div>
</Card>


          ))}
        </div>
      </div>

      {/* ================= TOP BAR ================= */}
      <div className="flex flex-col md:flex-row justify-between gap-3">

        <div className="flex gap-2 items-center">

          {/* CART */}
          <div
            onClick={() => navigate("/buyer/cart")}
            className="text-sm bg-gray-100 px-3 py-1 rounded cursor-pointer hover:bg-gray-200"
          >
            🛒 Cart: {cartItems.length}
          </div>

          {/* ORDERS */}
          <Button onClick={() => navigate("/buyer/orders")}>
            Orders
          </Button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products or brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm w-full md:w-1/3"
        />
      </div>

      {/* ================= CATEGORY ================= */}
      <div className="flex gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full border text-sm ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ================= PRODUCTS ================= */}
      {filteredProducts.length === 0 ? (
        <EmptyState text="No products found" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            
<Card
  key={product.id}
  className="p-3 flex flex-col h-full group"
>

  {/* IMAGE */}
  <div className="w-full aspect-[4/3] overflow-hidden rounded cursor-pointer bg-gray-100">
    <img
      src={product.image}
      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      onClick={() => {
        setRecent((prev) => {
          const exists = prev.find((p) => p.id === product.id);
          if (exists) return prev;
          return [product, ...prev].slice(0, 4);
        });

        navigate(`/buyer/product/${product.id}`);
      }}
    />
  </div>

  {/* CONTENT */}
  <div className="flex flex-col flex-1">

    <h2 className="font-semibold mt-2 line-clamp-2">
      {product.title}
    </h2>

    <p className="text-xs text-gray-500">
      {product.vendor}
    </p>

    <p className="font-bold mt-1">
      ₦{product.price.toLocaleString()}
    </p>

    {/* PUSH BUTTON TO BOTTOM */}
    <div className="mt-auto pt-3">
      <Button
        onClick={() => handleAddToCart(product)}
        disabled={!product.inStock}
        className="w-full"
      >
        Add to Cart
      </Button>
    </div>

  </div>
</Card>
            
            ))}
        </div>
      )}

      {/* ================= RECENT ================= */}
      {recent.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">🕒 Recently Viewed</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recent.map((item) => (
              <Card
                key={item.id}
                onClick={() =>
                  navigate(`/buyer/product/${item.id}`)
                }
                className="p-2 cursor-pointer"
              >
                <img
                  src={item.image}
                  className="h-28 w-full object-cover rounded"
                />
                <p className="text-sm">{item.title}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ================= RECOMMENDED ================= */}
      {recommended.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">🎯 Recommended</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommended.slice(0, 4).map((item) => (
              <Card
                key={item.id}
                onClick={() =>
                  navigate(`/buyer/product/${item.id}`)
                }
                className="p-2 cursor-pointer"
              >
                <img
                  src={item.image}
                  className="h-28 w-full object-cover rounded"
                />
                <p className="text-sm">{item.title}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ================= TOAST ================= */}
      {toast && (
        <div
          onClick={() => navigate("/buyer/cart")}
          className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded cursor-pointer"
        >
          {toast} (View Cart)
        </div>
      )}
    </div>
  );
}