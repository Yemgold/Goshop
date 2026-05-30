

import { useEffect, useState } from "react";
import { getVendorCategories } from "../../services/vendor/vendor.service";
import type{ VendorCategoriesData } from "../../types/vendor.types"; 

export const useVendorCategories = () => {
  const [data, setData] =
    useState<VendorCategoriesData | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await getVendorCategories();

        setData(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, isError };
};