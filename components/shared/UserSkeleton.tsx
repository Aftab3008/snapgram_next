import { Skeleton } from "@/components/ui/skeleton";

export function UserSkeleton() {
  return (
    <div className="flex-1 min-w-[200px] w-full">
      <Skeleton className="h-[230px] w-full rounded-xl bg-dark-4" />
    </div>
  );
}
