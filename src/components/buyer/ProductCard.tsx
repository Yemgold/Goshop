



import { Heart, Eye } from "lucide-react";

export function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isWished,
  toggleWishlist,
}: any) {
  return (
    <div className="border rounded-lg p-3 relative hover:shadow-lg transition">
      {/* WISHLIST */}
      <button
        onClick={() => toggleWishlist(product._id)}
        className="absolute top-2 right-2"
      >
        <Heart
          size={18}
          className={
            isWished(product._id)
              ? "text-red-500 fill-red-500"
              : ""
          }
        />
      </button>

      {/* IMAGE */}
      <img
        src={product.media?.[0]?.url}
        className="h-40 w-full object-contain cursor-pointer"
        onClick={() => onQuickView(product)}
      />

      {/* TITLE */}
      <h3 className="font-semibold mt-2">
        {product.title || product.name}
      </h3>

      {/* PRICE */}
      <p className="font-bold">
        ₦{product.price}
      </p>

      {/* ACTIONS */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onQuickView(product)}
          className="flex-1 border p-1 rounded flex items-center justify-center gap-1"
        >
          <Eye size={14} /> View
        </button>

        <button
          onClick={() => onAddToCart(product)}
          className="flex-1 bg-black text-white p-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}