import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { PageHeader } from "../../components/ui/PageHeader";
import { StatCard } from "../../components/ui/StatCard";
import { SectionCard } from "../../components/ui/SectionCard";

import { useVendorAnalytics } from "../../hooks/vendor/useVendorAnalytics";

const COLORS = ["#111827", "#2563EB", "#10B981", "#F59E0B", "#EF4444"];

export default function Analytics() {
  const { data, isLoading, isError, refetch, isFetching } =
    useVendorAnalytics();

  /* ================================================= */
  /* LOADING STATE */
  /* ================================================= */

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>

        <div className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
      </div>
    );
  }

  /* ================================================= */
  /* ERROR STATE (PROFESSIONAL + RECOVERY ACTION) */
  /* ================================================= */

  if (isError) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-center space-y-4">
        <div className="text-red-500 font-semibold text-lg">
          Failed to load analytics
        </div>

        <p className="text-gray-500 text-sm">
          We couldn’t fetch your vendor analytics. This may be due to a network
          issue or server downtime.
        </p>

        <button
          onClick={() => refetch()}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  /* ================================================= */
  /* EMPTY STATE (NO DATA BUT API WORKS) */
  /* ================================================= */

  if (!data) {
    return (
      <div className="p-10 text-center space-y-3">
        <div className="text-5xl">📊</div>

        <h2 className="text-lg font-semibold">
          No Analytics Available
        </h2>

        <p className="text-gray-500">
          You don’t have enough data yet. Start selling to generate insights.
        </p>
      </div>
    );
  }

  /* ================================================= */
  /* SAFE DATA HANDLING */
  /* ================================================= */

  const salesChart = data.salesChart ?? [];

  const topProducts = data.topProducts ?? [];

  const customerData = [
    {
      name: "Returning",
      value: data.returningCustomers ?? 0,
    },
    {
      name: "New",
      value: Math.max(
        (data.totalOrders ?? 0) - (data.returningCustomers ?? 0),
        0
      ),
    },
  ];

  /* ================================================= */
  /* UI */
  /* ================================================= */

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <PageHeader
        title="Vendor Analytics"
        subtitle="Track sales, revenue trends, and customer behavior."
      />

      {/* REFRESHING INDICATOR */}
      {isFetching && (
        <div className="text-sm text-gray-400">
          Refreshing latest data...
        </div>
      )}

      {/* ================================================= */}
      {/* KPI STATS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Sales"
          value={`₦${(data.totalSales ?? 0).toLocaleString()}`}
        />

        <StatCard title="Total Orders" value={data.totalOrders ?? 0} />

        <StatCard
          title="Conversion Rate"
          value={`${data.conversionRate ?? 0}%`}
        />

        <StatCard
          title="Visitors"
          value={(data.totalVisitors ?? 0).toLocaleString()}
        />

        <StatCard
          title="Returning Customers"
          value={data.returningCustomers ?? 0}
        />

        <StatCard title="Canceled Orders" value={data.canceledOrders ?? 0} />

        <StatCard
          title="Average Order Value"
          value={`₦${(data.averageOrderValue ?? 0).toLocaleString()}`}
        />

        <StatCard
          title="Top Product"
          value={topProducts?.[0]?.name ?? "N/A"}
        />
      </div>

      {/* ================================================= */}
      {/* CHARTS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <SectionCard title="Revenue Trends">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#111827"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Best Selling Products">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#2563EB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* ================================================= */}
      {/* CUSTOMER BREAKDOWN */}
      {/* ================================================= */}

      <SectionCard title="Customer Breakdown">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={customerData} dataKey="value" outerRadius={110} label>
                {customerData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <SectionCard title="Top Products Overview">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">Product</th>
                <th className="py-3">Units Sold</th>
                <th className="py-3">Revenue</th>
              </tr>
            </thead>

            <tbody>
              {topProducts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-gray-400">
                    No product analytics yet
                  </td>
                </tr>
              ) : (
                topProducts.map((product: any) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-4 font-medium">{product.name}</td>
                    <td className="py-4">{product.sales}</td>
                    <td className="py-4">
                      ₦{(product.revenue ?? 0).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

