"use client";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TourDetailsCard from "@/components/tourDetails/TourDetailsCard";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

type PageProps = Promise<{
  tourId: string;
}>;

const TourDetailsPage = (props: { params: PageProps }) => {
  const { tourId } = use(props.params);
  console.log(tourId);

  const response = useQuery({
    queryKey: ["fetching-tour", tourId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/tours/${tourId}`);
      return data;
    },
  });

  if (response.error) {
    throw new Error("Failed to fetch the tours");
  }

  if (response.isFetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-muted text-gray-700">
        <Loader2 size={48} className="animate-spin text-greenPrimary mb-4" />
        <p className="text-lg font-medium">Fetching tour details...</p>
      </div>
    );
  }

  // If no tour is found, display a message
  if (!response.data) {
    return (
      <div className="flex h-[30vh] items-center justify-center">
        <p className="text-xl font-bold capitalize">No tour found</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto max-w-full space-y-6 px-3 md:max-w-[95%] lg:max-w-[1140px]">
        <div>
          <Link href={"/tours"} className="flex items-center p-3 font-bold">
            <ChevronLeft />
            <h1>All Events</h1>
          </Link>
          <Separator className="w-full" />
          <TourDetailsCard tour={response.data} />
        </div>
      </div>
    </section>
  );
};

export default TourDetailsPage;
