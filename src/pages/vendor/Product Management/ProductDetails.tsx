


import { useParams } from "react-router-dom";
import { useVendorProductById } from "../../../hooks/vendor/useVendorProductById";

export default function VendorProductDetails() {
  const { productId } = useParams();

  const { data: product, isLoading } =
    useVendorProductById(productId!);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        {product.name}
      </h1>

      <div className="space-y-1">
        <p>Price: ₦{product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        {product.media?.map((img: any) => (
          <img
            key={img._id || img.url}
            src={img.url}
            alt={product.name}
            className="rounded-lg object-cover"
          />
        ))}
      </div>
    </div>
  );
}