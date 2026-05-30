


import { useAnalytics } from "../../hooks/promoter/promoter.hooks";

export default function PromoterAnalytics() {
  const { data, isLoading, isError } = useAnalytics();

  if (isLoading) return <p className="p-6">Loading analytics...</p>;

  if (isError || !data) {
    return <p className="p-6 text-red-500">Failed to load analytics</p>;
  }

  const stats = data.stats ?? {};
  const breakdown = data.breakdown ?? {};
  const recentOrders = data.recentOrders ?? [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Promoter Analytics</h1>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card label="Total Orders" value={stats.totalOrders ?? 0} />
        <Card
          label="Revenue"
          value={`₦${(stats.totalRevenue ?? 0).toLocaleString()}`}
        />
        <Card label="Completed" value={stats.completedOrders ?? 0} />
        <Card label="Pending" value={stats.pendingOrders ?? 0} />
      </div>

      {/* BREAKDOWN */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Status Breakdown</h2>

        <ul className="space-y-1">
          {Object.entries(breakdown).map(([key, value]) => (
            <li
              key={key}
              className="flex justify-between border p-2 rounded"
            >
              <span>{key}</span>
              <span>{Number(value) || 0}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* RECENT ORDERS */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No recent orders</p>
        ) : (
          recentOrders.map((order: any) => (
            <div key={order.id} className="border p-3 rounded mb-2">
              <p>Order #{order.id}</p>
              <p>Total: ₦{(order.total ?? 0).toLocaleString()}</p>
              <p>Status: {order.deliveryStatus ?? "N/A"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Card({ label, value }: any) {
  return (
    <div className="border p-4 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}