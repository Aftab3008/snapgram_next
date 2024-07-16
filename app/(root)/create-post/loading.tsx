import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <Skeleton className="w-full h-full max-w-5xl rounded-xl bg-dark-4" />
      </div>
    </div>
  );
}
