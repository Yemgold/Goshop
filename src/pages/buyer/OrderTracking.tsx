

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import type { TrackingOrder } from "../../types/buyer.types";

import { Card } from "../../components/ui/Card";
import { PageHeader } from "../../components/ui/PageHeader";

import { buyerService } from "../../services/buyer.api.service";

// 🔥 replace this with your real auth store / context
import { useAuthStore } from "../../store/auth.store";

export default function OrderTracking() {
  const { orderId } = useParams();

  // ✅ get logged-in user
  const user = useAuthStore((s) => s.user);

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<TrackingOrder>({
    queryKey: ["tracking", orderId, user?.id],
    enabled: !!orderId && !!user?.id,

    queryFn: () =>
      buyerService.getOrderTracking(orderId!, user!.id),

    refetchInterval: 4000,
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Tracking your order...
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="p-6 text-center text-red-500">
        Order not found
      </div>
    );
  }

  /* ================= PROGRESS ================= */
  const completedSteps = order.timeline.filter(
    (t) => t.completed
  ).length;

  const progress =
    (completedSteps / order.timeline.length) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <PageHeader title={`Order #${order.id}`} />

      {/* ================= STATUS ================= */}
      <Card>
        <div className="space-y-3">

          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>
              <h2 className="text-lg font-semibold">
                {order.deliveryStatus}
              </h2>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">
                Estimated Delivery
              </p>
              <h2 className="font-semibold">
                {order.estimatedDelivery}
              </h2>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="bg-black h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>
      </Card>

      {/* ================= RIDER INFO ================= */}
      <Card>
        <h2 className="font-semibold mb-3">
          Your Rider
        </h2>

        <div className="flex items-center justify-between">

          <div>
            <p className="font-medium">
              {order.rider?.name ||
                "Assigning rider..."}
            </p>

            <p className="text-sm text-gray-500">
              {order.rider?.vehicle ||
                "Finding nearby rider"}
            </p>
          </div>

          <div className="text-sm text-gray-500">
            {order.rider ? "📞 Call" : "..."}
          </div>

        </div>
      </Card>

      {/* ================= TIMELINE ================= */}
      <Card>
        <h2 className="font-semibold mb-4">
          Delivery Progress
        </h2>

        <div className="space-y-4">
          {order.timeline.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              {/* DOT */}
              <div
                className={`w-3 h-3 rounded-full mt-2 ${
                  step.completed
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />

              {/* CONTENT */}
              <div className="flex-1">

                <div className="flex justify-between">
                  <p className="font-medium">
                    {step.step}
                  </p>

                  <span className="text-xs text-gray-500">
                    {step.time || ""}
                  </span>
                </div>

                <p className="text-xs text-gray-400">
                  {step.completed
                    ? "Completed"
                    : "Waiting..."}
                </p>

              </div>

            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}