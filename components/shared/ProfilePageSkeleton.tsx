import { Skeleton } from "@/components/ui/skeleton";
import { SavedSkeleton } from "./SavedSkeleton";

export function ProfilPageSkeleton() {
  return (
    <>
      <div className="profile-inner_container">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <Skeleton className="w-28 h-28 lg:h-36 lg:w-36 rounded-full bg-dark-4" />
          <div className="flex flex-col flex-1 justify-between md:mt-2 gap-6">
            <Skeleton className="h-6 w-[100px] bg-dark-4 rounded-xl" />
            <Skeleton className="h-6 w-[150px] bg-dark-4 rounded-xl" />
          </div>
          <Skeleton className="bg-dark-4 h-[48px] w-[100px] rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex md:justify-start justify-center items-center h-fit w-full max-w-5xl mb-5">
          <div className="flex gap-2">
            <Skeleton className="bg-dark-4 h-[48px] w-[100px] rounded-xl" />
            <Skeleton className="bg-dark-4 h-[48px] w-[100px] rounded-xl" />
          </div>
        </div>
        <div>
          <SavedSkeleton />
        </div>
      </div>
    </>
  );
}
