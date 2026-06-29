


import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Download, BookOpen, Laptop, Gift } from "lucide-react";

import { productService } from "../../services/product.service";
import { useCart } from "../../hooks/cart/useCartPublick";
import { useWishlist } from "../../hooks/buyer/useWishlist";

import { ProductCard } from "../../components/buyer/digitalplace/ProductCard";
import { ProductFilters } from "../../components/buyer/digitalplace/ProductFilters";
import { ProductQuickView } from "../../components/buyer/digitalplace/ProductQuickView";

import { toCartPayload } from "../../mappers/cart.payload";

type Product = {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  price: number;
  category?: string;
  createdAt?: string;
  media?: { type?: string; url?: string }[];
};

export default function DigitalProducts() {
  const navigate = useNavigate();

  const { cartCount, addToCart } = useCart();
  const { toggleWishlist, isWished } = useWishlist();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [category, setCategory] = useState("all");
  const [quickView, setQuickView] = useState<any>(null);

  const { data } = useQuery({
    queryKey: ["digital-products"],
    queryFn: () => productService.getProducts(),
  });

  const products: Product[] = data?.products ?? [];

  const normalizedProducts = useMemo(() => {
    return products.map((p) => ({
      ...p,
      image:
        p.media?.find((m) => m.type === "image")?.url ||
        p.media?.[0]?.url ||
        "/placeholder.png",
    }));
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...normalizedProducts];

    result = result.filter((p) => {
      const name = (p.name || p.title || "").toLowerCase();

      return name.includes(search.toLowerCase());
    });

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    switch (sortBy) {
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;

      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;

      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt ?? "").getTime() -
            new Date(a.createdAt ?? "").getTime()
        );
        break;
    }

    return result;
  }, [normalizedProducts, search, category, sortBy]);

  const categories = [
    "all",
    "ebooks",
    "courses",
    "software",
    "templates",
    "gift cards",
    "music",
    "videos",
    "ai tools",
  ];

  const handleAddToCart = async (product: any) => {
    await addToCart.mutateAsync(toCartPayload(product, 1));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Hero */}

      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white p-10">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

          <div>

            <h1 className="text-5xl font-bold">
              Digital Products
            </h1>

            <p className="mt-4 text-lg text-indigo-100 max-w-2xl">
              Purchase premium digital products including eBooks,
              online courses, software, templates, AI tools,
              gift cards and downloadable resources.
            </p>

            <button
              onClick={() => navigate("/buyers/cart")}
              className="mt-8 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold"
            >
              Cart ({cartCount})
            </button>

          </div>

          <Download size={170} />
        </div>
      </div>

      {/* Features */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <BookOpen className="mx-auto mb-3" size={40} />
          <h3 className="font-bold">eBooks</h3>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <Laptop className="mx-auto mb-3" size={40} />
          <h3 className="font-bold">Software</h3>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <Gift className="mx-auto mb-3" size={40} />
          <h3 className="font-bold">Gift Cards</h3>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <Download className="mx-auto mb-3" size={40} />
          <h3 className="font-bold">Instant Download</h3>
        </div>

      </div>

      <ProductFilters
        categories={categories}
        selectedCategory={category}
        setSelectedCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        search={search}
        setSearch={setSearch}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {filtered.map((product) => (

          <ProductCard
            key={product._id || product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onQuickView={setQuickView}
            isWished={isWished}
            toggleWishlist={toggleWishlist}
          />

        ))}

      </div>

      <ProductQuickView
        product={quickView}
        onClose={() => setQuickView(null)}
      />

    </div>
  );
}