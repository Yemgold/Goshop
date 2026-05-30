


import { useRiderActiveJob } from "../../hooks/rider/useRiderActiveJob";
import {
  MapPin,
  Navigation,
  Clock,
  Phone,
} from "lucide-react";

export default function RiderActive() {
  const {
    data,
    isLoading,
    isError,
  } = useRiderActiveJob();

  /* =========================
     LOADING
  ========================= */

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <div className="h-10 w-64 bg-gray-100 rounded-xl animate-pulse" />
        <div className="h-64 bg-gray-100 rounded-3xl animate-pulse" />
        <div className="h-40 bg-gray-100 rounded-3xl animate-pulse" />
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (isError) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <div className="bg-white border rounded-3xl p-10">
          <h2 className="text-xl font-bold">
            Failed to load active job
          </h2>
          <p className="text-gray-500 mt-2">
            Try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     EMPTY STATE
  ========================= */

  if (!data) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <div className="bg-white border rounded-3xl p-10">
          <h2 className="text-xl font-bold">
            No Active Delivery
          </h2>
          <p className="text-gray-500 mt-2">
            You are currently not on a delivery
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     PROGRESS (mock logic)
  ========================= */

  const getProgress = (status: string) => {
    switch (status) {
      case "assigned":
        return 25;
      case "picked_up":
        return 50;
      case "in_transit":
        return 80;
      case "delivered":
        return 100;
      default:
        return 10;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Active Delivery
        </h1>
        <p className="text-sm text-gray-500">
          Track your current job in real time
        </p>
      </div>

      {/* MAP */}
      <div className="h-64 bg-gray-100 rounded-3xl flex items-center justify-center text-gray-400">
        Live Map (Route Tracking)
      </div>

      {/* JOB CARD */}
      <div className="bg-white border rounded-3xl p-5 space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Job #{data.id}
          </h2>

          <span className="px-3 py-1 text-xs rounded-full bg-black text-white">
            {data.status}
          </span>
        </div>

        {/* ROUTE */}
        <div className="space-y-3 text-sm">

          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-green-600 mt-1" />
            <div>
              <p className="text-gray-500">Pickup</p>
              <p className="font-medium">
                {data.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Navigation className="w-4 h-4 text-red-600 mt-1" />
            <div>
              <p className="text-gray-500">Dropoff</p>
              <p className="font-medium">
                {data.dropoff}
              </p>
            </div>
          </div>

        </div>

        {/* ETA */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          ETA: {data.eta}
        </div>

      </div>

      {/* PROGRESS BAR */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{getProgress(data.status)}%</span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-black transition-all"
            style={{
              width: `${getProgress(data.status)}%`,
            }}
          />
        </div>
      </div>

      {/* ACTIONS */}
      <div className="grid grid-cols-2 gap-4">

        <button className="bg-black text-white py-3 rounded-2xl font-medium">
          Update Status
        </button>

        <button className="border py-3 rounded-2xl font-medium flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          Call Customer
        </button>

      </div>

    </div>
  );
}