


import React from "react";

const MarketplaceLoading: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-3xl bg-white shadow-lg overflow-hidden animate-pulse"
        >
          <div className="h-64 bg-gray-200" />

          <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-8 bg-gray-200 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketplaceLoading;