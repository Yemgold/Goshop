

// src/pages/rider/History.tsx


import { useRiderHistory } from "../../hooks/rider/useRiderHistory";
import { Clock, MapPin } from "lucide-react";

export default function RiderHistory() {
  const {
    data,
    isLoading,
    isError,
  } = useRiderHistory();

  /* =========================
     LOADING
  ========================= */
  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <div className="h-10 w-64 bg-gray-100 rounded-xl animate-pulse" />
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-100 rounded-2xl animate-pulse"
          />
        ))}
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
            Failed to load history
          </h2>
          <p className="text-gray-500 mt-2">
            Please try again
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     EMPTY STATE
  ========================= */
  if (!data || data.length === 0) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center">
        <div className="bg-white border rounded-3xl p-10">
          <h2 className="text-xl font-bold">
            No Delivery History
          </h2>
          <p className="text-gray-500 mt-2">
            Completed deliveries will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Delivery History
        </h1>
        <p className="text-sm text-gray-500">
          Your completed and cancelled deliveries
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-4">

        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-3xl p-5 shadow-sm hover:shadow-md transition"
          >

            {/* TOP */}
            <div className="flex items-start justify-between">

              <div>
                <h2 className="font-semibold">
                  Order #{item.id}
                </h2>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4" />
                  {item.date}
                </div>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  item.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.status}
              </span>

            </div>

            {/* ROUTE */}
            <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {item.pickup} → {item.dropoff}
            </div>

            {/* EARNINGS */}
            <div className="mt-3 font-bold text-lg">
              ₦{item.fee.toLocaleString()}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}