

import { useEffect, useState } from "react";
import type { Product } from "../../types";

const STORAGE_KEY = "recently_viewed_products";
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [items, setItems] = useState<Product[]>([]);

  /* Load from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
  }, []);

  /* Save to storage */
  const save = (products: Product[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    setItems(products);
  };

  /* Add product */
  const addViewedProduct = (product: Product) => {
    if (!product?._id) return;

    const existing = items.filter((p) => p._id !== product._id);

    const updated = [product, ...existing].slice(0, MAX_ITEMS);

    save(updated);
  };

  /* Clear history */
  const clearRecentlyViewed = () => {
    save([]);
  };

  return {
    items,
    addViewedProduct,
    clearRecentlyViewed,
  };
}