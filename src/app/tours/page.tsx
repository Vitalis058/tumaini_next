import BrowseTourSkeleton from "@/components/tours/BrowseTourSkeleton";
import ToursRendering from "@/components/tours/ToursRendering";
import { Suspense } from "react";

const Tours = () => {
  return (
    <section className="mt-5">
      <Suspense
        fallback={
          <div className="flex flex-col gap-3">
            <BrowseTourSkeleton />
            <BrowseTourSkeleton />
          </div>
        }
      >
        <ToursRendering />
      </Suspense>
    </section>
  );
};

export default Tours;
