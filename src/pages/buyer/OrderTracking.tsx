

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import type { TrackingOrder } from "../../types";

import { PageHeader } from "../../components/ui/PageHeader";

import TrackingStatusCard from "../../components/ui/TrackingStatusCard";
import RiderInfoCard from "../../components/ui/RiderInfoCard";
import TrackingTimeline from "../../components/ui/TrackingTimeline";
import EmptyTrackingState from "../../components/ui/empty-states/EmptyTrackingState";
import LoadingTrackingState from "../../components/ui/empty-states/LoadingTrackingState";

import { buyerService } from "../../services/buyer.api.service";
import { useAuthStore } from "../../store/auth.store";

export default function OrderTracking() {
  const { orderId } = useParams();

  const user = useAuthStore((s) => s.user);

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery<TrackingOrder>({
    queryKey: ["tracking", orderId, user?.id],

    enabled: !!orderId && !!user?.id,

    queryFn: () =>
      buyerService.getOrderTracking(
        orderId!,
        user!.id
      ),

    refetchInterval: 4000,
  });

  if (isLoading) {
    return <LoadingTrackingState />;
  }

  if (isError || !order) {
    return (
      <EmptyTrackingState
        title="Order not found"
        message="We couldn't find any tracking information for this order."
      />
    );
  }

  const completedSteps =
    order.timeline?.filter((t) => t.completed)
      .length || 0;

  const progress =
    order.timeline?.length
      ? (completedSteps / order.timeline.length) * 100
      : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <PageHeader
        title={`Order #${order.id}`}
      />

      <TrackingStatusCard
        status={order.deliveryStatus}
        estimatedDelivery={
          order.estimatedDelivery
        }
        progress={progress}
      />

      <RiderInfoCard
        rider={order.rider}
      />

      <TrackingTimeline
        timeline={order.timeline}
      />

    </div>
  );
}