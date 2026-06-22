

import { Card } from "../ui/Card";

type Props = {
  status: string;
  estimatedDelivery?: string;
  progress: number;
};

export default function TrackingStatusCard({
  status,
  estimatedDelivery,
  progress,
}: Props) {
  return (
    <Card>
      <div className="space-y-3">

        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Status
            </p>

            <h2 className="text-lg font-semibold">
              {status}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              Estimated Delivery
            </p>

            <h2 className="font-semibold">
              {estimatedDelivery || "TBD"}
            </h2>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-black h-2 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500">
          <span>Order Created</span>
          <span>{Math.round(progress)}%</span>
          <span>Delivered</span>
        </div>

      </div>
    </Card>
  );
}