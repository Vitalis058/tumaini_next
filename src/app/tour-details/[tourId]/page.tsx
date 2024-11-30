import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TourDetailsCard from "@/components/tourDetails/TourDetailsCard";
import Link from "next/link";
import prisma from "@/lib/prisma";

type PageProps = Promise<{
  tourId: string;
}>;

const TourDetailsPage = async (props: { params: PageProps }) => {
  const { tourId } = await props.params;

  // Fetch tour details from the database
  const response = await prisma.tour.findUnique({
    where: {
      id: tourId,
    },
  });

  // If no tour is found, display a message
  if (!response) {
    return (
      <div className="flex h-[30vh] items-center justify-center">
        <p className="text-xl font-bold capitalize">No tour found</p>
      </div>
    );
  }

  // Transform the response if needed
  const parsedItinerary =
    response.itinerary && typeof response.itinerary === "string"
      ? JSON.parse(response.itinerary)
      : null;

  const parsedInclusive =
    response.inclusive && typeof response.inclusive === "string"
      ? JSON.parse(response.inclusive)
      : [];

  const parsedExclusive =
    response.exclusive && typeof response.exclusive === "string"
      ? JSON.parse(response.exclusive)
      : [];

  const tour = {
    ...response,
    itinerary: parsedItinerary,
    inclusive: parsedInclusive,
    exclusive: parsedExclusive,
    createdAt: response.createdAt.toISOString(), // Convert Date to string
    updatedAt: response.updatedAt.toISOString(),
  };

  return (
    <section>
      <div className="mx-auto max-w-full space-y-6 px-3 md:max-w-[95%] lg:max-w-[1140px]">
        <div>
          <Link href={"/tours"} className="flex items-center p-3 font-bold">
            <ChevronLeft />
            <h1>All Events</h1>
          </Link>
          <Separator className="w-full" />
          <TourDetailsCard tour={tour} />
        </div>
      </div>
    </section>
  );
};

export default TourDetailsPage;
