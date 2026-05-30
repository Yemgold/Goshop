

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse space-y-3 p-3 rounded-xl bg-white/10">

      <div className="h-40 bg-white/20 rounded-lg" />

      <div className="h-4 bg-white/20 rounded w-3/4" />

      <div className="h-3 bg-white/10 rounded w-1/2" />

      <div className="h-4 bg-white/20 rounded w-1/3" />

    </div>
  );
}