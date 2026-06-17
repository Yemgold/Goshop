import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";

import { useAuthStore } from "../../../store/auth.store";
import { useVendorOrdersToFulfil } from "../../../hooks/vendor/useVendorOrdersToFulfil";

export default function Orders() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const businessId = user?.businessId ?? "";

  const { data: orders = [], isLoading, isError } =
    useVendorOrdersToFulfil(businessId);

  orders.forEach((order: any, index: number) => {
  console.log("Order", index, {
    id: order.id,
    _id: order._id,
    keys: Object.keys(order),
  });
});

console.log("RAW ORDER:", orders[0]);

  const [loadingId] = useState<string | null>(null);    //setLoadingId

  if (isLoading) return <div className="p-6">Loading...</div>;

  if (isError)
    return <div className="p-6 text-red-500">Failed to load orders</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Orders to Fulfil"
        subtitle="Manage unpaid processing workflow"
      />

      <SectionCard title="Fulfilment Queue">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

             {orders.map((order: any, index: number) => (
    <tr key={index} className="border-b">

                {/* CLICK TO DETAILS */}
                <td
                  className="py-4 text-blue-600 cursor-pointer hover:underline"
                  onClick={() =>
                    navigate(`/vendor/orders/${order.id}`)
                  }
                >
                  {order.id}
                </td>

                <td className="py-4">{order.customer}</td>

                <td className="py-4">
                ₦{(order.total ?? 0).toLocaleString()}
                </td>

                <td className="py-4">
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                    {order.orderStatus}
                  </span>
                </td>

                <td className="py-4">
                  <button
                    disabled={loadingId === order.id}
                    onClick={() =>
                      navigate(`/vendor/orders/${order.id}`)
                    }
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}








