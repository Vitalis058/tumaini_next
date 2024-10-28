"use client";
import BrowseTourCard from "./BrowseTourCard";
import { useGetTours } from "@/api/toursApi";

const ToursRendering = () => {
  const { data: tours } = useGetTours();

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-center text-2xl font-semibold">Upcoming Hikes</h3>
      {tours?.length === 0 ? (
        <div className="my-5 text-center text-2xl font-bold">
          <p>No Results Found</p>
          <p className="mt-5 text-xs font-medium">Try a new query or filter</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {tours?.map((tour, index) => (
            <BrowseTourCard tour={tour} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToursRendering;
