
import React from "react";
import { useNotifications } from "../../hooks/useNotifications";

const Notifications: React.FC = () => {
  const { notifications, markAsRead, clear } = useNotifications();

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Notifications</h1>

        <button
          onClick={clear}
          className="text-sm border px-3 py-1 rounded"
        >
          Clear
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">

        {notifications.length === 0 && (
          <p className="text-gray-500 text-center py-6">
            No notifications yet
          </p>
        )}

        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 border rounded-xl transition ${
              n.read ? "opacity-50" : "bg-white shadow-sm"
            }`}
          >

            <div className="flex justify-between">

              <h2 className="font-semibold">{n.title}</h2>

              {!n.read && (
                <button
                  onClick={() => markAsRead(n.id)}
                  className="text-xs text-blue-600"
                >
                  Mark read
                </button>
              )}

            </div>

            <p className="text-sm text-gray-600">
              {n.message}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Notifications;