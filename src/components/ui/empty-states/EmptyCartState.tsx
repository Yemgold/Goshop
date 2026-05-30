

import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export function EmptyCartState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 space-y-6">

      {/* ICON */}
      <div className="bg-gray-100 p-6 rounded-full">
        <ShoppingCart size={48} className="text-gray-500" />
      </div>

      {/* TEXT */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Your cart is empty
        </h2>

        <p className="text-sm text-gray-500 max-w-sm">
          Looks like you haven’t added anything yet. Explore products and
          add items you love.
        </p>
      </div>

      {/* PRIMARY CTA */}
      <Button
        onClick={() => navigate("/buyers/home")}
        className="px-6 py-3"
      >
        Start Shopping
      </Button>

      {/* SECONDARY CTA */}
      <button
        onClick={() => navigate("/buyers/deals")}
        className="text-sm text-blue-600 hover:underline"
      >
        View deals & discounts
      </button>

    </div>
  );
}