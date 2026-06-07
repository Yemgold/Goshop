



// import { ShoppingCart } from "lucide-react";
// import { useCartStore } from "../../store/cart.store";

// type Props = {
//   product: any; // (we'll improve typing later)
//   quantity?: number;
// };

// export default function AddToCart({ product, quantity = 1 }: Props) {
//   const addToCart = useCartStore((state) => state.addToCart);

//   const handleAdd = () => {
//     addToCart({
//       productId: product.id || product._id,
//       businessId: product.businessId?._id ?? "",
//       quantity,
//       name: product.name,
//       price: product.price,
//       image: product.image || "",
//     });
//   };

//   return (
//     <button
//       onClick={handleAdd}
//       disabled={!product.inStock}
//       className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg disabled:opacity-50"
//     >
//       <ShoppingCart size={18} />
//       {product.inStock ? "Add to Cart" : "Out of Stock"}
//     </button>
//   );
// }