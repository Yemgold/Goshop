


import { useCartToast } from "../cart/CartToast"; 

export default function CartToastUI() {
  const toast = useCartToast((s) => s.toast);

  if (!toast) return null;

  return (
    <div className="
      fixed top-5 right-5 z-[9999]
      bg-white shadow-lg rounded-xl
      p-3 w-[260px]
      animate-slide-in
      border
    ">
      <div className="flex gap-3 items-center">
        <img
          src={toast.image || "/placeholder.png"}
          className="w-12 h-12 rounded-lg object-cover"
        />

        <div className="flex flex-col">
          <p className="text-sm font-semibold">
            Added to cart
          </p>
          <p className="text-xs text-gray-600">
            {toast.name}
          </p>
          <p className="text-xs text-gray-500">
            Qty: {toast.quantity}
          </p>
        </div>
      </div>
    </div>
  );
}