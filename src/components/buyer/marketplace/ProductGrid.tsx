


import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarketplaceProductCard from "./MarketplaceProductCard";

interface Props {
  products: any[];
  view: "grid" | "list";
  onView: (product: any) => void;
  onAddToCart: (product: any) => void | Promise<void>;
}

const ProductGrid: React.FC<Props> = ({
  products,
  view,
  onView,
  onAddToCart,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        layout
        className={`grid gap-6 ${
          view === "grid"
            ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {products.map((product: any) => {
          const productId = product?._id || product?.id;

          return (
            <motion.div
              key={productId}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ y: -8 }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >
              <MarketplaceProductCard
                product={product}
                onView={() => onView(product)}
                onAddToCart={() => onAddToCart(product)}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductGrid;