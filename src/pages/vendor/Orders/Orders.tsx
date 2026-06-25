
import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../../components/ui/PageHeader";
import { SectionCard } from "../../../components/ui/SectionCard";

import { useAuthStore } from "../../../store/auth.store";
import { useVendorOrdersToFulfil } from "../../../hooks/vendor/useVendorOrdersToFulfil";

export default function Orders() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const businessId = user?.businessId ?? "";

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useVendorOrdersToFulfil(businessId);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load orders
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Orders to Fulfil"
        subtitle="Manage unpaid processing workflow"
      />

      <SectionCard title="Fulfilment Queue">
        {orders.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No orders available for fulfilment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="py-3">Order ID</th>
                  <th className="py-3">Customer</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Items</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order: any) => (
                  <tr
                    key={order.orderId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td
                      className="py-4 text-blue-600 cursor-pointer hover:underline"
                      onClick={() =>
                        navigate(
                          `/vendor/orders/${order.orderId}`
                        )
                      }
                    >
                      {order.orderId}
                    </td>

                    <td className="py-4">
                      {order.order?.customerName ||
                        order.order?.customer?.fullName ||
                        "N/A"}
                    </td>

                    <td className="py-4 font-medium">
                      ₦{Number(order.subtotal || 0).toLocaleString()}
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "fulfilled"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="py-4">
                      {order.items?.length || 0}
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() =>
                          navigate(
                            `/vendor/orders/${order.orderId}`

                            
                          )
                        }
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}