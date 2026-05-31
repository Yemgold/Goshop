

export function CartSkeleton() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 animate-pulse">

      {/* HEADER SKELETON */}
      <div className="h-6 w-40 bg-gray-200 rounded" />

      {/* CART ITEMS */}
      <div className="space-y-4">

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex gap-4 p-4 border rounded-lg"
          >

            {/* IMAGE */}
            <div className="w-24 h-24 bg-gray-200 rounded" />

            {/* DETAILS */}
            <div className="flex-1 space-y-3">

              {/* TITLE */}
              <div className="h-4 w-3/4 bg-gray-200 rounded" />

              {/* CATEGORY */}
              <div className="h-3 w-1/2 bg-gray-200 rounded" />

              {/* PRICE */}
              <div className="h-4 w-24 bg-gray-200 rounded" />

              {/* QTY CONTROLS */}
              <div className="flex gap-3 items-center mt-2">

                <div className="w-8 h-8 bg-gray-200 rounded" />
                <div className="w-6 h-4 bg-gray-200 rounded" />
                <div className="w-8 h-8 bg-gray-200 rounded" />

              </div>

            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY SKELETON */}
      <div className="border rounded-lg p-4 space-y-4">

        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-28 bg-gray-200 rounded" />
          <div className="h-10 w-32 bg-gray-200 rounded" />
        </div>

      </div>

    </div>
  );
}