

import { useEffect, useState } from "react";

import { getVendorSales } from "../../services/vendor/vendor.service";

import type{ VendorSalesData } from "../../types/vendor/vendor.types"; 

export const useVendorSales = () => {
  const [data, setData] =
    useState<VendorSalesData | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isError, setIsError] =
    useState(false);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setIsLoading(true);

        const response = await getVendorSales();

        setData(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSales();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};