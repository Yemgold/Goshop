

import React from "react";
import {
  Search,
  ArrowUpDown,
  Grid2X2,
  List,
} from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  view: "grid" | "list";
  setView: (value: "grid" | "list") => void;

  categories: string[];
  totalProducts: number;
}

const MarketplaceToolbar: React.FC<Props> = ({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
  view,
  setView,
  categories,
  totalProducts,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6">
      {/* ================= TOP ROW ================= */}

      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        {/* Search */}

        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* Sort + View */}

        <div className="flex gap-3">
          <div className="relative">
            <ArrowUpDown
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-xl border appearance-none"
            >
              <option>Newest</option>
              <option>Lowest Price</option>
              <option>Highest Price</option>
              <option>Most Popular</option>
            </select>
          </div>

          {/* View Buttons */}

          <div className="flex rounded-xl border overflow-hidden">
            <button
              onClick={() => setView("grid")}
              className={`p-3 transition ${
                view === "grid"
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <Grid2X2 size={20} />
            </button>

            <button
              onClick={() => setView("list")}
              className={`p-3 transition ${
                view === "list"
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= CATEGORIES ================= */}

      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full transition ${
              category === cat
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ================= BOTTOM ROW ================= */}

      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="text-gray-600">
          Showing
          <span className="font-bold text-black mx-2">
            {totalProducts}
          </span>
          Products
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
            {sortBy}
          </span>

          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceToolbar;