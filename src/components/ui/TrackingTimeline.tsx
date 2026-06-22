


import { CheckCircle2 } from "lucide-react";
import { Card } from "../ui/Card";

type TimelineItem = {
  step: string;
  completed: boolean;
  time?: string;
};

type Props = {
  timeline: TimelineItem[];
};

export default function TrackingTimeline({
  timeline,
}: Props) {
  return (
    <Card>
      <h2 className="font-semibold mb-5">
        Delivery Progress
      </h2>

      <div className="space-y-5">

        {timeline?.map((item, index) => (
          <div
            key={index}
            className="flex gap-4"
          >
            {/* Timeline Dot */}
            <div className="flex flex-col items-center">

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item.completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {item.completed ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-current" />
                )}
              </div>

              {index !== timeline.length - 1 && (
                <div
                  className={`w-[2px] flex-1 min-h-[40px] ${
                    item.completed
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">

              <div className="flex justify-between gap-3">

                <p
                  className={`font-medium ${
                    item.completed
                      ? "text-black"
                      : "text-gray-500"
                  }`}
                >
                  {item.step}
                </p>

                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {item.time || ""}
                </span>

              </div>

              <p className="text-xs text-gray-400 mt-1">
                {item.completed
                  ? "Completed"
                  : "Pending"}
              </p>

            </div>
          </div>
        ))}

      </div>
    </Card>
  );
}