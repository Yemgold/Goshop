

import { useEffect, useState } from "react";

import { getVendorDeliveryZones } from "../../services/vendor/vendor.service";

import type{ VendorDeliveryZonesData } from "../../types/vendor.types"; 

export const useVendorDeliveryZones =
  () => {
    const [data, setData] =
      useState<VendorDeliveryZonesData | null>(
        null
      );

    const [isLoading, setIsLoading] =
      useState(true);

    const [isError, setIsError] =
      useState(false);

    useEffect(() => {
      const fetchZones = async () => {
        try {
          setIsLoading(true);

          const res =
            await getVendorDeliveryZones();

          setData(res);
        } catch {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchZones();
    }, []);

    return {
      data,
      isLoading,
      isError,
    };
  };