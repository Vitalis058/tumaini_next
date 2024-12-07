import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TourDetailsCard from "@/components/tourDetails/TourDetailsCard";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = Promise<{
  tourId: string;
}>;

const getTour = async (tourId: string) => {
  const tour = await prisma.tour.findUnique({
    where: {
      id: tourId,
    },
  });

  if (!tour) return notFound();

  return tour;
};

export async function generateMetadata(props: { params: PageProps }) {
  const { tourId } = await props.params;
  const tour = getTour(tourId);

  return {
    title: `${(await tour).tourName}`,
  };
}

const TourDetailsPage = async (props: { params: PageProps }) => {
  const { tourId } = await props.params;

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const tour = await prisma.tour.findUnique({
    where: {
      id: tourId,
    },
  });

  // If no tour is found, display a message
  if (!tour) {
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
          <TourDetailsCard tour={tour} />
        </div>
      </div>
    </section>
  );
};

export default TourDetailsPage;
