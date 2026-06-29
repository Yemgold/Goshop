

import { useNavigate, useLocation } from "react-router-dom";

// UI
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Order ID (support both patterns)
  const orderId =
    location.state?.orderId ||
    location.state?.order?._id;

  // SAFETY FALLBACK (no order info passed)

  if (!orderId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-3">
          <p className="text-gray-500">
            No order found
          </p>

          <Button onClick={() => navigate("/buyers/home")}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="p-6 text-center max-w-md w-full space-y-4">

        {/* HEADER */}
        <PageHeader title="Order Successful 🎉" />

        {/* SUCCESS ICON */}
        <div className="text-green-500 text-5xl">
          ✔
        </div>

        {/* ORDER ID */}
        <p className="text-gray-500">
          Order ID:{" "}
          <span className="font-semibold">
            {orderId}
          </span>
        </p>

        {/* MESSAGE */}
        <p className="text-sm text-gray-600">
          Your order has been placed successfully. A rider will be assigned shortly.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 pt-2">

          <Button
            onClick={() => navigate("/buyers/home")}
          >
            Continue Shopping
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              navigate(`/buyers/track/${orderId}`)
            }
          >
            Track Order
          </Button>

        </div>
      </Card>
    </div>
  );
}