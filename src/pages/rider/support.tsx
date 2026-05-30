

import { useRiderSupportTickets } from "../../hooks/rider/useRiderSupportTickets";

export default function RiderSupport() {
  const { data, isLoading } = useRiderSupportTickets();

  if (isLoading) return <div className="p-6">Loading support...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Support</h1>

      <div className="space-y-3">

        {data?.map((t) => (
          <div
            key={t.id}
            className="p-4 border rounded-2xl flex justify-between"
          >
            <div>
              <p className="font-medium">{t.subject}</p>
              <p className="text-sm text-gray-500">{t.id}</p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-600">
              {t.status}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}