"use client";
import { useGetRecentTours } from "@/api/toursApi";
import TourCard from "./TourCard";
import { Key } from "react";
import { TourType } from "@/types/types";

const RecentTours = () => {
  const { data: recentTours } = useGetRecentTours();

  return (
    <section className="">
      <div className="flex w-full flex-col gap-5">
        <h2 className="md:text-3xl text-xl font-bold text-greenPrimary">
          Upcoming Hikes
        </h2>
        <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
          {recentTours?.map(
            (tours: TourType, index: Key | null | undefined) => (
              <TourCard tour={tours} key={index} />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentTours;
