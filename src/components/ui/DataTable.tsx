

import React, { useMemo, useState } from "react";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
};

type Props<T extends object> = {
  data: T[];
  columns: Column<T>[];
  emptyText?: string;
  loading?: boolean;
};

export function DataTable<T extends object>({
  data,
  columns,
  emptyText = "No data available",
  loading = false,
}: Props<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // 🔍 FILTER
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row as any)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  // 📊 SORT
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];

      if (typeof aVal === "number") return aVal - bVal;
      return String(aVal).localeCompare(String(bVal));
    });
  }, [filteredData, sortKey]);

  // 🟦 TOGGLE SELECT
  const toggleRow = (index: number) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center p-6 text-gray-500">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      {/* 🔍 SEARCH BAR */}
      <div className="p-3 border-b">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />
      </div>

      {/* HEADER */}
      <div
        className="grid bg-gray-50 p-3 text-sm font-semibold border-b"
        style={{
          gridTemplateColumns: `40px repeat(${columns.length}, minmax(0, 1fr))`,
        }}
      >
        <div>#</div>

        {columns.map((col, index) => (
          <div
            key={`${String(col.key)}-${index}`}
            className={col.sortable ? "cursor-pointer" : ""}
            onClick={() =>
              col.sortable && setSortKey(String(col.key))
            }
          >
            {col.label}
          </div>
        ))}
      </div>

      {/* ROWS */}
      {sortedData.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid p-3 border-b last:border-none hover:bg-gray-50 text-sm"
          style={{
            gridTemplateColumns: `40px repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >

          {/* SELECT BOX */}
          <div>
            <input
              type="checkbox"
              checked={selectedRows.includes(rowIndex)}
              onChange={() => toggleRow(rowIndex)}
            />
          </div>

          {/* DATA CELLS */}
          {columns.map((col, colIndex) => (
            <div key={`${String(col.key)}-${colIndex}`}>
              {col.render
                ? col.render(row)
                : col.key in row
                ? String((row as any)[col.key])
                : "-"}
            </div>
          ))}

        </div>
      ))}

    </div>
  );
}