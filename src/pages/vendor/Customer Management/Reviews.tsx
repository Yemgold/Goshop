


import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

import { PageHeader } from "../../../components/ui/PageHeader"; 

import { StatCard } from "../../../components/ui/StatCard"; 

import { SectionCard } from "../../../components/ui/SectionCard"; 

import { useVendorReviews } from "../../../hooks/vendor/useVendorReviews"; 

export default function Reviews() {
  const {
    data,
    isLoading,
    isError,
  } = useVendorReviews();

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>

        <div className="h-80 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (isError || !data) {
    return (
      <div className="p-6 text-red-500">
        Failed to load reviews.
      </div>
    );
  }

  /* ================= CHART DATA ================= */

  const chartData = [
    {
      name: "Positive",
      value:
        data.summary
          .positiveReviews,
    },

    {
      name: "Negative",
      value:
        data.summary
          .negativeReviews,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}

      <PageHeader
        title="Vendor Reviews"
        subtitle="Monitor customer feedback and product ratings"
      />

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Avg Rating"
          value={
            data.summary.averageRating
          }
        />

        <StatCard
          title="Total Reviews"
          value={
            data.summary.totalReviews
          }
        />

        <StatCard
          title="Positive"
          value={
            data.summary.positiveReviews
          }
        />

        <StatCard
          title="Negative"
          value={
            data.summary.negativeReviews
          }
        />
      </div>

      {/* REVIEW DISTRIBUTION */}

      <SectionCard title="Review Sentiment">
        <div className="h-80">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={120}
                label
              >
                <Cell fill="#16A34A" />

                <Cell fill="#DC2626" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* REVIEWS TABLE */}

      <SectionCard title="Customer Reviews">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="py-3">
                  Customer
                </th>

                <th className="py-3">
                  Product
                </th>

                <th className="py-3">
                  Rating
                </th>

                <th className="py-3">
                  Comment
                </th>

                <th className="py-3">
                  Status
                </th>

                <th className="py-3">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {data.reviews.map(
                (review) => (
                  <tr
                    key={review.id}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {review.customer}
                    </td>

                    <td className="py-4">
                      {review.product}
                    </td>

                    <td className="py-4">
                      ⭐ {review.rating}
                    </td>

                    <td className="py-4 text-sm text-gray-600">
                      {review.comment}
                    </td>

                    {/* STATUS */}

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          review.status ===
                          "approved"
                            ? "bg-green-100 text-green-700"
                            : review.status ===
                              "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {review.status}
                      </span>
                    </td>

                    <td className="py-4">
                      {review.createdAt}
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