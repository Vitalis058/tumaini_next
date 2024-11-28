import TourCard from "./TourCard";
import { Key } from "react";
import { TourType } from "@/types/types";
import axios from "axios";
const API_BASE_URL = process.env.BASE_URL || "";

const RecentTours = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/api/tours?limit=3`);

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
          {data?.map((tours: TourType, index: Key | null | undefined) => (
            <TourCard tour={tours} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentTours;
