

// import { useQuery } from "@tanstack/react-query";
// import { getVendorOrdersToFulfil } from "../../services/vendor/orders.service";

// export const useVendorOrdersToFulfil = (businessId: string) => {

//     console.log("FULL RESPONSE:", response);


//   return useQuery({
//     queryKey: ["vendor-fulfil-orders", businessId],
//     queryFn: () => getVendorOrdersToFulfil(businessId),
//     enabled: !!businessId,
//     initialData: [],
//   });
// };







import { useQuery } from "@tanstack/react-query";
import { getVendorOrdersToFulfil } from "../../services/vendor/orders.service";

export const useVendorOrdersToFulfil = (businessId: string) => {
  return useQuery({
    queryKey: ["vendor-fulfil-orders", businessId],

    queryFn: async () => {
      const res = await getVendorOrdersToFulfil(businessId);

      console.log("API FULL RESPONSE:", res); // ✅ correct place

      return res;
    },

    enabled: !!businessId,

    // ❌ REMOVE THIS (it hides real shape problems)
    // initialData: [],
  });
};