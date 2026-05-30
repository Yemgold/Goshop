


export function ListSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">

      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-3 p-3 bg-white/10 rounded-lg">

          <div className="w-12 h-12 bg-white/20 rounded-full" />

          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/20 w-3/4 rounded" />
            <div className="h-2 bg-white/10 w-1/2 rounded" />
          </div>

        </div>
      ))}

    </div>
  );
}