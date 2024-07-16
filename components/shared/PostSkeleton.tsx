import { Skeleton } from "@/components/ui/skeleton";
import ProfileSkeleton from "./ProfileSkeleton";

export function PostSkeleton() {
  return (
    <div className="flex flex-col space-y-3 post-skeleton border border-dark-4 gap-8">
      <div className="space-y-2">
        <ProfileSkeleton position="bottom" height={14} width={14} />
      </div>
      <Skeleton className="h-[500px] w-full rounded-xl bg-dark-4" />
    </div>
  );
}
