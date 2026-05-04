import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getBuyerProductByIdAPI } from "../../api/buyer/buyer.api";
import { useCartStore } from "../../store/cart.store";
import type { BuyerProduct } from "../../types/buyer.types";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  /* ================= SINGLE PRODUCT ================= */
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<BuyerProduct>({
    queryKey: ["product", id],
    queryFn: () => {
      if (!id) throw new Error("Missing product id");
      return getBuyerProductByIdAPI(id);
    },
    enabled: !!id,
  });

  /* ================= LOADING ================= */
  if (isLoading) {
    return <div className="p-6 text-center">Loading product...</div>;
  }

  /* ================= ERROR ================= */
  if (isError || !product) {
    return (
      <div className="p-6 text-center space-y-3">
        <p className="text-red-500">Product not found</p>
        <Button onClick={() => navigate("/buyer/home")}>
          Go Back
        </Button>
      </div>
    );
  }

  /* ================= CART ================= */
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    navigate("/buyer/cart");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      <button
        onClick={() => navigate(-1)}
        className="text-blue-500"
      >
        ← Back
      </button>

      <PageHeader title={product.title} />

      <Card className="p-4">

  <div className="grid md:grid-cols-2 gap-6">

    {/* IMAGE */}
    <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center group">
      <img
        src={product.image}
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    {/* DETAILS */}
    <div className="flex flex-col gap-4">

      <p className="text-gray-500">
        Sold by: {product.vendor}
      </p>

      <p className="text-2xl font-bold">
        ₦{product.price.toLocaleString()}
      </p>

      <p className={product.inStock ? "text-green-600" : "text-red-500"}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>

      {/* QUANTITY */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="px-3 py-1 border rounded"
        >
          -
        </button>

        <span className="min-w-[20px] text-center">
          {quantity}
        </span>

        <button
          onClick={() => setQuantity(q => q + 1)}
          className="px-3 py-1 border rounded"
        >
          +
        </button>
      </div>

      {/* ACTION */}
      <Button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className="w-full"
      >
        Add to Cart
      </Button>

      {/* DESCRIPTION */}
      <Card className="p-3 text-sm text-gray-600">
        {product.description}
      </Card>

    </div>

  </div>

</Card>



      

    </div>
  );
}