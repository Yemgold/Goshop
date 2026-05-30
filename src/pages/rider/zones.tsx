


import { useRiderZones } from "../../hooks/rider/useRiderZones";

export default function RiderZones() {
  const { data, isLoading } = useRiderZones();

  if (isLoading) return <div className="p-6">Loading zones...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Delivery Zones</h1>

      <div className="space-y-3">
        {data?.map((zone) => (
          <div
            key={zone.id}
            className="p-4 border rounded-2xl flex justify-between"
          >
            <p className="font-medium">{zone.name}</p>
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                zone.active
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {zone.active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}