




import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { useBuyerProduct } from "../../hooks/buyer/useBuyerProduct";

import { useCart } from "../../hooks/cart/useCart"; 

import { toCartPayload } from "../../mappers/cart.payload";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  /* ================= FETCH PRODUCT ================= */

  const {
    data: product,
    isLoading,
    isError,
  } = useBuyerProduct(id);

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        Loading product...
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !product) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-red-500">
          Product not found
        </p>

        <Button onClick={() => navigate("/buyers/home")}>
          Go Back
        </Button>
      </div>
    );
  }

  /* ================= IMAGE ================= */

  const imageUrl =
    product.media?.[0]?.url || "/placeholder.png";

  /* ================= ADD TO CART ================= */

 const handleAddToCart = async () => {
  try {
    await addToCart(
  toCartPayload(product, quantity)
);

    navigate("/buyers/cart");
  } catch (err) {
    console.error("Add to cart failed", err);
  }
};
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline"
      >
        ← Back
      </button>

      {/* PAGE TITLE */}
      <PageHeader title={product.name} />

      {/* PRODUCT CARD */}
      <Card className="p-6">

        <div className="grid md:grid-cols-2 gap-8">

          {/* ================= IMAGE ================= */}

          <div className="w-full aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">

            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "/placeholder.png";
              }}
            />

          </div>

          {/* ================= DETAILS ================= */}

          <div className="flex flex-col gap-4">

            {/* BUSINESS */}

            <p className="text-sm text-gray-500">
              Sold by:{" "}
              {product.businessId?.businessName ||
                "Unknown Vendor"}
            </p>

            {/* PRICE */}

            <p className="text-3xl font-bold">
              ₦
              {Number(
                product.price || 0
              ).toLocaleString()}
            </p>

            {/* CATEGORY */}

            {product.category && (
              <p className="text-sm text-gray-600">
                Category: {product.category}
              </p>
            )}

            {/* STOCK */}

            <p
              className={
                product.inStock
                  ? "text-green-600 font-medium"
                  : "text-red-500 font-medium"
              }
            >
              {product.inStock
                ? `In Stock (${product.stock ?? 0})`
                : "Out of Stock"}
            </p>

            {/* QUANTITY */}

            <div className="flex items-center gap-4">

              <button
                onClick={() =>
                  setQuantity((q) =>
                    Math.max(1, q - 1)
                  )
                }
                className="px-4 py-2 border rounded-lg"
              >
                -
              </button>

              <span className="text-lg font-semibold min-w-[30px] text-center">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="px-4 py-2 border rounded-lg"
              >
                +
              </button>

            </div>

            {/* ADD TO CART */}

            <Button
              onClick={() =>
                void handleAddToCart()
              }
              disabled={!product.inStock}
              className="w-full"
            >
              Add to Cart
            </Button>

            {/* DESCRIPTION */}

            <Card className="p-4 bg-gray-50">

              <h3 className="font-semibold mb-2">
                Description
              </h3>

              <p className="text-sm text-gray-600">
                {product.description ||
                  "No description available"}
              </p>

            </Card>

          </div>

        </div>

      </Card>

    </div>
  );
}

