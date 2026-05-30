


import { useEffect, useState } from "react";

import { getVendorPayouts } from "../../services/vendor/vendor.service";

import type{ VendorPayoutsData } from "../../types/vendor.types"; 

export const useVendorPayouts = () => {
  const [data, setData] =
    useState<VendorPayoutsData | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        setIsLoading(true);

        const res =
          await getVendorPayouts();

        setData(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayouts();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};