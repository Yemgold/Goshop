


// import { useParams } from "react-router-dom";
// import { useAuthStore } from "../../../store/auth.store";

// import { useVendorOrderDetails } from "../../../hooks/vendor/useVendorOrderDetails";
// import { useSendToPickup } from "../../../hooks/vendor/useSendToPickup";

// export default function OrderDetail() {
//   const { id } = useParams();

//   const user = useAuthStore((state) => state.user);
//   const businessId = user?.businessId ?? "";

//   const {
//     data: order,
//     isLoading,
//     isError,
//   } = useVendorOrderDetails(businessId, id!);

//   const { mutate: sendToPickup, isPending } =
//     useSendToPickup();

//   if (isLoading) {
//     return (
//       <div className="p-6">
//         Loading order details...
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-6 text-red-500">
//         Failed to load order details
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="p-6">
//         No order details found
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h1 className="text-2xl font-bold">
//           Order Details
//         </h1>

//         <p className="text-gray-500 mt-1">
//           Review order information before
//           sending it to a pickup center.
//         </p>
//       </div>

//       {/* Order Information */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold mb-4">
//           Order Information
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p className="text-gray-500 text-sm">
//               Order ID
//             </p>
//             <p className="font-medium">
//               {order.orderId}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">
//               Status
//             </p>

//             <span className="inline-block px-3 py-1 text-sm rounded bg-green-100 text-green-700">
//               {order.status}
//             </span>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">
//               Delivery Mode
//             </p>
//             <p className="font-medium">
//               {order.deliveryMode || "N/A"}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">
//               Payment Status
//             </p>
//             <p className="font-medium">
//               {order.status || "N/A"}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">
//               Created Date
//             </p>
//             <p className="font-medium">
//               {order.createdAt
//                 ? new Date(
//                     order.createdAt
//                   ).toLocaleString()
//                 : "N/A"}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500 text-sm">
//               Total Items
//             </p>
//             <p className="font-medium">
//               {order.items?.length || 0}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Products */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold mb-4">
//           Ordered Products
//         </h2>

//         {order.items?.length ? (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b text-left">
//                   <th className="py-3">
//                     Product
//                   </th>
//                   <th className="py-3">
//                     Quantity
//                   </th>
//                   <th className="py-3">
//                     Price
//                   </th>
//                   <th className="py-3">
//                     Total
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {order.items.map(
//                   (
//                     item: any,
//                     index: number
//                   ) => (
//                     <tr
//                       key={index}
//                       className="border-b"
//                     >
//                       <td className="py-3">
//                         {item.productName ||
//                           item.name ||
//                           "Product"}
//                       </td>

//                       <td className="py-3">
//                         {item.quantity || 0}
//                       </td>

//                       <td className="py-3">
//                         ₦
//                         {Number(
//                           item.price || 0
//                         ).toLocaleString()}
//                       </td>

//                       <td className="py-3">
//                         ₦
//                         {Number(
//                           (item.price || 0) *
//                             (item.quantity ||
//                               0)
//                         ).toLocaleString()}
//                       </td>
//                     </tr>
//                   )
//                 )}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-500">
//             No products found.
//           </p>
//         )}
//       </div>

//       {/* Actions */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <h2 className="text-lg font-semibold mb-4">
//           Fulfilment Actions
//         </h2>

//         <button
//           disabled={isPending}
//           onClick={() =>
//             sendToPickup({
//               businessId,
//               orderId: order.orderId,
//             })
//           }
//           className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
//         >
//           {isPending
//             ? "Sending..."
//             : "Send To Pickup Center"}
//         </button>
//       </div>
//     </div>
//   );
// }







import { useParams } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store";

import { useVendorOrderDetails } from "../../../hooks/vendor/useVendorOrderDetails";
import { useSendToPickup } from "../../../hooks/vendor/useSendToPickup";

export default function OrderDetail() {
  const { id } = useParams();

  const user = useAuthStore((state) => state.user);
  const businessId = user?.businessId ?? "";

  const {
    data: order,
    isLoading,
    isError,
  } = useVendorOrderDetails(
    businessId,
    id!
  );

  const { mutate: sendToPickup, isPending } =
    useSendToPickup();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading order details...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load order details
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6">
        No order details found
      </div>
    );
  }

  const items = order.vendor?.items || [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold">
          Order Details
        </h1>

        <p className="text-gray-500 mt-1">
          Review order information before
          sending it to a pickup center.
        </p>
      </div>

      {/* Order Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Order Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">
              Order ID
            </p>
            <p className="font-medium">
              {order.orderId}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Payment Status
            </p>

            <span className="inline-block px-3 py-1 text-sm rounded bg-green-100 text-green-700">
              {order.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Vendor Status
            </p>

            <span className="inline-block px-3 py-1 text-sm rounded bg-yellow-100 text-yellow-700">
              {order.vendor?.status || "N/A"}
            </span>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Delivery Mode
            </p>
            <p className="font-medium">
              {order.deliveryMode || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Subtotal
            </p>
            <p className="font-medium">
              ₦
              {Number(
                order.vendor?.subtotal || 0
              ).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Total Items
            </p>
            <p className="font-medium">
              {items.length}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Created Date
            </p>
            <p className="font-medium">
              {order.createdAt
                ? new Date(
                    order.createdAt
                  ).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Ordered Products
        </h2>

        {items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">
                    Product
                  </th>
                  <th className="py-3">
                    Quantity
                  </th>
                  <th className="py-3">
                    Price
                  </th>
                  <th className="py-3">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map(
                  (
                    item: any,
                    index: number
                  ) => (
                    <tr
                      key={index}
                      className="border-b"
                    >
                      <td className="py-3">
                        {item.productName ||
                          item.name ||
                          item.product?.name ||
                          "Product"}
                      </td>

                      <td className="py-3">
                        {item.quantity || 0}
                      </td>

                      <td className="py-3">
                        ₦
                        {Number(
                          item.price || 0
                        ).toLocaleString()}
                      </td>

                      <td className="py-3">
                        ₦
                        {Number(
                          (item.price || 0) *
                            (item.quantity ||
                              0)
                        ).toLocaleString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">
            No products found.
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Fulfilment Actions
        </h2>

        <button
          disabled={isPending}
          onClick={() =>
            sendToPickup({
              businessId,
              orderId: order.orderId,
            })
          }
          className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {isPending
            ? "Sending..."
            : "Send To Pickup Center"}
        </button>
      </div>
    </div>
  );
}