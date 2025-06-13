import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const BrowseTourSkeleton = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-sm">
      <div className="grid md:grid-cols-[300px_1fr] gap-0">
        {/* Image Section */}
        <div className="relative h-64 md:h-auto">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Content Section */}
        <CardContent className="p-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-18" />
            </div>

            {/* Title and Summary */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Tour Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 pt-4 border-t">
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default BrowseTourSkeleton;
