


import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { buyerService } from "../../services/buyer.api.service";
import { productService } from "../../services/product.service";
import {getAllPickupCentersAPI,getBusStopsByStateAPI} from "../../api/user/buyer.api";
import { getCollectionFeeByStateAPI } from "../../services/engine/shipping.engine";

export function useCheckoutData(form: any) {

  /* ================= CART ================= */
  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: buyerService.getCart,
  });

  const items = useMemo(() => {
    return Array.isArray(cartData?.items) ? cartData.items : [];
  }, [cartData]);

/* ================= PRODUCTS ================= */
const { data: productsRaw } = useQuery({
  queryKey: ["products"],
  queryFn: () => productService.getProducts(),
});

const products = useMemo(() => {
  if (!productsRaw) return [];

  if (Array.isArray(productsRaw)) return productsRaw;

  if (Array.isArray((productsRaw as any)?.data))
    return (productsRaw as any).data;

  if (Array.isArray((productsRaw as any)?.products))
    return (productsRaw as any).products;

  return [];
}, [productsRaw]);

console.log("PRODUCTS RAW:", productsRaw);
console.log("PRODUCTS:", products);

  /* ================= BUS STOPS ================= */
  const { data: busStopRes } = useQuery({
    queryKey: ["busStops", form.selectedState],
    queryFn: () => getBusStopsByStateAPI(form.selectedState),
    enabled: !!form.selectedState && form.deliveryMode === "homeDelivery",
  });

  const busStops = busStopRes?.data || [];

  /* ================= PICKUP CENTERS ================= */
  const { data: pickupResponse } = useQuery({
    queryKey: ["pickup-centers"],
    queryFn: getAllPickupCentersAPI,
  });

  const allPickupCenters = Array.isArray(pickupResponse?.data)
    ? pickupResponse.data
    : [];

  const pickupCenters = useMemo(() => {
    if (!form.selectedState) return [];

    return allPickupCenters.filter(
      (center: any) =>
        center.state?.toLowerCase() === form.selectedState.toLowerCase()
    );
  }, [allPickupCenters, form.selectedState]);

  /* ================= COLLECTION FEE ================= */
  const { data: collectionFeeResponse } = useQuery({
    queryKey: ["collection-fee", form.selectedState],
    queryFn: async () => {
      const state = form.selectedState?.trim();
      if (!state) throw new Error("State is required");

      const res = await getCollectionFeeByStateAPI(state);
      return res.data?.data;
    },
    enabled: !!form.selectedState?.trim(),
    retry: false,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return {
    cartData,
    items,
    products,
    busStops,
    pickupCenters,
    collectionFeeResponse,
    
  };
}