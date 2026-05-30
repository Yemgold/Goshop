

import { useEffect, useState } from "react";
import { getVendorDiscounts } from "../../services/vendor/vendor.service";
import type{ VendorDiscountsData } from "../../types/vendor.types"; 

export const useVendorDiscounts = () => {
  const [data, setData] =
    useState<VendorDiscountsData | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const res = await getVendorDiscounts();

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