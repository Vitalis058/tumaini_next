import TourCard from "./TourCard";
import { Key } from "react";
import prisma from "@/lib/prisma";
import { Tour } from "@prisma/client";

const RecentTours = async () => {
  const data = await prisma.tour.findMany({
    take: 3,
  });

  if (data.length === 0)
    return (
      <section className="">
        <div className="flex w-full flex-col gap-5">
          <h2 className="md:text-3xl text-xl font-bold text-greenPrimary">
            Upcoming Hikes
          </h2>
          <div className="flex w-full flex-col justify-between gap-5 text-2xl font-semibold">
            No Tours Found
          </div>
        </div>
      </section>
    );

  return (
    <section className="">
      <div className="flex w-full flex-col gap-5">
        <h2 className="md:text-3xl text-xl font-bold text-greenPrimary">
          Upcoming Hikes
        </h2>
        <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
          {data?.map((tours: Tour, index: Key | null | undefined) => (
            <div
              key={index}
              className={`${data.length === 1 ? "md:w-[350px]" : ""}`}
            >
              <TourCard tour={tours} key={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentTours;
