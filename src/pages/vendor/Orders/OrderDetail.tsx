import { useParams } from "react-router-dom";
import { useAuthStore } from "../../../store/auth.store";

import { useVendorOrderDetails } from "../../../hooks/vendor/useVendorOrderDetails"; 
import { useSendToPickup } from "../../../hooks/vendor/useSendToPickup";

export default function OrderDetail() {
  const { id } = useParams();

  const user = useAuthStore((state) => state.user);
  const businessId = user?.businessId ?? "";

  const { data: order, isLoading } =
    useVendorOrderDetails(businessId, id!);

  const { mutate: sendToPickup, isPending } =
    useSendToPickup();

  if (isLoading) return <div>Loading...</div>;

  if (!order) return <div>Order not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Order #{order.id}</h1>

      <p>Total: ₦{order.total.toLocaleString()}</p>

      <button
        disabled={isPending}
        onClick={() =>
          sendToPickup({
            businessId,
            orderId: order.id,
          })
        }
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Send to Pickup Center
      </button>
    </div>
  );
}
