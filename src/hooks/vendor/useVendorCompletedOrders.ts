

import { useEffect, useState } from "react";

import { getVendorCompletedOrders } from "../../services/vendor/vendor.service";

import type{ VendorCompletedOrdersData } from "../../types/vendor/vendor.types"; 

export const useVendorCompletedOrders =
  () => {
    const [data, setData] =
      useState<VendorCompletedOrdersData | null>(
        null
      );

    const [isLoading, setIsLoading] =
      useState(true);

    const [isError, setIsError] =
      useState(false);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          setIsLoading(true);

          const res =
            await getVendorCompletedOrders();

          setData(res);
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOrders();
    }, []);

    return {
      data,
      isLoading,
      isError,
    };
  };