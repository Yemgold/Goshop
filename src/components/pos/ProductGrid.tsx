




export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: "Active" | "Inactive";
};

type Props = {
  products: Product[];
  cartMap?: Record<string, number>; // optional: current cart quantities
  onSelect: (product: Product) => void;
};

export default function ProductGrid({
  products,
  cartMap = {},
  onSelect,
}: Props) {
  if (!products.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No products available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {products.map((product) => {
        const inCartQty = cartMap[product.id] || 0;
        const availableStock = product.stock - inCartQty;
        const isOutOfStock = availableStock <= 0;

        return (
          <div
            key={product.id}
            onClick={() => {
              if (isOutOfStock) return;
              onSelect(product);
            }}
            className={`border p-3 rounded transition
              ${
                isOutOfStock
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-gray-100"
              }
            `}
          >
            {/* Name */}
            <p className="font-semibold">{product.name}</p>

            {/* Price */}
            <p className="text-sm text-gray-500">
              ₦{product.price.toLocaleString()}
            </p>

            {/* Stock */}
            <p
              className={`text-xs mt-1 ${
                isOutOfStock ? "text-red-500" : "text-gray-400"
              }`}
            >
              {isOutOfStock
                ? "Out of stock"
                : `Stock: ${availableStock}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}