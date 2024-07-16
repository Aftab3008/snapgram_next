import { Skeleton } from "@/components/ui/skeleton";

export function SavedSkeleton() {
  return (
    <div className="w-full flex justify-center max-w-5xl gap-9">
      <div className="grid-container">
        <div className="relative min-w-80 h-80">
          <Skeleton className="h-full w-full rounded-xl bg-dark-4" />
        </div>
        <div className="relative min-w-80 h-80">
          <Skeleton className="h-full w-full rounded-xl bg-dark-4" />
        </div>
        <div className="relative min-w-80 h-80">
          <Skeleton className="h-full w-full rounded-xl bg-dark-4" />
        </div>
      </div>
    </div>
  );
}
