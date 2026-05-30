


import { useEffect, useState } from "react";
import { getVendorInventory } from "../../services/vendor/vendor.service";
import type{ VendorInventoryData } from "../../types/vendor.types"; 

export const useVendorInventory = () => {
  const [data, setData] =
    useState<VendorInventoryData | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await getVendorInventory();

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