

// import { useEffect, useState } from "react";

// import { getVendorOrders } from "../services/vendor/vendor.service"; 

// import type{ VendorOrdersData } from "../types/vendor.types"; 

// export const useVendorOrders = () => {
//   const [data, setData] =
//     useState<VendorOrdersData | null>(null);

//   const [isLoading, setIsLoading] =
//     useState(true);

//   const [isError, setIsError] =
//     useState(false);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setIsLoading(true);

//         const res = await getVendorOrders();

//         setData(res);
//       } catch {
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return {
//     data,
//     isLoading,
//     isError,
//   };
// };