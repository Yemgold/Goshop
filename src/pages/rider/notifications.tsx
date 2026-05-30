

import { Bell } from "lucide-react";

const mock = [
  { id: "1", title: "New Job Available", date: "Today" },
  { id: "2", title: "Payout Processed", date: "Yesterday" },
];

export default function RiderNotifications() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Notifications</h1>

      <div className="space-y-3">

        {mock.map((n) => (
          <div
            key={n.id}
            className="p-4 border rounded-2xl flex items-center gap-3"
          >
            <Bell className="w-5 h-5 text-gray-600" />

            <div>
              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-gray-500">{n.date}</p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}