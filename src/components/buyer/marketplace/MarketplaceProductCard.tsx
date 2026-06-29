


import { motion } from "framer-motion";
import {
  Heart,
  Eye,
  ShoppingCart,
  Truck,
  Star,
  Flame,
} from "lucide-react";

import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";

type Props = {
  product: any;
  onView: () => void;
  onAddToCart: () => void;
};

export default function MarketplaceProductCard({
  product,
  onView,
  onAddToCart,
}: Props) {
  const imageUrl =
    product?.media?.find((m: any) => m?.type === "image")?.url ||
    product?.media?.[0]?.url ||
    "/placeholder.png";

  const stock = Number(product?.stock || 0);

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
    >
      <Card className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md hover:shadow-2xl transition-all duration-300">
        {/* ================= IMAGE ================= */}

        <div className="relative group overflow-hidden">
          <img
            src={imageUrl}
            alt={product?.name}
            onClick={onView}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/placeholder.png";
            }}
            className="h-64 w-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
          />

          {/* NEW BADGE */}

          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow">
            <Flame size={12} />
            NEW
          </div>

          {/* WISHLIST */}

          <button
            className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-lg transition hover:bg-red-50"
          >
            <Heart
              size={18}
              className="text-gray-700 hover:text-red-500"
            />
          </button>
        </div>

        {/* ================= BODY ================= */}

        <div className="p-5 flex flex-col gap-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {product?.category || "General"}
          </p>

          <h2 className="line-clamp-2 text-lg font-bold">
            {product?.name}
          </h2>

          {/* Rating */}

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4].map((n) => (
              <Star
                key={n}
                size={15}
                fill="#facc15"
                stroke="#facc15"
              />
            ))}

            <Star size={15} />

            <span className="ml-2 text-xs text-gray-500">
              (4.0)
            </span>
          </div>

          {/* PRICE */}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">
                ₦
                {Number(product?.price || 0).toLocaleString()}
              </p>

              <div className="mt-1 flex items-center gap-1 text-green-600">
                <Truck size={16} />
                <span className="text-sm">
                  Free Delivery
                </span>
              </div>
            </div>
          </div>

          {/* STOCK */}

          {stock > 10 ? (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 w-fit">
              In Stock
            </span>
          ) : stock > 0 ? (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 w-fit">
              Only {stock} left
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 w-fit">
              Out of Stock
            </span>
          )}

          {/* ACTIONS */}

          <div className="mt-2 grid grid-cols-2 gap-3">
            <Button
              onClick={onView}
              className="flex items-center justify-center gap-2"
            >
              <Eye size={18} />
              View
            </Button>

            <Button
              variant="danger"
              disabled={stock <= 0}
              onClick={onAddToCart}
              className="flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Cart
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}