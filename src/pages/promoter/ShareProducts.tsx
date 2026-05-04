
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Order } from "../../types/rider.types";

const ShareProducts: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("orders") || "[]"
    ) as Order[];

    setOrders(stored);
  }, []);

  const copyShareLink = (order: Order) => {
    const link = `${window.location.origin}/buyer/product/${order.id}`;

    navigator.clipboard.writeText(link);

    toast.success("Product link copied 📎");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Share Products
        </h1>
        <p className="text-sm text-gray-500">
          Share product links with customers or riders
        </p>
      </div>

      {/* EMPTY STATE */}
      {orders.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No products available to share 🚫
        </div>
      )}

      {/* PRODUCT LIST */}
      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >

            {/* TOP ROW */}
            <div className="flex justify-between items-start">

              <div>
                <h2 className="font-semibold">
                  Product #{order.id}
                </h2>

                <p className="text-sm text-gray-500">
                  {order.pickup} → {order.dropoff}
                </p>
              </div>

              <p className="font-bold">
                ₦{order.total.toLocaleString()}
              </p>

            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex gap-3">

              <button
                onClick={() => copyShareLink(order)}
                className="flex-1 bg-black text-white py-2 rounded-xl font-medium"
              >
                Copy Share Link
              </button>

              <button
                onClick={() =>
                  window.open(
                    `/buyer/product/${order.id}`,
                    "_blank"
                  )
                }
                className="flex-1 border py-2 rounded-xl font-medium"
              >
                Preview
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default ShareProducts;