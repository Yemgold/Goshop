


import CartItem from "./CartItem";

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type Props = {
  cart: CartItemType[];
  total: number;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
};

export default function CartPanel({
  cart,
  total,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col h-full">
      
      {/* Header */}
      <h2 className="text-xl font-bold mb-4">Cart</h2>

      {/* Items */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No items added yet
          </p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 border-t pt-4">
        
        {/* Total */}
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          disabled={cart.length === 0}
          className={`w-full mt-4 py-2 rounded text-white transition
            ${
              cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }
          `}
        >
          Complete Sale
        </button>
      </div>
    </div>
  );
}