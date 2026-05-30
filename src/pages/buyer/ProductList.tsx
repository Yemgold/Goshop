

import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import type { Product } from "../../types/buyer.types";
import { buyerService } from "../../services/buyer.api.service";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";

import { useCartStore } from "../../store/cart.store";
import { toCartPayload } from "../../mappers/cart.payload";


const ProductList: React.FC = () => {
  const navigate = useNavigate();
   const addToCart = useCartStore((state) => state.addToCart);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: buyerService.getProducts,
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <PageHeader title="Products" />

      {isLoading && (
        <p className="text-center">Loading...</p>
      )}

      {isError && (
        <p className="text-center text-red-500">
          Error loading products
        </p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => {
          const imageUrl =
            product.media?.[0]?.url || "/placeholder.png";

          return (
            <Card
              key={product.id || product.id}
              className="p-3 flex flex-col h-full"
            >
              {/* IMAGE */}
              <div className="w-full aspect-[4/3] bg-gray-100 rounded overflow-hidden">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onClick={() =>
                    navigate(
                      `/buyers/product/${product.id}`
                    )
                  }
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/placeholder.png";
                  }}
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-1">
                <h2 className="font-semibold mt-2">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {product.category}
                </p>

                <p className="font-bold mt-1">
                  ₦{product.price.toLocaleString()}
                </p>

                <div className="mt-auto pt-3 flex gap-2">
                  {/* VIEW */}
                  <Button
                    className="flex-1"
                    onClick={() =>
                      navigate(
                        `/buyers/product/${product.id}`
                      )
                    }
                  >
                    View
                  </Button>

                  {/* ADD TO CART */}
                  
                   <Button
                    className="flex-1"
                    variant="danger"
                    onClick={() =>
                      addToCart(toCartPayload(product, 1))
                    }
                  >
                    Add to Cart
                  </Button> 

                  
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;


