import { AspectRatio } from "../ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

const BrowseTourSkeleton = () => {
  return (
    <div className="group grid gap-5 rounded-xl border-2 p-3 md:grid-cols-[2fr_3fr]">
      <AspectRatio ratio={16 / 6}>
        <Skeleton className="h-full w-full" />
      </AspectRatio>

      <div className="m-3 flex flex-col justify-center gap-1">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div className="justify flex flex-wrap gap-1">
              <Skeleton className="h-6 w-[70px]" />
              <Skeleton className="h-6 w-[70px]" />
              <Skeleton className="h-6 w-[70px]" />
            </div>

            <Skeleton className="h-6 w-[80px]" />
          </div>

          <div className="flex flex-col justify-between gap-2 sm:gap-1 md:flex-row">
            <div className="space-y-1">
              <Skeleton className="h-6 w-[210px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-6 w-[70px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseTourSkeleton;
