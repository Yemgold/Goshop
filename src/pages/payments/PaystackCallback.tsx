import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Loader2,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

import { paymentService } from "../../services/paymentService";

export default function VerifyPaymentPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const reference = params.get("reference");

  const hasRun = useRef(false);

  const [statusText, setStatusText] = useState(
    "Connecting to payment gateway..."
  );

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const messages = [
      "Connecting to payment gateway...",
      "Validating transaction reference...",
      "Confirming payment status...",
      "Finalizing your order...",
    ];

    let index = 0;

    const interval = setInterval(() => {
      index++;

      if (index < messages.length) {
        setStatusText(messages[index]);
      }
    }, 1800);

    const verifyPayment = async () => {
      if (!reference) {
        toast.error("Missing payment reference");

        navigate("/buyers/cart", {
          replace: true,
        });

        return;
      }

      try {
        const res =
          await paymentService.getverifyPayment(
            reference
          );

        const payload = res?.data;

        const isSuccess =
          payload?.success === true ||
          payload?.status === "success" ||
          payload?.message
            ?.toLowerCase?.()
            ?.includes("success");

        if (isSuccess) {
          setStatusText(
            "Payment verified successfully"
          );

          toast.success("Payment successful");

          await new Promise((resolve) =>
            setTimeout(resolve, 10000)
          );

          navigate("/buyers/order-success", {
            replace: true,
            state: {
              orderId:
                payload?.orderId || null,
              reference,
            },
          });

          return;
        }

        toast.error(
          payload?.message ||
            "Payment verification failed"
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
      } finally {
        clearInterval(interval);
      }
    };

    verifyPayment();

    return () => {
      clearInterval(interval);
    };
  }, [reference, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-center gap-3">
              <CreditCard className="h-7 w-7" />

              <h1 className="text-2xl font-bold">
                Payment Verification
              </h1>
            </div>

            <p className="text-center text-blue-100 mt-2">
              Secure transaction processing
            </p>
          </div>

          {/* Body */}
          <div className="p-8">

            {/* Animated Loader */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping" />

                <Loader2 className="relative h-16 w-16 text-blue-600 animate-spin" />
              </div>
            </div>

            {/* Status */}
            <h2 className="mt-8 text-center text-xl font-bold text-slate-800">
              Verifying Your Payment
            </h2>

            <p className="mt-3 text-center text-slate-500">
              {statusText}
            </p>

            {/* Progress Bar */}
            <div className="mt-8">
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full w-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse" />
              </div>
            </div>

            {/* Reference */}
            {reference && (
              <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Transaction Reference
                </p>

                <p className="mt-2 font-mono text-sm font-semibold break-all text-slate-800">
                  {reference}
                </p>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-8 flex items-center justify-center gap-2 text-green-600">
              <ShieldCheck className="h-5 w-5" />

              <span className="text-sm font-medium">
                Secure encrypted verification
              </span>
            </div>

            {/* Information */}
            <div className="mt-6 rounded-xl bg-blue-50 p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Please do not close this page
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    We are securely confirming your
                    payment and preparing your order.
                    This usually takes only a few
                    seconds.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          Powered by secure payment processing
        </p>

      </div>
    </div>
  );
}























// import { useEffect, useRef } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "sonner";

// import { paymentService } from "../../services/paymentService";

// export default function VerifyPaymentPage() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   const reference = params.get("reference");

//   // ✅ prevents double API call in React StrictMode
//   const hasRun = useRef(false);

//   useEffect(() => {
//     if (hasRun.current) return;
//     hasRun.current = true;

//     const verifyPayment = async () => {
//       // =========================
//       // 1. GUARD: missing reference
//       // =========================
//       if (!reference) {
//         toast.error("Missing payment reference");

//         navigate("/buyers/cart", { replace: true });
//         return;
//       }

//       try {
//         // =========================
//         // 2. API CALL
//         // =========================
//         const res = await paymentService.getverifyPayment(reference);

//         const payload = res?.data;

//         // =========================
//         // 3. NORMALIZED SUCCESS CHECK
//         // =========================
//         const isSuccess =
//           payload?.success === true ||
//           payload?.status === "success" ||
//           payload?.message?.toLowerCase?.().includes("success");

//         if (isSuccess) {
//           toast.success("Payment successful");

//           navigate("/buyers/order-success", {
//             replace: true,
//             state: {
//               orderId: payload?.orderId || null,
//               reference,
//             },
//           });

//           return;
//         }

//         // =========================
//         // 4. FAILURE CASE
//         // =========================
//         toast.error(payload?.message || "Payment verification failed");

//         navigate("/buyers/order-failed", {
//           replace: true,
//         });
//       } catch (error) {
//         // =========================
//         // 5. NETWORK / SERVER ERROR
//         // =========================
//         console.error("Payment verification error:", error);

//         toast.error("Unable to verify payment");

//         navigate("/buyers/order-failed", {
//           replace: true,
//         });
//       }
//     };

//     verifyPayment();
//   }, [reference, navigate]);

//   return (
//     <div className="flex min-h-screen items-center justify-center">
//       <div className="text-center">
//         <h2 className="text-xl font-semibold">
//           Verifying your payment...
//         </h2>

//         <p className="mt-2 text-gray-500">
//           Please wait while we confirm your payment.
//         </p>
//       </div>
//     </div>
//   );
// }