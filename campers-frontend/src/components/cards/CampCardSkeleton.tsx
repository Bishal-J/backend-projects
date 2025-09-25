export default function CampCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-muted/30 bg-surface flex flex-col overflow-hidden"
        >
          <div className="h-52 w-full bg-muted/40 relative" />
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-6 bg-muted/40 rounded w-3/4" />
              <div className="h-4 bg-muted/40 rounded w-full" />
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="h-4 bg-muted/40 rounded w-full" />
                <div className="h-4 bg-muted/40 rounded w-full" />
                <div className="h-4 bg-muted/40 rounded w-full" />
                <div className="h-4 bg-muted/40 rounded w-full" />
              </div>
            </div>
            <div className="flex items-center justify-between mt-5 border-t border-muted/30 pt-4">
              <div className="h-6 bg-muted/40 rounded w-20" />
              <div className="h-8 bg-muted/40 rounded w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
