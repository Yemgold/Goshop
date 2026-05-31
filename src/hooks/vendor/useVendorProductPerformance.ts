

import { useEffect, useState } from "react";

import { getVendorProductPerformance } from "../../services/vendor/vendor.service";

import type{ ProductPerformanceData } from "../../types/vendor/vendor.types";
export const useVendorProductPerformance =
  () => {
    const [data, setData] =
      useState<ProductPerformanceData | null>(
        null
      );

    const [isLoading, setIsLoading] =
      useState(true);

    const [isError, setIsError] =
      useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLoading(true);

          const response =
            await getVendorProductPerformance();

          setData(response);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, []);

    return {
      data,
      isLoading,
      isError,
    };
  };