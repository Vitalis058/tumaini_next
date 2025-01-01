"use client";
import BrowseTourSkeleton from "@/components/tours/BrowseTourSkeleton";
import ToursRendering from "@/components/tours/ToursRendering";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Tours = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetching-tours"],
    queryFn: async () => {
      const response = await axios.get("/api/tours");
      return response.data;
    },
  });

  return (
    <section className="mt-5">
      {isLoading ? (
        <div className="flex flex-col gap-3">
          <BrowseTourSkeleton />
          <BrowseTourSkeleton />
        </div>
      ) : (
        <ToursRendering tours={data || []} />
      )}
    </section>
  );
};

export default Tours;
