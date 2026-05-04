

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Accepted: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
    Processing: "bg-yellow-100 text-yellow-700",
    Delivered: "bg-blue-100 text-blue-600",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${map[status] || ""}`}>
      {status}
    </span>
  );
}