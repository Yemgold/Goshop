

// import React from "react";
// import { toast } from "react-toastify";

// import { Card } from "../../components/ui/Card";
// import { Button } from "../../components/ui/Button";
// import { StatusBadge } from "../../components/ui/StatusBadge";
// import { PageHeader } from "../../components/ui/PageHeader";

// import { useVendorOrders } from "../../hooks/vendor/useVendorOrders";
// import { useUpdateVendorOrder } from "../../hooks/vendor/useUpdateVendorOrder"; 

// import type { Order } from "../../types/vendor.types";

// const Orders: React.FC = () => {
//   const {
//     data: orders,
//     isLoading,
//     isError,
//   } = useVendorOrders();

//   const { mutate: updateOrder, isPending } = useUpdateVendorOrder();

//   /* ================= ACTION ================= */
//   const handleUpdate = (id: string, status: Order["status"]) => {
//     updateOrder(
//       { id, status },
//       {
//         onSuccess: () => {
//           toast.success(`Order ${status}`);
//         },
//         onError: () => {
//           toast.error("Failed to update order");
//         },
//       }
//     );
//   };

//   /* ================= STATES ================= */

//   if (isLoading) {
//     return (
//       <div className="p-6 text-center text-gray-500">
//         Loading orders...
//       </div>
//     );
//   }

//   if (isError || !orders) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         Failed to load orders
//       </div>
//     );
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="p-6 max-w-5xl mx-auto space-y-6">
//       <PageHeader title="Vendor Orders" />

//       <div className="grid gap-4">
//         {orders.map((order) => (
//           <Card key={order.id}>
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="font-semibold">
//                   Order #{order.id}
//                 </h2>

//                 <p className="text-sm text-gray-500">
//                   {new Date(order.date).toLocaleString()}
//                 </p>
//               </div>

//               <div className="text-right">
//                 <p className="font-bold">
//                   ₦{order.total.toLocaleString()}
//                 </p>

//                 <StatusBadge status={order.status} />
//               </div>
//             </div>

//             {/* ACTIONS */}
//             <div className="mt-4 flex gap-3">
//               <Button
//                 disabled={isPending}
//                 onClick={() =>
//                   handleUpdate(order.id, "Accepted")
//                 }
//               >
//                 Accept
//               </Button>

//               <Button
//                 variant="danger"
//                 disabled={isPending}
//                 onClick={() =>
//                   handleUpdate(order.id, "Rejected")
//                 }
//               >
//                 Reject
//               </Button>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;



import { useState } from "react";

import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";

import { useVendorOrders } from "../../../hooks/vendor/useVendorOrders";

import { updateOrderStatus } from "../../../services/vendor/vendor.service";

export default function Orders() {
  const { data, isLoading, isError } =
    useVendorOrders();

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-4">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="h-96 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load orders.
      </div>
    );
  }

  const handleStatusUpdate = async (
    id: string,
    status:
      | "pending"
      | "processing"
      | "shipped"
      | "delivered"
      | "canceled"
  ) => {
    try {
      setUpdatingId(id);

      await updateOrderStatus(id, status);

      window.location.reload();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Vendor Orders"
        subtitle="Manage customer orders and fulfillment"
      />

      <SectionCard title="All Orders">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="py-3">Order ID</th>

                <th className="py-3">
                  Customer
                </th>

                <th className="py-3">
                  Email
                </th>

                <th className="py-3">
                  Amount
                </th>

                <th className="py-3">
                  Qty
                </th>

                <th className="py-3">
                  Payment
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Shipping
                </th>

                <th className="py-3">
                  Date
                </th>

                <th className="py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data.orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b"
                >
                  <td className="py-4 font-medium">
                    {order.id}
                  </td>

                  <td className="py-4">
                    {order.customer}
                  </td>

                  <td className="py-4">
                    {order.email}
                  </td>

                  <td className="py-4">
                    ₦
                    {order.total.toLocaleString()}
                  </td>

                  <td className="py-4">
                    {order.quantity}
                  </td>

                  {/* PAYMENT STATUS */}

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        order.paymentStatus ===
                        "paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus ===
                            "refunded"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {
                        order.paymentStatus
                      }
                    </span>
                  </td>

                  {/* ORDER STATUS */}

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        order.orderStatus ===
                        "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus ===
                            "processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.orderStatus ===
                            "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus ===
                            "canceled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="py-4">
                    {
                      order.shippingAddress
                    }
                  </td>

                  <td className="py-4">
                    {order.createdAt}
                  </td>

                  {/* ACTION */}

                  <td className="py-4">
                    <select
                      value={
                        order.orderStatus
                      }
                      disabled={
                        updatingId === order.id
                      }
                      onChange={(e) =>
                        handleStatusUpdate(
                          order.id,
                          e.target
                            .value as any
                        )
                      }
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="processing">
                        Processing
                      </option>

                      <option value="shipped">
                        Shipped
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                      <option value="canceled">
                        Canceled
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}