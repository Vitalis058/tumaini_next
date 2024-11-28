import { Skeleton } from "../ui/skeleton";

const HomePageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="group relative h-[350px] w-full overflow-hidden rounded-lg border-2 border-gray-300 md:w-[330px]">
        <Skeleton className="h-[200px] w-full" />

        <div className="flex flex-col gap-2 p-3">
          <div className="flex justify-between gap-4">
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-5 w-[40%]" />
          </div>
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-9" />
        </div>
      </div>

      <div className="group relative h-[350px] w-full overflow-hidden rounded-lg border-2 border-gray-300 md:w-[330px]">
        <Skeleton className="h-[200px] w-full" />

        <div className="flex flex-col gap-2 p-3">
          <div className="flex justify-between gap-4">
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-5 w-[40%]" />
          </div>
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-9" />
        </div>
      </div>

      <div className="group relative h-[350px] w-full overflow-hidden rounded-lg border-2 border-gray-300 md:w-[330px]">
        <Skeleton className="h-[200px] w-full" />

        <div className="flex flex-col gap-2 p-3">
          <div className="flex justify-between gap-4">
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-5 w-[40%]" />
          </div>
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-9" />
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;
