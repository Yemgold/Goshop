import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { paymentService } from "../../services/paymentService";

export default function VerifyPaymentPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const reference = params.get("reference");

  // ✅ prevents double API call in React StrictMode
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const verifyPayment = async () => {
      // =========================
      // 1. GUARD: missing reference
      // =========================
      if (!reference) {
        toast.error("Missing payment reference");

        navigate("/buyers/cart", { replace: true });
        return;
      }

      try {
        // =========================
        // 2. API CALL
        // =========================
        const res = await paymentService.getverifyPayment(reference);

        const payload = res?.data;

        // =========================
        // 3. NORMALIZED SUCCESS CHECK
        // =========================
        const isSuccess =
          payload?.success === true ||
          payload?.status === "success" ||
          payload?.message?.toLowerCase?.().includes("success");

        if (isSuccess) {
          toast.success("Payment successful");

          navigate("/buyers/order-success", {
            replace: true,
            state: {
              orderId: payload?.orderId || null,
              reference,
            },
          });

          return;
        }

        // =========================
        // 4. FAILURE CASE
        // =========================
        toast.error(payload?.message || "Payment verification failed");

        navigate("/buyers/order-failed", {
          replace: true,
        });
      } catch (error) {
        // =========================
        // 5. NETWORK / SERVER ERROR
        // =========================
        console.error("Payment verification error:", error);

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