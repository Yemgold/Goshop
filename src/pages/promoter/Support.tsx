


import { useState } from "react";
import {
  useTickets,
  useCreateTicket,
} from "../../hooks/promoter/promoter.hooks";

/* ================= TYPES ================= */
type TicketForm = {
  subject: string;
  message: string;
};

type SupportTicket = {
  id: string;
  subject: string;
  message: string;
  status?: "open" | "closed" | "pending";
  createdAt?: string;
};

export default function Support() {
  const { data, isLoading, isError } = useTickets();
  const { mutate: createTicket, isPending } = useCreateTicket();

  const tickets: SupportTicket[] = Array.isArray(data)
    ? data
    : [];

  const [form, setForm] = useState<TicketForm>({
    subject: "",
    message: "",
  });

  /* ================= HANDLER ================= */
  const handleSubmit = () => {
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!subject || !message) return;

    createTicket({
      subject,
      message,
    });

    setForm({ subject: "", message: "" });
  };

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="p-6 text-gray-500">
        Loading support tickets...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="p-6 text-red-500">
        Failed to load support tickets
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold">Support Center</h1>

      {/* ================= CREATE TICKET ================= */}
      <div className="border rounded-xl p-4 space-y-3">
        <h2 className="font-semibold">Create Ticket</h2>

        <input
          value={form.subject}
          onChange={(e) =>
            setForm({ ...form, subject: e.target.value })
          }
          placeholder="Subject"
          className="w-full border p-2 rounded"
        />

        <textarea
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          placeholder="Describe your issue..."
          className="w-full border p-2 rounded h-28"
        />

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className={`px-4 py-2 rounded text-white ${
            isPending ? "bg-gray-400" : "bg-black"
          }`}
        >
          {isPending ? "Sending..." : "Submit Ticket"}
        </button>
      </div>

      {/* ================= TICKETS LIST ================= */}
      <div className="space-y-3">
        <h2 className="font-semibold">Your Tickets</h2>

        {tickets.length === 0 ? (
          <p className="text-gray-500">
            No support tickets yet
          </p>
        ) : (
          tickets.map((t) => (
            <div
              key={t.id}
              className="border rounded-xl p-4 space-y-1"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  {t.subject}
                </h3>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    t.status === "open"
                      ? "bg-green-100 text-green-700"
                      : t.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {t.status || "open"}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                {t.message}
              </p>

              {t.createdAt && (
                <p className="text-xs text-gray-400">
                  {new Date(t.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}