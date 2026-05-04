

import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// API
import { getBuyerProducts } from "../../services/buyer.service"; 
import type { BuyerProduct } from "../../types/buyer.types"; 

// UI
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";

// STORE (optional cart)
import { useCartStore } from "../../store/cart.store";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  // 🚀 REACT QUERY
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<BuyerProduct[]>({
    queryKey: ["products"],
    queryFn: getBuyerProducts,
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      {/* HEADER */}
      <PageHeader title="Products" />

      {/* LOADING */}
      {isLoading && (
        <div className="text-center text-gray-500">
          Loading products...
        </div>
      )}

      {/* ERROR */}
      {isError && (
        <div className="text-center text-red-500">
          Failed to load products
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && products.length === 0 && (
        <div className="text-center text-gray-500">
          No products found
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

        {products.map((product) => (

<Card
  key={product.id}
  className="p-3 flex flex-col h-full group"
>

  {/* IMAGE */}
  <div className="w-full aspect-[4/3] overflow-hidden rounded cursor-pointer bg-gray-100">
    <img
      src={product.image}
      alt={product.title}
      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      onClick={() =>
        navigate(`/buyer/product/${product.id}`)
      }
    />
  </div>

  {/* CONTENT */}
  <div className="flex flex-col flex-1">

    <h2 className="font-semibold mt-2 line-clamp-2">
      {product.title}
    </h2>

    <p className="text-sm text-gray-500">
      {product.vendor}
    </p>

    <p className="font-bold mt-1">
      ₦{product.price.toLocaleString()}
    </p>

    {/* ACTIONS (ALIGNED BOTTOM) */}
    <div className="mt-auto pt-3 flex gap-2">

      <Button
        onClick={() =>
          navigate(`/buyer/product/${product.id}`)
        }
        className="flex-1"
      >
        View
      </Button>

      <Button
        variant="danger"
        onClick={() => addToCart(product)}
        className="flex-1"
      >
        Add to Cart
      </Button>

    </div>

  </div>

</Card>



        ))}

      </div>
    </div>
  );
};

export default ProductList;