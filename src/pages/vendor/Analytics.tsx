
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";

// import { PageHeader } from "../../components/ui/PageHeader";
// import { StatCard } from "../../components/ui/StatCard";
// import { SectionCard } from "../../components/ui/SectionCard";

// import { useVendorAnalytics } from "../../hooks/vendor/useVendorAnalytics";


// export default function Analytics() {
//   const { data, isLoading, isError } = useVendorAnalytics();

//   /* ================= LOADING ================= */
//   if (isLoading) {
//     return (
//       <div className="p-6 max-w-6xl mx-auto space-y-6">
//         <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {[...Array(3)].map((_, i) => (
//             <div
//               key={i}
//               className="h-24 bg-gray-200 rounded animate-pulse"
//             />
//           ))}
//         </div>

//         <div className="grid md:grid-cols-2 gap-4">
//           {[...Array(2)].map((_, i) => (
//             <div
//               key={i}
//               className="h-64 bg-gray-200 rounded animate-pulse"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   /* ================= ERROR ================= */
//   if (isError || !data) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         Failed to load analytics. Try refreshing.
//       </div>
//     );
//   }

//   /* ================= UI ================= */
//   return (
//     <div className="p-6 max-w-6xl mx-auto space-y-6">

//       {/* HEADER */}
//       <PageHeader title="Vendor Analytics" />

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//         <StatCard
//           title="Revenue"
//           value={`₦${data.revenue.toLocaleString()}`}
//           subtitle="+18% this week"
//         />

//         <StatCard
//           title="Orders"
//           value={data.orders}
//           subtitle="12 pending"
//         />

//         <StatCard
//           title="Conversion Rate"
//           value={`${data.conversionRate}%`}
//           subtitle="+1.2% improvement"
//         />

//       </div>

//       {/* CHARTS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//         {/* LINE CHART */}
//         <SectionCard title="Revenue Trend">
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={data.salesChart || []}>
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="revenue"
//                   stroke="#111"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </SectionCard>

//         {/* BAR CHART */}
//         <SectionCard title="Top Products Sales">
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data.topProducts || []}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="sales" fill="#000" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </SectionCard>

//       </div>

//       {/* INSIGHTS */}
//       <SectionCard title="Performance Insights">
//         <div className="text-sm text-gray-600 space-y-2">
//           <p>• Best performing day: {data.insights?.bestDay}</p>
//           <p>• Highest selling category: {data.insights?.topCategory}</p>
//           <p>• Return rate: {data.insights?.returnRate}%</p>
//         </div>
//       </SectionCard>

//     </div>
//   );
// }





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

const COLORS = [
  "#111827",
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

export default function Analytics() {
  const { data, isLoading, isError } =
    useVendorAnalytics();

  /* ================= LOADING ================= */

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

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gray-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load analytics. Try refreshing.
      </div>
    );
  }

  /* ================= PIE DATA ================= */

  const customerData = [
    {
      name: "Returning",
      value: data.returningCustomers || 0,
    },
    {
      name: "New",
      value:
        (data.totalOrders || 0) -
        (data.returningCustomers || 0),
    },
  ];

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <PageHeader
        title="Vendor Analytics"
        subtitle="Track sales, revenue trends, customer activity, and store performance."
      />

      {/* ================================================= */}
      {/* KPI STATS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Sales"
          value={`₦${(
            data.totalSales || 0
          ).toLocaleString()}`}
          subtitle="+18% this month"
        />

        <StatCard
          title="Total Orders"
          value={data.totalOrders || 0}
          subtitle="All completed orders"
        />

        <StatCard
          title="Conversion Rate"
          value={`${data.conversionRate || 0}%`}
          subtitle="Store conversion performance"
        />

        <StatCard
          title="Visitors"
          value={(
            data.totalVisitors || 0
          ).toLocaleString()}
          subtitle="Total store traffic"
        />

        <StatCard
          title="Returning Customers"
          value={data.returningCustomers || 0}
          subtitle="Repeat buyers"
        />

        <StatCard
          title="Canceled Orders"
          value={data.canceledOrders || 0}
          subtitle="Canceled purchases"
        />

        <StatCard
          title="Average Order Value"
          value={`₦${(
            data.averageOrderValue || 0
          ).toLocaleString()}`}
          subtitle="Average customer spend"
        />

        <StatCard
          title="Top Product"
          value={
            data.topProducts?.[0]?.name || "N/A"
          }
          subtitle="Best selling product"
        />
      </div>

      {/* ================================================= */}
      {/* CHARTS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* ================= REVENUE TREND ================= */}

        <SectionCard title="Revenue Trends">
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={data.salesChart || []}
              >
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

        {/* ================= TOP PRODUCTS ================= */}

        <SectionCard title="Best Selling Products">
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={data.topProducts || []}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="sales"
                  fill="#2563EB"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      {/* ================================================= */}
      {/* EXTRA ANALYTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* ================= CUSTOMER BREAKDOWN ================= */}

        <SectionCard title="Customer Breakdown">
          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={customerData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {customerData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* ================= PERFORMANCE INSIGHTS ================= */}

        <SectionCard title="Performance Insights">
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center justify-between border-b pb-3">
              <span>Best Performing Day</span>

              <span className="font-semibold text-black">
                {data.insights?.bestDay ||
                  "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span>
                Highest Selling Category
              </span>

              <span className="font-semibold text-black">
                {data.insights?.topCategory ||
                  "N/A"}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span>Return Rate</span>

              <span className="font-semibold text-black">
                {data.insights?.returnRate || 0}%
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span>Total Visitors</span>

              <span className="font-semibold text-black">
                {(
                  data.totalVisitors || 0
                ).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Average Order Value</span>

              <span className="font-semibold text-black">
                ₦
                {(
                  data.averageOrderValue || 0
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ================================================= */}
      {/* PRODUCTS TABLE */}
      {/* ================================================= */}

      <SectionCard title="Top Products Overview">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Product
                </th>

                <th className="py-3">
                  Units Sold
                </th>

                <th className="py-3">
                  Revenue
                </th>
              </tr>
            </thead>

            <tbody>
              {data.topProducts?.map(
                (product: any) => (
                  <tr
                    key={product.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {product.name}
                    </td>

                    <td className="py-4">
                      {product.sales}
                    </td>

                    <td className="py-4">
                      ₦
                      {(
                        product.revenue || 0
                      ).toLocaleString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}