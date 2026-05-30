


import { ShoppingBag, ShoppingCart, PackageSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

type EmptyStateProps = {
  variant: "products" | "cart" | "orders";
  onAction?: () => void;
};

export function EmptyState({ variant, onAction }: EmptyStateProps) {
  const navigate = useNavigate();

  const config = {
    products: {
      icon: PackageSearch,
      title: "No products found",
      description: "Try adjusting your filters or search terms.",
      buttonText: "Start Shopping",
      action: () => navigate("/buyers/home"),
    },

    cart: {
      icon: ShoppingCart,
      title: "Your cart is empty",
      description: "Add items you love to get started.",
      buttonText: "Browse Products",
      action: () => navigate("/buyers/products"),
    },

    orders: {
      icon: ShoppingBag,
      title: "No orders yet",
      description: "Start shopping and your orders will appear here.",
      buttonText: "Start Shopping",
      action: () => navigate("/buyers/home"),
    },
  };

  const current = config[variant];
  const Icon = current.icon;

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 space-y-6">

      <div className="bg-gray-100 p-6 rounded-full">
        <Icon size={48} className="text-gray-500" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">
          {current.title}
        </h2>

        <p className="text-sm text-gray-500 max-w-sm">
          {current.description}
        </p>
      </div>

      <Button onClick={onAction ?? current.action}>
        {current.buttonText}
      </Button>
    </div>
  );
}