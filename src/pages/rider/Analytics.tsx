

// src/pages/rider/Analytics.tsx

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import {
  Bike,
  CheckCircle2,
  Wallet,
  XCircle,
} from "lucide-react";

import { useRiderAnalytics } from "../../hooks/rider/useRiderAnalytics";

export default function RiderAnalytics() {
  const {
    data,
    isLoading,
    isError,
  } = useRiderAnalytics();

  /* =========================================
     LOADING
  ========================================= */

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">

        <div className="h-10 w-72 rounded-xl bg-gray-100 animate-pulse" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-32 rounded-3xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <div
              key={index}
              className="h-96 rounded-3xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>

      </div>
    );
  }

  /* =========================================
     ERROR
  ========================================= */

  if (isError || !data) {
    return (
      <div className="p-6 max-w-3xl mx-auto">

        <div className="bg-white border rounded-3xl p-10 text-center">

          <h2 className="text-2xl font-bold">
            Failed to load analytics
          </h2>

          <p className="text-gray-500 mt-2">
            Please refresh the page
          </p>

        </div>

      </div>
    );
  }

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Rider Analytics
          </h1>

          <p className="text-gray-500 mt-1">
            Monitor deliveries,
            earnings, performance,
            and rider activity
          </p>
        </div>

        <button className="border px-5 py-2 rounded-2xl font-medium hover:bg-gray-50 transition w-fit">
          Export Report
        </button>

      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* TOTAL DELIVERIES */}

        <div className="bg-white border rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="p-3 rounded-2xl bg-gray-100">
              <Bike className="w-6 h-6" />
            </div>

            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              +12%
            </span>

          </div>

          <p className="text-sm text-gray-500 mt-5">
            Total Deliveries
          </p>

          <h2 className="text-3xl font-bold mt-1">
            {data.totalDeliveries.toLocaleString()}
          </h2>

        </div>

        {/* COMPLETED */}

        <div className="bg-white border rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="p-3 rounded-2xl bg-green-100">
              <CheckCircle2 className="w-6 h-6 text-green-700" />
            </div>

            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Success
            </span>

          </div>

          <p className="text-sm text-gray-500 mt-5">
            Completed Deliveries
          </p>

          <h2 className="text-3xl font-bold mt-1">
            {data.completed.toLocaleString()}
          </h2>

        </div>

        {/* CANCELLED */}

        <div className="bg-white border rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="p-3 rounded-2xl bg-red-100">
              <XCircle className="w-6 h-6 text-red-700" />
            </div>

            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
              Low
            </span>

          </div>

          <p className="text-sm text-gray-500 mt-5">
            Cancelled Deliveries
          </p>

          <h2 className="text-3xl font-bold mt-1">
            {data.cancelled.toLocaleString()}
          </h2>

        </div>

        {/* EARNINGS */}

        <div className="bg-white border rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="p-3 rounded-2xl bg-yellow-100">
              <Wallet className="w-6 h-6 text-yellow-700" />
            </div>

            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              Monthly
            </span>

          </div>

          <p className="text-sm text-gray-500 mt-5">
            Total Earnings
          </p>

          <h2 className="text-3xl font-bold mt-1">
            ₦
            {data.earnings.toLocaleString()}
          </h2>

        </div>

      </div>

      {/* SECOND ROW */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* EARNINGS TREND */}

        <div className="lg:col-span-2 bg-white border rounded-3xl p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Earnings Overview
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Rider earnings trend
              over time
            </p>

          </div>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={
                  data.earningsChart
                }
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#000"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* ACCEPTANCE RATE */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              Acceptance Rate
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Jobs accepted vs total
              assigned
            </p>

          </div>

          <div className="flex items-center justify-center flex-1">

            <div className="relative w-52 h-52">

              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 120 120"
              >

                {/* BG */}

                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="#E5E7EB"
                  strokeWidth="12"
                  fill="none"
                />

                {/* PROGRESS */}

                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="black"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={314}
                  strokeDashoffset={
                    314 -
                    (314 *
                      data.acceptanceRate) /
                      100
                  }
                  strokeLinecap="round"
                />

              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <h2 className="text-4xl font-bold">
                  {data.acceptanceRate}%
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Acceptance
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* PERFORMANCE */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* DELIVERY BREAKDOWN */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Delivery Breakdown
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Completed vs cancelled
            </p>

          </div>

          <div className="h-72">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={[
                  {
                    name: "Completed",
                    value:
                      data.completed,
                  },
                  {
                    name: "Cancelled",
                    value:
                      data.cancelled,
                  },
                ]}
              >

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#000"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* PERFORMANCE SUMMARY */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm space-y-6">

          <div>

            <h2 className="text-xl font-semibold">
              Performance Summary
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Rider operational stats
            </p>

          </div>

          {/* CARD */}

          <div className="border rounded-2xl p-5">

            <p className="text-sm text-gray-500">
              Delivery Completion
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {Math.round(
                (data.completed /
                  data.totalDeliveries) *
                  100
              )}
              %
            </h3>

          </div>

          {/* CARD */}

          <div className="border rounded-2xl p-5">

            <p className="text-sm text-gray-500">
              Average Earnings Per Delivery
            </p>

            <h3 className="text-3xl font-bold mt-2">
              ₦
              {Math.round(
                data.earnings /
                  data.completed
              ).toLocaleString()}
            </h3>

          </div>

          {/* CARD */}

          <div className="border rounded-2xl p-5">

            <p className="text-sm text-gray-500">
              Rider Efficiency
            </p>

            <h3 className="text-3xl font-bold mt-2">
              Excellent
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}