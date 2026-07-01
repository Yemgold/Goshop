


import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Package2, Check } from "lucide-react";

import type{ Product } from "../../types"; 

interface Props {
  products: Product[];
  selected?: Product | null;
  onSelect: (product: Product) => void;
}

export default function ProductSearch({
  products,
  selected,
  onSelect,
}: Props) 

{

     console.log("ProductSearch products:", products);

  const [query, setQuery] = useState("");
   const [open, setOpen] = useState(false);

   
   useEffect(() => {
  console.log("ProductSearch Mounted");

  return () => {
    console.log("ProductSearch Unmounted");
  };
}, []);

  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ==========================================
     CLOSE WHEN CLICKING OUTSIDE
  ========================================== */

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ==========================================
     FILTER PRODUCTS
  ========================================== */

const filteredProducts = useMemo(() => {
  const list = Array.isArray(products) ? products : [];

  if (!query.trim()) return list;

  const q = query.toLowerCase();

  return list.filter((product) => {
    return (
      product.name.toLowerCase().includes(q) ||
      (product.sku ?? "").toLowerCase().includes(q) ||
      (product.category ?? "").toLowerCase().includes(q)
    );
  });
}, [products, query]);

  /* ==========================================
     SELECT PRODUCT
  ========================================== */

  function handleSelect(product: Product) {
    onSelect(product);

    setQuery(product.name);

    setOpen(false);
  }

  useEffect(() => {
    if (selected) {
      setQuery(selected.name);
    }
  }, [selected]);

  console.log("open:", open);
  console.log("query:", query);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      {/* ================= SEARCH ================= */}

      <div
        className="
        flex items-center
        rounded-2xl
        border border-slate-200
        bg-white/70
        backdrop-blur-xl
        shadow-sm
        px-4
      "
      >
        <Search
          className="text-slate-400"
          size={20}
        />

        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products..."
          className="
            w-full
            p-4
            bg-transparent
            outline-none
          "
        />
      </div>

      {/* ================= DROPDOWN ================= */}

     {/* ================= DROPDOWN ================= */}

{open && (
  <div
    className="
      absolute
      z-50
      mt-3
      w-full
      rounded-2xl
      bg-white
      shadow-2xl
      border
      overflow-hidden
      max-h-[420px]
      overflow-y-auto
    "
  >
    {filteredProducts.length === 0 ? (
      <div className="py-12 text-center">
        <Package2
          size={40}
          className="mx-auto text-gray-300"
        />

        <p className="mt-3 text-gray-500">
          No products found
        </p>
      </div>
    ) : (
      filteredProducts.map((product) => (
        <button
          key={product._id}
          type="button"
          onClick={() => handleSelect(product)}
          className="
            w-full
            flex
            items-center
            gap-4
            p-4
            hover:bg-blue-50
            transition
          "
        >
          {/* IMAGE */}

          <img
            src={
              product.media?.[0]?.url ||
              "/placeholder-product.png"
            }
            alt={product.name}
            className="
              w-16
              h-16
              rounded-xl
              object-cover
              border
            "
          />

          {/* INFO */}

          <div className="flex-1 text-left">
            <h3 className="font-semibold">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500">
              SKU: {product.sku}
            </p>

            <div className="flex gap-4 mt-1 text-sm">
              <span className="text-blue-600 font-medium">
                ₦{product.price.toLocaleString()}
              </span>

              <span className="text-green-600">
                Stock: {product.stock}
              </span>
            </div>
          </div>

          {/* SELECTED */}

          {selected?._id === product._id && (
            <Check
              className="text-green-500"
              size={22}
            />
          )}
        </button>
      ))
    )}
  </div>



)}



    </div>
  );
}