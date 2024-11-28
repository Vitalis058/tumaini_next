import axios from "axios";
import BrowseTourCard from "./BrowseTourCard";
import { TourType } from "@/types/types";
import { Key } from "react";

const ToursRendering = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/api/tours`);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-center text-2xl font-semibold">Upcoming Hikes</h3>
      {response.data?.length === 0 ? (
        <div className="my-5 text-center text-2xl font-bold">
          <p>No Results Found</p>
          <p className="mt-5 text-xs font-medium">Try a new query or filter</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {response.data?.map(
            (tour: TourType, index: Key | null | undefined) => (
              <BrowseTourCard tour={tour} key={index} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ToursRendering;
