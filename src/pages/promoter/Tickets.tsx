

import { useMemo } from "react";
import { useTickets } from "../../hooks/promoter/promoter.hooks";

/* ================= TYPES ================= */
type Ticket = {
  id: string;
  subject: string;
  message: string;
  status?: "open" | "pending" | "closed";
  createdAt?: string;
};

export default function Tickets() {
  const { data, isLoading, isError } = useTickets();

  /* ================= SAFE DATA ================= */
  const tickets: Ticket[] = Array.isArray(data) ? data : [];

  /* ================= SORT TICKETS (latest first) ================= */
  const sortedTickets = useMemo(() => {
    return [...tickets].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      return dateB - dateA;
    });
  }, [tickets]);

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading tickets...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load tickets
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold">
        Support Tickets
      </h1>

      {sortedTickets.length === 0 ? (
        <div className="text-gray-500">
          No tickets found
        </div>
      ) : (
        <div className="space-y-3">
          {sortedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded-xl p-4 space-y-2 bg-white"
            >
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <h2 className="font-semibold">
                  {ticket.subject}
                </h2>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    ticket.status === "open"
                      ? "bg-green-100 text-green-700"
                      : ticket.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {ticket.status || "open"}
                </span>
              </div>

              {/* MESSAGE */}
              <p className="text-sm text-gray-600">
                {ticket.message}
              </p>

              {/* DATE */}
              {ticket.createdAt && (
                <p className="text-xs text-gray-400">
                  {new Date(
                    ticket.createdAt
                  ).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}