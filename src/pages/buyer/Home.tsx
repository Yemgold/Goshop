

import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { productService } from "../../services/product.service";

import MarketplaceHero from "../../components/buyer/marketplace/MarketplaceHero";
import MarketplaceToolbar from "../../components/buyer/marketplace/MarketplaceToolbar";
import MarketplaceLoading from "../../components/buyer/marketplace/MarketplaceLoading";
import ProductGrid from "../../components/buyer/marketplace/ProductGrid";



import { useCart } from "../../hooks/cart/useCartPublick";
import { toCartPayload } from "../../mappers/cart.payload";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [sortBy, setSortBy] = React.useState("Newest");
  const [view, setView] = React.useState<"grid" | "list">("grid");

  /* ================= FETCH PRODUCTS ================= */

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getProducts({
      page: 1,
      limit: 10,
    }),
  });

  /* ================= SAFE PRODUCTS ================= */

  const products = data?.products ?? [];

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Phones",
    "Computers",
    "Home",
    "Beauty",
    "Food",
    "Vehicles",
  ];



  

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <MarketplaceHero totalProducts={products.length} />

      <MarketplaceToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        view={view}
        setView={setView}
        categories={categories}
        totalProducts={products.length}
      />

      {isError && (
        <p className="text-center text-red-500">
          Error loading products
        </p>
      )}

      {isLoading ? (
        <MarketplaceLoading />
      ) : (
        <ProductGrid
          products={products}
          view={view}
          onView={(product) =>
            navigate(`/buyers/product/${product._id || product.id}`)
          }
          onAddToCart={async (product) => {
            try {
              await addToCart.mutateAsync(
                toCartPayload(product, 1)
              );

              toast.success("Added to cart");
            } catch (error: any) {
              toast.error(
                error?.response?.data?.message ||
                  "Unable to add item"
              );
            }
          }}
        />
      )}
    </div>
  );
};

export default ProductList;







// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { useMemo, useState } from "react";

// import { productService } from "../../services/product.service"; 
// import { useCart } from "../../hooks/cart/useCart";
// import { useWishlist } from "../../hooks/buyer/useWishlist";

// import { ProductCard } from "../../components/buyer/digitalplace/ProductCard";
// import { ProductFilters } from "../../components/buyer/digitalplace/ProductFilters";
// import { ProductQuickView } from "../../components/buyer/digitalplace/ProductQuickView";

// import { toCartPayload } from "../../mappers/cart.payload";

// /* ================= TYPES ================= */

// type Product = {
//   _id?: string;
//   id?: string;
//   name?: string;
//   title?: string;
//   price: number;
//   category?: string;
//   createdAt?: string;
//   media?: { type?: string; url?: string }[];
// };

// export default function BuyerHome() {
//   const navigate = useNavigate();

//   const { cartCount, addToCart } = useCart();
//   const { toggleWishlist, isWished } = useWishlist();

//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState("popular");
//   const [category, setCategory] = useState("all");
//   const [quickView, setQuickView] = useState<any>(null);

//   /* ================= FETCH PRODUCTS ================= */

// const { data } = useQuery({
//   queryKey: ["products"],
//   queryFn: () => productService.getProducts(),
// });

// /* FIX: always use .products */
// const products: Product[] = data?.products ?? [];


//   /* ================= NORMALIZE IMAGE ================= */

//   const normalizedProducts = useMemo(() => {
//     return products.map((p) => ({
//       ...p,
//       image:
//         p.media?.find((m) => m?.type === "image")?.url ||
//         p.media?.[0]?.url ||
//         "/placeholder.png",
//     }));
//   }, [products]);

//   /* ================= FILTER + SORT ================= */

//   const filtered = useMemo(() => {
//     let result = [...normalizedProducts];

//     // SEARCH
//     result = result.filter((p) => {
//       const name = (p.name || p.title || "").toLowerCase();
//       return name.includes(search.toLowerCase());
//     });

//     // CATEGORY
//     if (category !== "all") {
//       result = result.filter((p) => p.category === category);
//     }

//     // SORT
//     if (sortBy === "priceLow") {
//       result.sort((a, b) => a.price - b.price);
//     }

//     if (sortBy === "priceHigh") {
//       result.sort((a, b) => b.price - a.price);
//     }

//     if (sortBy === "newest") {
//       result.sort(
//         (a, b) =>
//           new Date(b.createdAt ?? 0).getTime() -
//           new Date(a.createdAt ?? 0).getTime()
//       );
//     }

//     return result;
//   }, [normalizedProducts, search, sortBy, category]);

//   /* ================= CATEGORIES (FIXED TYPES) ================= */

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




//   /* ================= CART ================= */

//   const handleAddToCart = async (product: any) => {
//     await addToCart.mutateAsync(toCartPayload(product, 1));
//   };

//   return (
    
//     <div className="p-6 space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
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
//             key={product._id || product.id}
//             product={product}
//             onAddToCart={handleAddToCart}
//             onQuickView={setQuickView}
//             isWished={isWished}
//             toggleWishlist={toggleWishlist}
//           />
//         ))}
//       </div>

//       {/* QUICK VIEW */}
//       <ProductQuickView
//         product={quickView}
//         onClose={() => setQuickView(null)}
//       />
//     </div>
//   );
// }


