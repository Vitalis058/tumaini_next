import BrowseTourCard from "./BrowseTourCard";
import { Key } from "react";
import { Tour } from "@prisma/client";
import prisma from "@/lib/prisma";

const ToursRendering = async () => {
  const data = await prisma.tour.findMany();
  console.log(data);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-center text-2xl font-semibold">Upcoming Hikes</h3>
      {data?.length === 0 ? (
        <div className="my-5 text-center text-2xl font-bold">
          <p>No Results Found</p>
          <p className="mt-5 text-xs font-medium">Try a new query or filter</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {data?.map((tour: Tour, index: Key | null | undefined) => (
            <BrowseTourCard tour={tour} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToursRendering;
