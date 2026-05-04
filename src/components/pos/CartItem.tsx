



export type CartItemType = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type Props = {
  item: CartItemType;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  const subtotal = item.price * item.qty;

  return (
    <div className="flex justify-between items-center border-b pb-2">
      
      {/* Item Info */}
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        <p className="text-xs text-gray-500">
          ₦{item.price.toLocaleString()} × {item.qty}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        
        <button
          onClick={() => onDecrease(item.id)}
          className="px-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>

        <span className="min-w-[20px] text-center">
          {item.qty}
        </span>

        <button
          onClick={() => onIncrease(item.id)}
          className="px-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>

      </div>

      {/* Subtotal + Remove */}
      <div className="text-right ml-4">
        <p className="font-semibold">
          ₦{subtotal.toLocaleString()}
        </p>

        <button
          onClick={() => onRemove(item.id)}
          className="text-xs text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}