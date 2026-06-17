
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { paymentService } from "../../services/paymentService"; 

export default function VerifyPaymentPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const reference = params.get("reference");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        toast.error("Missing payment reference");
        navigate("/buyers/cart", { replace: true });
        return;
      }

      try {
        const res = await paymentService.getverifyPayment(
          reference
        );

        const data = res.data;

        if (data?.status === "success") {
          toast.success("Payment successful");

          navigate("/buyers/order-success", {
            replace: true,
            state: {
              orderId: data.orderId,
              reference,
            },
          });

          return;
        }

        toast.error(
          data?.message || "Payment verification failed"
        );

        navigate("/buyers/order-failed", {
          replace: true,
        });
      } catch (error) {
        console.error(
          "Payment verification error:",
          error
        );

        toast.error("Unable to verify payment");

        navigate("/buyers/order-failed", {
          replace: true,
        });
      }
    };

    verifyPayment();
  }, [reference, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          Verifying your payment...
        </h2>

        <p className="mt-2 text-gray-500">
          Please wait while we confirm your payment.
        </p>
      </div>
    </div>
  );
}