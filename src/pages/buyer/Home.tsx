import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { productService } from "../../services/product.service"; 
import { useCart } from "../../hooks/cart/useCart";
import { useWishlist } from "../../hooks/buyer/useWishlist";

import { ProductCard } from "../../components/buyer/ProductCard";
import { ProductFilters } from "../../components/buyer/ProductFilters";
import { ProductQuickView } from "../../components/buyer/ProductQuickView";

import { toCartPayload } from "../../mappers/cart.payload";

/* ================= TYPES ================= */

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

export default function BuyerHome() {
  const navigate = useNavigate();

  const { cartCount, addToCart } = useCart();
  const { toggleWishlist, isWished } = useWishlist();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [category, setCategory] = useState("all");
  const [quickView, setQuickView] = useState<any>(null);

  /* ================= FETCH PRODUCTS ================= */

const { data } = useQuery({
  queryKey: ["products"],
  queryFn: () => productService.getProducts(),
});

/* FIX: always use .products */
const products: Product[] = data?.products ?? [];


  /* ================= NORMALIZE IMAGE ================= */

  const normalizedProducts = useMemo(() => {
    return products.map((p) => ({
      ...p,
      image:
        p.media?.find((m) => m?.type === "image")?.url ||
        p.media?.[0]?.url ||
        "/placeholder.png",
    }));
  }, [products]);

  /* ================= FILTER + SORT ================= */

  const filtered = useMemo(() => {
    let result = [...normalizedProducts];

    // SEARCH
    result = result.filter((p) => {
      const name = (p.name || p.title || "").toLowerCase();
      return name.includes(search.toLowerCase());
    });

    // CATEGORY
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // SORT
    if (sortBy === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      );
    }

    return result;
  }, [normalizedProducts, search, sortBy, category]);

  /* ================= CATEGORIES (FIXED TYPES) ================= */

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((p) => p.category)
          .filter(
            (c): c is string =>
              typeof c === "string" && c.trim() !== ""
          )
      ),
    ];
  }, [products]);

  /* ================= CART ================= */

  const handleAddToCart = async (product: any) => {
    await addToCart.mutateAsync(toCartPayload(product, 1));
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Marketplace</h1>

        <button onClick={() => navigate("/buyers/cart")}>
          Cart ({cartCount})
        </button>
      </div>

      {/* FILTERS */}
      <ProductFilters
        categories={categories}
        selectedCategory={category}
        setSelectedCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        search={search}
        setSearch={setSearch}
      />

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

      {/* QUICK VIEW */}
      <ProductQuickView
        product={quickView}
        onClose={() => setQuickView(null)}
      />
    </div>
  );
}















// import { useNavigate } from "react-router-dom";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useMemo, useState, useEffect, useRef } from "react";

// import { buyerService } from "../../services/buyer.api.service";
// import { useCart } from "../../hooks/cart/useCart";
// import { useWishlist } from "../../hooks/buyer/useWishlist";

// import { ProductCard } from "../../components/buyer/ProductCard";
// import { ProductFilters } from "../../components/buyer/ProductFilters";
// import { ProductQuickView } from "../../components/buyer/ProductQuickView";

// import { toCartPayload } from "../../mappers/cart.payload";





// export default function BuyerHome() {
//   const navigate = useNavigate();

//   const { cartCount, addToCart } = useCart();
//   const { toggleWishlist, isWished } = useWishlist();

//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("popular");
//   const [category, setCategory] = useState("all");
//   const [quickView, setQuickView] = useState<any>(null);

//   const loadMoreRef = useRef<HTMLDivElement | null>(null);

//   /* ================= INFINITE QUERY ================= */


// const {
//   data,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
//   isLoading,
//   error,
//   refetch,
// } = useInfiniteQuery({
//   queryKey: ["products", search, category, sortBy],

//   initialPageParam: 1,

//   queryFn: async ({ pageParam = 1 }) => {
//     const res = await buyerService.getProductsPaginated(pageParam, 20);

//     return {
//       data: Array.isArray(res?.data) ? res.data : [],
//       meta: res?.meta ?? {
//         currentPage: pageParam,
//         totalPages: 1,
//       },
//     };
//   },

//   getNextPageParam: (lastPage) => {
//     const meta = lastPage?.meta;

//     if (!meta) return undefined;

//     const current = meta.currentPage ?? 1;
//     const total = meta.totalPages ?? 1;

//     return current < total ? current + 1 : undefined;
//   },

//   retry: 2,
// });





//   /* ================= FLATTEN PRODUCTS ================= */

// const products = useMemo(() => {
//   return (
//     data?.pages
//       ?.filter(Boolean)
//       ?.flatMap((page: any) => page?.data ?? []) ?? []
//   );
// }, [data]);


//   /* ================= FILTER + SORT ================= */
//   const filtered = useMemo(() => {
//     let result = [...products];

//     // search
//     result = result.filter((p) =>
//       (p.title || p.name)
//         ?.toLowerCase()
//         .includes(search.toLowerCase())
//     );

//     // category
//     if (category !== "all") {
//       result = result.filter((p) => p.category === category);
//     }

//     // sort
//     switch (sortBy) {
//       case "priceLow":
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case "priceHigh":
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case "newest":
//         result.reverse();
//         break;
//     }

//     return result;
//   }, [products, search, sortBy, category]);

//   /* ================= CATEGORIES ================= */
//   const categories = useMemo(() => {
//     return [
//       ...new Set(
//         products
//           .map((p) => p.category)
//           .filter(
//             (c): c is string =>
//               typeof c === "string" && c.trim() !== ""
//           )
//       ),
//     ];
//   }, [products]);

//   /* ================= INFINITE SCROLL OBSERVER ================= */
//  useEffect(() => {
//   const el = loadMoreRef.current;
//   if (!el || !hasNextPage) return;

//   const observer = new IntersectionObserver((entries) => {
//     if (entries[0].isIntersecting && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   });

//   observer.observe(el);

//   return () => observer.disconnect();
// }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

//   /* ================= ADD TO CART ================= */
//   const handleAddToCart = async (product: any) => {
//     await addToCart.mutateAsync(toCartPayload(product, 1));
//   };

//   /* ================= LOADING ================= */
//   if (isLoading) {
//     return (
//       <div className="p-6 space-y-6">
//         <h1 className="text-2xl font-bold">Marketplace</h1>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {Array.from({ length: 8 }).map((_, i) => (
//             <div
//               key={i}
//               className="h-64 bg-gray-200 animate-pulse rounded-xl"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (error) {
//     return (
//       <div className="p-6 text-center space-y-4">
//         <p className="text-red-500">Failed to load products</p>
//         <button onClick={() => refetch()}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between">
//         <h1 className="text-2xl font-bold">Marketplace</h1>

//         <button onClick={() => navigate("/buyers/cart")}>
//           Cart ({cartCount})
//         </button>
//       </div>

//       {/* FILTERS */}
//       <ProductFilters
//         categories={categories}
//         selectedCategory={category}
//         setSelectedCategory={setCategory}
//         sortBy={sortBy}
//         setSortBy={setSortBy}
//         search={search}
//         setSearch={setSearch}
//       />

//       {/* GRID */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {filtered.map((product) => (
//           <ProductCard
//             key={product._id}
//             product={product}
//             onAddToCart={handleAddToCart}
//             onQuickView={setQuickView}
//             isWished={isWished}
//             toggleWishlist={toggleWishlist}
//           />
//         ))}
//       </div>

//       {/* LOADING MORE */}
//       <div
//         ref={loadMoreRef}
//         className="h-10 flex justify-center items-center"
//       >
//         {isFetchingNextPage && (
//           <p className="text-sm text-gray-500">
//             Loading more products...
//           </p>
//         )}
//       </div>

//       {/* QUICK VIEW */}
//       <ProductQuickView
//         product={quickView}
//         onClose={() => setQuickView(null)}
//       />
//     </div>
//   );
// }