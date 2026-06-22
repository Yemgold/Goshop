


import { Loader2 } from "lucide-react";

export default function LoadingTrackingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2
        size={48}
        className="animate-spin text-gray-400"
      />

      <p className="mt-4 text-gray-500">
        Tracking your order...
      </p>
    </div>
  );
}