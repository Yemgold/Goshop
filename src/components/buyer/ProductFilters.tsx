


type Props = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;

  sortBy: string;
  setSortBy: (v: string) => void;

  search: string;
  setSearch: (v: string) => void;
};

export function ProductFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  search,
  setSearch,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 justify-between">
      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="border p-2 rounded w-full md:w-1/3"
      />

      {/* CATEGORY */}
      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value)
        }
        className="border p-2 rounded"
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* SORT */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="popular">Popular</option>
        <option value="newest">Newest</option>
        <option value="priceLow">Price: Low</option>
        <option value="priceHigh">Price: High</option>
      </select>
    </div>
  );
}