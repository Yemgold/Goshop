import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

import {
  getVendorShippingRate,
  getAdminShippingRate,
} from "../../api/user/shipping.api";

export function useMultiVendorShipping(
  vendors: any[],
  destinationState: string,
  deliveryMode: "office" | "home" | null
) {
  const safeVendors = Array.isArray(vendors) ? vendors : [];

  const queries = useQueries({
    queries: safeVendors.map((vendor) => ({
      queryKey: [
        "shipping",
        vendor.businessId,
        destinationState,
        vendor.totalWeight,
        deliveryMode,
      ],

      enabled:
        !!destinationState &&
        !!vendor.businessId &&
        !!deliveryMode &&
        vendor.totalWeight > 0,

      queryFn: async () => {
        if (deliveryMode === "office") {
          const res = await getVendorShippingRate(
            vendor.businessId,
            destinationState,
            vendor.totalWeight
          );
          return res?.data ?? res ?? 0;
        }

        if (deliveryMode === "home") {
          const res = await getAdminShippingRate(
            destinationState,
            vendor.totalWeight
          );
          return res?.data ?? res ?? 0;
        }

        return 0;
      },
    })),
  });

  return useMemo(() => {
    return safeVendors.map((vendor, index) => {
      const shippingFee = queries[index]?.data ?? 0;

      return {
        ...vendor,
        shippingFee,
        total: vendor.subtotal + shippingFee,
      };
    });
  }, [
    safeVendors,
    deliveryMode,
    destinationState,
    queries.map((q) => q.data),
  ]);
}


