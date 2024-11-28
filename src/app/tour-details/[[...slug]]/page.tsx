import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import TourDetailsCard from "@/components/tourDetails/TourDetailsCard";
import Link from "next/link";
import axios from "axios";

type PageProps = Promise<{
  slug: string;
}>;

const TourDetailsPage = async (props: { params: PageProps }) => {
  const { slug } = await props.params;

  const response = await axios.get(
    `${process.env.BASE_URL}/api/tours/details/${slug}`
  );

  const tourDetails = {
    ...response.data,
    exclusive: JSON.parse(response.data.exclusive), // Convert the exclusive field into an object
    inclusive: JSON.parse(response.data.inclusive), // Convert the inclusive field into an object
    itinerary: JSON.parse(response.data.itinerary), // Convert the itinerary field into an object
  };

  if (response.status >= 500) {
    throw new Error("Something went wrong while fetching the Tours");
  }

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
          <TourDetailsCard tour={tourDetails} />
        </div>
      </div>
    </section>
  );
};

export default TourDetailsPage;
