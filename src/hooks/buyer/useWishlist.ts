

import { useEffect, useState } from "react";

const KEY = "wishlist_products";

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  const save = (items: string[]) => {
    setWishlist(items);
    localStorage.setItem(KEY, JSON.stringify(items));
  };

  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      save(wishlist.filter((id) => id !== productId));
    } else {
      save([...wishlist, productId]);
    }
  };

  const isWished = (productId: string) =>
    wishlist.includes(productId);

  return {
    wishlist,
    toggleWishlist,
    isWished,
  };
}