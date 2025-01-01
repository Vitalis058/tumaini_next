"use client";
import TourCard from "./TourCard";
import { Key } from "react";
import { Tour } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HomePageSkeleton from "./HomePageSkeleton";

const RecentTours = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["recent-tours"],
    queryFn: async () => {
      const response = await axios.get("/api/tours/recentTours");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <HomePageSkeleton />
      </div>
    );
  }

  return (
    <section className="">
      <div className="flex w-full flex-col gap-5">
        <h2 className="md:text-3xl text-xl font-bold text-greenPrimary">
          Upcoming Hikes
        </h2>

        {data?.length === 0 && !isLoading ? (
          <div className="flex w-full flex-col justify-between gap-5 text-2xl font-semibold">
            No Tours Found
          </div>
        ) : (
          <div className="flex w-full flex-col justify-between gap-5 md:flex-row">
            {data?.map((tours: Tour, index: Key | null | undefined) => (
              <div
                key={index}
                className={`${data.length <= 1 ? "md:w-[350px]" : "flex-1"}`}
              >
                <TourCard tour={tours} key={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentTours;
