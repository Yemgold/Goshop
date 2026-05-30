
import { useRiderVehicle } from "../../hooks/rider/useRiderVehicle";

export default function RiderVehicle() {
  const { data, isLoading } = useRiderVehicle();

  if (isLoading) return <div className="p-6">Loading vehicle...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Vehicle</h1>

      <div className="bg-white border rounded-2xl p-5 space-y-3">

        <p><b>Type:</b> {data?.type}</p>
        <p><b>Model:</b> {data?.model}</p>
        <p><b>Plate:</b> {data?.plateNumber}</p>

        <p>
          <b>Status:</b>{" "}
          <span className={data?.verified ? "text-green-600" : "text-red-600"}>
            {data?.verified ? "Verified" : "Not Verified"}
          </span>
        </p>

      </div>

    </div>
  );
}