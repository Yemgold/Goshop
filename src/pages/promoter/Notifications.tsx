

import { useMemo } from "react";
import { useNotifications, useReadNotification } from "../../hooks/promoter/promoter.hooks";

/* ================= TYPES (safe fallback) ================= */
type NotificationItem = {
  id: string;
  title?: string;
  message?: string;
  createdAt?: string;
  read?: boolean;
};

export default function PromoterNotifications() {
  const { data, isLoading, isError } = useNotifications();
  const { mutate: markRead, isPending } = useReadNotification();

  const notifications: NotificationItem[] = (data ?? []) as NotificationItem[];

  const sorted = useMemo(() => {
    return [...notifications].sort(
      (a, b) =>
        new Date(b.createdAt ?? 0).getTime() -
        new Date(a.createdAt ?? 0).getTime()
    );
  }, [notifications]);

  if (isLoading) {
    return <div className="p-6 text-gray-500">Loading notifications...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load notifications
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Notifications</h1>

      {sorted.length === 0 ? (
        <div className="text-gray-500">No notifications yet</div>
      ) : (
        <div className="space-y-3">
          {sorted.map((n) => (
            <div
              key={n.id}
              className={`border rounded-xl p-4 flex justify-between items-start gap-4 ${
                n.read ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div>
                <h2 className="font-semibold">
                  {n.title || "Notification"}
                </h2>

                <p className="text-sm text-gray-600">
                  {n.message}
                </p>

                {n.createdAt && (
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                )}
              </div>

              {!n.read && (
                <button
                  disabled={isPending}
                  onClick={() => markRead(n.id)}
                  className="text-xs px-3 py-1 rounded-full bg-black text-white"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}