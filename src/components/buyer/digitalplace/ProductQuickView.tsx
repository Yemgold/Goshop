


import { X } from "lucide-react";

export function ProductQuickView({
  product,
  onClose,
}: any) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] md:w-[500px] p-4 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2"
        >
          <X />
        </button>

        <img
          src={product.media?.[0]?.url}
          className="w-full h-60 object-contain"
        />

        <h2 className="text-lg font-bold mt-2">
          {product.title || product.name}
        </h2>

        <p className="text-gray-600">
          {product.description}
        </p>

        <p className="font-bold mt-2">
          ₦{product.price}
        </p>
      </div>
    </div>
  );
}