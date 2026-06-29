
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";

// import { productService } from "../../services/product.service";

// import MarketplaceProductCard from "../../components/buyer/marketplace/MarketplaceProductCard";


// import { motion, AnimatePresence } from "framer-motion";

// import {
//   Search,
//   ShoppingBag,
//   Sparkles,
//   Grid2X2,
//   List,
//   ArrowUpDown,
 
// } from "lucide-react";

// import { useCart } from "../../hooks/cart/useCart";
// import { toCartPayload } from "../../mappers/cart.payload";

// const ProductList: React.FC = () => {
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const [search, setSearch] = React.useState("");
// const [category, setCategory] = React.useState("All");
// const [sortBy, setSortBy] = React.useState("Newest");
// const [view, setView] = React.useState<"grid" | "list">("grid");

//   /* ================= FETCH PRODUCTS ================= */

//   const { data, isLoading, isError } = useQuery({
//   queryKey: ["products"],
//   queryFn: () => productService.getProducts({ page: 1, limit: 10 }),
// });

//   /* ================= SAFE PRODUCTS ================= */

//   const products = data?.products ?? [];
//   const categories = [
//   "All",
//   "Electronics",
//   "Fashion",
//   "Phones",
//   "Computers",
//   "Home",
//   "Beauty",
//   "Food",
//   "Vehicles",
// ];




//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-6">
      
//       {/* ================= HERO ================= */}

// <motion.section
//   initial={{ opacity: 0, y: 25 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   className="relative overflow-hidden rounded-3xl bg-gradient-to-r
//              from-black via-gray-900 to-gray-800
//              text-white p-8 md:p-12 shadow-2xl"
// >
//   {/* Decorative circles */}
//   <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
//   <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-white/5 blur-3xl" />

//   <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
//     {/* LEFT */}
//     <div>
//       <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur">
//         <Sparkles size={16} />
//         <span className="text-sm font-medium">
//           Welcome to gO-Shopping Marketplace
//         </span>
//       </div>

//       <h1 className="mt-5 text-4xl md:text-5xl font-extrabold leading-tight">
//         Discover Amazing
//         <br />
//         Products Near You
//       </h1>

//       <p className="mt-5 text-gray-300 text-lg max-w-xl">
//         Shop thousands of products from trusted vendors across
//         Nigeria. Enjoy secure shopping, fast delivery and the
//         best prices every day.
//       </p>

//       {/* Stats */}
//       <div className="mt-8 flex flex-wrap gap-6">
//         <div>
//           <p className="text-3xl font-bold">
//             {products.length}+
//           </p>
//           <span className="text-gray-300 text-sm">
//             Products
//           </span>
//         </div>

//         <div>
//           <p className="text-3xl font-bold">100%</p>
//           <span className="text-gray-300 text-sm">
//             Secure Shopping
//           </span>
//         </div>

//         <div>
//           <p className="text-3xl font-bold">24/7</p>
//           <span className="text-gray-300 text-sm">
//             Customer Support
//           </span>
//         </div>
//       </div>
//     </div>

//     {/* RIGHT */}
//     <div className="hidden md:flex justify-center">
//       <motion.div
//         animate={{
//           y: [0, -15, 0],
//         }}
//         transition={{
//           duration: 3,
//           repeat: Infinity,
//         }}
//         className="w-72 h-72 rounded-full
//                    bg-white/10 backdrop-blur-lg
//                    border border-white/20
//                    flex items-center justify-center"
//       >
//         <ShoppingBag size={140} />
//       </motion.div>
//     </div>
//   </div>
// </motion.section>


// {/* ================= MARKETPLACE TOOLBAR ================= */}

// <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6">

//   {/* Top Row */}

//   <div className="flex flex-col lg:flex-row gap-4 justify-between">

//     {/* Search */}

//     <div className="relative flex-1">

//       <Search
//         size={20}
//         className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//       />

//       <input
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search products..."
//         className="w-full pl-12 pr-4 py-3 rounded-xl border
//                    focus:ring-2 focus:ring-black outline-none"
//       />
//     </div>

//     {/* Sort */}

//     <div className="flex gap-3">

//       <div className="relative">

//         <ArrowUpDown
//           size={18}
//           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
//         />

//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           className="pl-10 pr-8 py-3 rounded-xl border appearance-none"
//         >
//           <option>Newest</option>
//           <option>Lowest Price</option>
//           <option>Highest Price</option>
//           <option>Most Popular</option>
//         </select>

//       </div>

//       {/* View Buttons */}

//       <div className="flex rounded-xl border overflow-hidden">

//         <button
//           onClick={() => setView("grid")}
//           className={`p-3 ${
//             view === "grid"
//               ? "bg-black text-white"
//               : "bg-white"
//           }`}
//         >
//           <Grid2X2 size={20} />
//         </button>

//         <button
//           onClick={() => setView("list")}
//           className={`p-3 ${
//             view === "list"
//               ? "bg-black text-white"
//               : "bg-white"
//           }`}
//         >
//           <List size={20} />
//         </button>

//       </div>

//     </div>

//   </div>

//   {/* Categories */}

//   <div className="flex gap-3 overflow-x-auto pb-2">

//     {categories.map((cat) => (

//       <button
//         key={cat}
//         onClick={() => setCategory(cat)}
//         className={`whitespace-nowrap px-5 py-2 rounded-full transition

//         ${
//           category === cat
//             ? "bg-black text-white"
//             : "bg-gray-100 hover:bg-gray-200"
//         }`}
//       >
//         {cat}
//       </button>

//     ))}

//   </div>

//   {/* Bottom Row */}

//   <div className="flex flex-wrap justify-between items-center gap-3">

//     <div className="text-gray-600">

//       Showing

//       <span className="font-bold text-black mx-2">

//         {products.length}

//       </span>

//       Products

//     </div>

//     <div className="flex gap-2 flex-wrap">

//       <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">

//         {sortBy}

//       </span>

//       <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">

//         {category}

//       </span>

//     </div>

//   </div>

// </div>


// {isLoading && (
//   <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//     {Array.from({ length: 8 }).map((_, i) => (
//       <div
//         key={i}
//         className="rounded-3xl bg-white shadow-lg overflow-hidden animate-pulse"
//       >
//         <div className="h-64 bg-gray-200" />

//         <div className="p-5 space-y-3">
//           <div className="h-5 bg-gray-200 rounded" />
//           <div className="h-4 w-2/3 bg-gray-200 rounded" />
//           <div className="h-8 bg-gray-200 rounded-xl" />
//         </div>
//       </div>
//     ))}
//   </div>
// )}

      



//       {isError && (
//         <p className="text-center text-red-500">
//           Error loading products
//         </p>
//       )}


//    {isLoading ? (
//   <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//     {Array.from({ length: 8 }).map((_, i) => (
//       <div
//         key={i}
//         className="rounded-3xl bg-white shadow-lg overflow-hidden animate-pulse"
//       >
//         <div className="h-64 bg-gray-200" />

//         <div className="p-5 space-y-3">
//           <div className="h-5 bg-gray-200 rounded" />
//           <div className="h-4 w-2/3 bg-gray-200 rounded" />
//           <div className="h-8 bg-gray-200 rounded-xl" />
//         </div>
//       </div>
//     ))}
//   </div>
// ) : (
//   <AnimatePresence mode="wait">
//     <motion.div
//       layout
//       className={`grid gap-6 ${
//         view === "grid"
//           ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//           : "grid-cols-1"
//       }`}
//     >
//       {products.map((product: any) => {
//         const productId = product?._id || product?.id;

//         return (
//           <motion.div
//             key={productId}
//             layout
//             initial={{ opacity: 0, y: 40, scale: 0.96 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20 }}
//             whileHover={{ y: -8 }}
//             transition={{
//               duration: 0.35,
//               ease: "easeOut",
//             }}
//           >
//             <MarketplaceProductCard
//               product={product}
//               onView={() =>
//                 navigate(`/buyers/product/${productId}`)
//               }
//               onAddToCart={async () => {
//                 try {
//                   await addToCart.mutateAsync(
//                     toCartPayload(product, 1)
//                   );

//                   toast.success("Added to cart");
//                 } catch (error: any) {
//                   toast.error(
//                     error?.response?.data?.message ||
//                       "Unable to add item"
//                   );
//                 }
//               }}
//             />
//           </motion.div>
//         );
//       })}
//     </motion.div>
//   </AnimatePresence>
// )}
    



//    </div>
//   );
// };    
// export default ProductList;



















































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