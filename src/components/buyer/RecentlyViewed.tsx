


import { useNavigate } from "react-router-dom";
import { useRecentlyViewed } from "../../hooks/buyer/useRecentlyViewed";

export function RecentlyViewed() {
  const navigate = useNavigate();
  const { items, clearRecentlyViewed } = useRecentlyViewed();

  if (!items.length) return null;

  return (
    <div className="space-y-3 mt-10">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          👀 Recently Viewed
        </h2>

        <button
          onClick={clearRecentlyViewed}
          className="text-sm text-red-500"
        >
          Clear
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {items.map((product) => (
          <div
            key={product._id}
            onClick={() =>
              navigate(`/buyers/product/${product._id}`)
            }
            className="min-w-[160px] cursor-pointer border rounded-lg p-2 hover:shadow-md"
          >
            <img
              src={product.media?.[0]?.url || "/placeholder.png"}
              className="h-24 w-full object-cover rounded"
            />

            <p className="text-sm font-medium mt-1 line-clamp-1">
              {product.title || product.name}
            </p>

            <p className="text-xs text-gray-500">
              ₦{Number(product.price || 0).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}