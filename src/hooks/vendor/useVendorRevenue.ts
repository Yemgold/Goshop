

import { useEffect, useState } from "react";

import { getVendorRevenue } from "../../services/vendor/vendor.service";

import type{ VendorRevenueData } from "../../types/vendor/vendor.types"; 

export const useVendorRevenue = () => {
  const [data, setData] =
    useState<VendorRevenueData | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setIsLoading(true);

        const res =
          await getVendorRevenue();

        setData(res);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};