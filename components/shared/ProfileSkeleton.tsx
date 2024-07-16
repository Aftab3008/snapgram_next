import { Skeleton } from "../ui/skeleton";

type ProfileSkeletonProps = {
  position: "top" | "bottom";
  height: number;
  width: number;
};

export default function ProfileSkeleton({ position,height,width }: ProfileSkeletonProps) {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className={`h-${height} w-${width} rounded-full bg-dark-4`} />
      {position === "bottom" && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px] bg-dark-4 rounded-xl" />
          <Skeleton className="h-4 w-[80px] bg-dark-4 rounded-xl" />
        </div>
      )}
    </div>
  );
}
