// import { useEffect, useState } from "react";
// import { getVendorDiscounts } from "../../services/vendor/vendor.service";
// import type { VendorDiscountsData } from "../../types/vendor/vendor.types";

// export const useVendorDiscounts = () => {
//   const [data, setData] =
//     useState<VendorDiscountsData | null>(null);

//   const [isLoading, setIsLoading] =
//     useState(true);

//   const [isError, setIsError] =
//     useState(false);

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       setIsError(false);

//       const res = await getVendorDiscounts();

//       setData(res);
//     } catch (error) {
//       console.error("Failed to fetch discounts:", error);
//       setIsError(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return {
//     data,
//     isLoading,
//     isError,
//     refetch: fetchData, // 👈 THIS FIXES YOUR ERROR
//   };
// };




import { useQuery } from "@tanstack/react-query";
import { getVendorDiscounts } from "../../services/vendor/vendor.service";
import type { VendorDiscountsData } from "../../types/vendor/vendor.types";

export const useVendorDiscounts = () => {
  return useQuery<VendorDiscountsData>({
    queryKey: ["vendor-discounts"],
    queryFn: getVendorDiscounts,
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};