

// src/pages/rider/Ratings.tsx

import {
  Star,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

import { useRiderRatings } from "../../hooks/rider/useRiderRatings";

export default function RiderRatings() {
  const {
    data,
    isLoading,
    isError,
  } = useRiderRatings();

  /* =========================================
     LOADING
  ========================================= */

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto space-y-6">

        <div className="h-10 w-64 rounded-xl bg-gray-100 animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="h-80 bg-gray-100 rounded-3xl animate-pulse" />

          <div className="lg:col-span-2 h-80 bg-gray-100 rounded-3xl animate-pulse" />

        </div>

        <div className="space-y-4">
          {[...Array(4)].map(
            (_, index) => (
              <div
                key={index}
                className="h-28 bg-gray-100 rounded-2xl animate-pulse"
              />
            )
          )}
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
            Failed to load ratings
          </h2>

          <p className="text-gray-500 mt-2">
            Please refresh the page
          </p>

        </div>

      </div>
    );
  }

  /* =========================================
     TOTAL REVIEWS
  ========================================= */

  const totalReviews =
    data.totalReviews || 0;

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Rider Ratings
          </h1>

          <p className="text-gray-500 mt-1">
            Customer feedback,
            performance ratings,
            and rider reputation
          </p>

        </div>

        <button className="border px-5 py-2 rounded-2xl font-medium hover:bg-gray-50 transition w-fit">
          Export Reviews
        </button>

      </div>

      {/* TOP SECTION */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* OVERALL RATING */}

        <div className="bg-white border rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center">

          <div className="p-5 rounded-full bg-yellow-100">

            <Star className="w-10 h-10 text-yellow-600 fill-yellow-500" />

          </div>

          <h2 className="text-6xl font-bold mt-5">
            {data.average}
          </h2>

          <p className="text-gray-500 mt-2">
            Average Rating
          </p>

          {/* STARS */}

          <div className="flex items-center gap-1 mt-5">

            {[1, 2, 3, 4, 5].map(
              (star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <=
                    Math.round(
                      data.average
                    )
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              )
            )}

          </div>

          <p className="text-sm text-gray-400 mt-4">
            Based on{" "}
            {totalReviews.toLocaleString()}{" "}
            customer reviews
          </p>

        </div>

        {/* BREAKDOWN */}

        <div className="lg:col-span-2 bg-white border rounded-3xl p-6 shadow-sm">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-xl font-semibold">
                Rating Breakdown
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Distribution of
                customer ratings
              </p>

            </div>

            <div className="p-3 rounded-2xl bg-gray-100">

              <TrendingUp className="w-6 h-6" />

            </div>

          </div>

          <div className="space-y-5">

            {[5, 4, 3, 2, 1].map(
              (star) => {
                const item =
                  data.breakdown.find(
                    (b) =>
                      b.stars ===
                      star
                  );

                const count =
                  item?.count || 0;

                const percentage =
                  totalReviews > 0
                    ? (
                        (count /
                          totalReviews) *
                        100
                      ).toFixed(0)
                    : 0;

                return (
                  <div
                    key={star}
                    className="flex items-center gap-4"
                  >

                    {/* STAR */}

                    <div className="flex items-center gap-1 w-16">

                      <span className="font-medium">
                        {star}
                      </span>

                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />

                    </div>

                    {/* BAR */}

                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-black rounded-full"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                    {/* COUNT */}

                    <div className="w-20 text-right text-sm text-gray-500">

                      {count} (
                      {percentage}%)

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* TOTAL REVIEWS */}

        <div className="bg-white border rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Reviews
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {data.totalReviews.toLocaleString()}
              </h2>
            </div>

            <div className="p-3 rounded-2xl bg-gray-100">

              <MessageSquare className="w-6 h-6" />

            </div>

          </div>

        </div>

        {/* SATISFACTION */}

        <div className="bg-white border rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Customer Satisfaction
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {(
                  (data.average /
                    5) *
                  100
                ).toFixed(0)}
                %
              </h2>

            </div>

            <div className="p-3 rounded-2xl bg-green-100">

              <TrendingUp className="w-6 h-6 text-green-700" />

            </div>

          </div>

        </div>

        {/* PERFORMANCE */}

        <div className="bg-white border rounded-3xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Rider Reputation
              </p>

              <h2 className="text-3xl font-bold mt-2">
                Excellent
              </h2>

            </div>

            <div className="p-3 rounded-2xl bg-yellow-100">

              <Star className="w-6 h-6 text-yellow-700 fill-yellow-500" />

            </div>

          </div>

        </div>

      </div>

      {/* RECENT REVIEW MOCKS */}

      <div className="bg-white border rounded-3xl p-6 shadow-sm">

        <div className="mb-6">

          <h2 className="text-xl font-semibold">
            Recent Customer Reviews
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest rider feedback
          </p>

        </div>

        <div className="space-y-4">

          {[
            {
              id: 1,
              name: "Sarah M.",
              rating: 5,
              review:
                "Fast delivery and very professional rider.",
            },
            {
              id: 2,
              name: "David K.",
              rating: 4,
              review:
                "Package arrived safely and on time.",
            },
            {
              id: 3,
              name: "John D.",
              rating: 5,
              review:
                "Excellent communication throughout the delivery.",
            },
          ].map((review) => (
            <div
              key={review.id}
              className="border rounded-2xl p-5"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <h3 className="font-semibold">
                    {review.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-2">

                    {[1, 2, 3, 4, 5].map(
                      (star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <=
                            review.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      )
                    )}

                  </div>

                </div>

                <span className="text-xs text-gray-400">
                  2 days ago
                </span>

              </div>

              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                {review.review}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}