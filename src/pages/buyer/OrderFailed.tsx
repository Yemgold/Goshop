

import { useNavigate, useLocation } from "react-router-dom";

// UI
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";

export default function OrderFailed() {
  const navigate = useNavigate();
  const location = useLocation();

  // Optional: support future error/order data
  const orderId = location.state?.orderId;
  const message = location.state?.message;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Card className="p-6 text-center max-w-md w-full space-y-4">

        {/* HEADER */}
        <PageHeader title="Payment Failed ❌" />

        {/* ICON */}
        <div className="text-red-500 text-5xl">
          ✖
        </div>

        {/* MESSAGE */}
        <p className="text-gray-600 text-sm">
          {message ||
            "Something went wrong while processing your payment. Please try again."}
        </p>

        {/* OPTIONAL ORDER ID */}
        {orderId && (
          <p className="text-gray-500 text-sm">
            Order ID:{" "}
            <span className="font-semibold">
              {orderId}
            </span>
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3 pt-2">

          <Button onClick={() => navigate("/buyers/cart")}>
            Retry Payment
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/buyers/home")}
          >
            Go Home
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              window.open("mailto:support@yourapp.com")
            }
          >
            Contact Support
          </Button>

        </div>
      </Card>
    </div>
  );
}