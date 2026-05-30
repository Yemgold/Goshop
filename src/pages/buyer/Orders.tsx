import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { buyerService } from "../../services/buyer.api.service";

import { useAuthStore } from "../../store/auth.store";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";
import { EmptyOrdersState } from "../../components/ui/empty-states/EmptyOrdersState";

type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;

  customerId: string;

  businessId: string;

  items: OrderItem[];

  subtotal: number;

  deliveryFee?: number;

  total?: number;

  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  createdAt?: string;
};

export default function Orders() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const buyerId = user?.id;

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ["buyer-orders", buyerId],

    queryFn: async () => {
      if (!buyerId) {
        throw new Error("Buyer ID not found");
      }

      return buyerService.getOrders(buyerId);
    },

    enabled: !!buyerId,

    retry: false,
  });

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load orders
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (!orders.length) {
    return (
      <div className="p-6">
        <PageHeader title="My Orders" />

        <EmptyOrdersState />
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <PageHeader title="My Orders" />

      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="p-4 space-y-3"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">
                Order #{order.id.slice(-6)}
              </h2>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  order.status === "delivered"
                    ? "bg-green-100 text-green-600"
                    : order.status === "cancelled"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* ITEMS */}
            <div className="space-y-1 text-sm border-t pt-2">
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    ₦
                    {(
                      item.price * item.quantity
                    ).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Subtotal</span>

              <span>
                ₦{order.subtotal.toLocaleString()}
              </span>
            </div>

            {/* ACTION */}
            <Button
              onClick={() =>
                navigate(`/buyers/track/${order.id}`)
              }
              className="w-full"
            >
              Track Order
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}


