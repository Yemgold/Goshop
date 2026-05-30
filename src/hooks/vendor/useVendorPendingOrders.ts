

import { useEffect, useState } from "react";

import { getVendorPendingOrders } from "../../services/vendor/vendor.service";

import type{ VendorPendingOrdersData } from "../../types/vendor.types"; 

export const useVendorPendingOrders =
  () => {
    const [data, setData] =
      useState<VendorPendingOrdersData | null>(
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
            await getVendorPendingOrders();

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