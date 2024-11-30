import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { Tour } from "@prisma/client";

type Props = {
  tour: Tour;
};

function TourCard({ tour }: Props) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border-2 p-2 transition-all duration-300 hover:border-primary]">
      <Link href={`/tour-details/${tour.id}`}>
        <AspectRatio ratio={16 / 8} className="relative">
          <Image
            src={tour.imageUrl}
            alt={tour.tourName}
            fill
            className="z-20 h-[230px] w-full rounded-md object-cover transition-all duration-300 group-hover:h-[200px]"
          />
        </AspectRatio>
      </Link>

      <div className="flex flex-col gap-2 p-3">
        <div className="flex flex-col justify-between gap-1">
          <p className="line-clamp-1 md:text-lg  font-semibold capitalize text-gray-600">
            {tour.tourName}
          </p>
          <p className="line-clamp-2 text-sm md:text-base">{tour.summary}</p>
          <p className="font-medium text-sm text-primary">
            {new Date(tour.date).toDateString()}
          </p>
        </div>
        <div className="text- flex gap-3">
          <Badge className="rounded-full bg-primary">{tour.price} KES</Badge>

          <Link href={`/tour-details/${tour.id}`} className="flex-1">
            <Button
              variant={"outline"}
              className="w-full rounded-full bg-muted text-base font-semibold"
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
