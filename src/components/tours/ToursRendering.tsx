import { Tour } from "@prisma/client";
import BrowseTourCard from "./BrowseTourCard";
import { Key } from "react";

interface TourProps {
  tours: Tour[];
}

const ToursRendering = ({ tours }: TourProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-center text-2xl font-semibold">Upcoming Hikes</h3>
      {tours?.length === 0 ? (
        <div className="my-5 text-center text-2xl font-bold">
          <p>No Results Found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {tours?.map((tour: Tour, index: Key | null | undefined) => (
            <BrowseTourCard tour={tour} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToursRendering;
