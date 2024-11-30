import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import StarRating from "../StarRating";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Tour } from "@prisma/client";

type Props = {
  tour: Tour;
};

const BrowseTourCard = ({ tour }: Props) => {
  return (
    <Link
      href={`/tour-details/${tour.id}`}
      className="group grid h-[30%] gap-5 rounded-xl border-[1px] border-greenPrimary p-3 md:grid-cols-[2fr_3fr]"
    >
      <AspectRatio ratio={16 / 6} className="relative">
        <Image
          src={tour.imageUrl}
          alt="my own image"
          className=" rounded-xl object-cover"
          fill
        />
      </AspectRatio>

      <div className=" flex flex-col justify-center gap-1">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div className="justify flex flex-wrap gap-1">
              <Badge
                className={cn(
                  tour.level === "child-friendly" && "bg-greenPrimary",
                  tour.level === "intermediate" && "bg-orange-400",
                  tour.level === "advanced" && "bg-red-500"
                )}
              >
                {tour.level}
              </Badge>
              <Badge
                className={cn(
                  tour.hikeType === "day-hike" && "bg-yellow-400",
                  tour.hikeType === "multi-day-hike" && "bg-orange-400"
                )}
              >
                {tour.hikeType}
              </Badge>
              <Badge
                className={cn(
                  tour.difficulty === "easy" && "bg-green-500",
                  tour.difficulty === "moderate" && "bg-yellow-500",
                  tour.difficulty === "advanced" && "bg-orange-400",
                  tour.difficulty === "challenging" && "bg-red-500",
                  tour.difficulty === "strenuous" && "bg-red-800"
                )}
              >
                {tour.difficulty}
              </Badge>
            </div>

            <h1 className="text-sm font-medium">
              {new Date(tour.date).toDateString()}
            </h1>
          </div>

          <div className="flex flex-col justify-between gap-2 sm:gap-0 md:flex-row">
            <div className="basis-[80%]">
              <h3 className="place-content-end place-self-start text-lg font-semibold capitalize text-greenPrimary">
                {tour.tourName}
              </h3>
              <p className="text-sm capitalize line-clamp-3 mb-2">
                {tour.summary}
              </p>
              <StarRating defaultRating={tour.rating} />
            </div>

            <h3 className="text-lg font-semibold text-greenPrimary sm:self-end">
              {tour.price} KES
            </h3>
          </div>

          <Button variant={"outline"} className="w-full">
            More details
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default BrowseTourCard;
