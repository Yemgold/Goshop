

import { useRiderSettings } from "../../hooks/rider/useRiderSettings";

export default function RiderSettings() {
  const { data, isLoading } = useRiderSettings();

  if (isLoading) return <div className="p-6">Loading settings...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">

        <div className="p-4 border rounded-2xl flex justify-between">
          <p>Availability</p>
          <p className="font-medium">
            {data?.availability ? "Online" : "Offline"}
          </p>
        </div>

        <div className="p-4 border rounded-2xl flex justify-between">
          <p>Notifications</p>
          <p className="font-medium">
            {data?.notifications ? "Enabled" : "Disabled"}
          </p>
        </div>

        <div className="p-4 border rounded-2xl flex justify-between">
          <p>Language</p>
          <p className="font-medium">{data?.language}</p>
        </div>

      </div>

    </div>
  );
}