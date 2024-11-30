import { FaWhatsapp } from "react-icons/fa";

import { Card } from "@/components/ui/card";
import { Calendar1, Check, Mail, MapPin, X } from "lucide-react";
import safaricom from "./../../../public/image/Professional Lipa Na Mpesa Banner Flyer (us L - Made with PosterMyWall (4).jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import TourBooking from "./tourBooking";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Tour } from "@prisma/client";

type Props = {
  tour: Tour;
};
type ItineraryTypes = { day: string; details: string }[];

const TourDetailsCard = ({ tour }: Props) => {
  const itinerary = tour.itinerary as ItineraryTypes;
  const inclusive = tour.inclusive as { item: string }[];
  const exclusive = tour.exclusive as { item: string }[];

  return (
    <div className="mt-2">
      <div className="w-full space-y-3">
        <div className="relative h-[50vh] rounded-md after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-lg after:bg-black  after:opacity-[30%] after:content-['']">
          <Image
            src={tour.imageUrl}
            alt=""
            className="h-full w-full overflow-hidden rounded-lg object-cover"
            fill
          />
          <div className="absolute left-[50%] top-[40%] z-[10] w-full -translate-x-[50%] transform px-3 text-center text-white flex flex-col justify-center gap-3 items-center">
            <h1 className="capitalize font-semibold md:text-3xl text-2xl">
              {tour.tourName}
            </h1>
            <div className="flex flex-col sm:flex-row sm:gap-5 items-center">
              <span className="flex items-center gap-1">
                <MapPin className="text-primary" size={20} />
                <p className="text-base capitalize">{tour.location}</p>
              </span>

              <span className="flex items-center gap-1">
                <Calendar1 className="text-primary" size={20} />
                <p className="text-base capitalize">
                  {new Date(tour.date).toDateString()}
                </p>
              </span>
            </div>
          </div>
        </div>
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

        <div className="gap-3 grid grid-cols-1 md:grid-cols-[3fr_1fr]">
          <ScrollArea className="md:h-96 border p-3 rounded-lg">
            <div>
              <h2 className="md:text-lg text-sm font-semibold text-primary">
                Tour Description
              </h2>
              <div
                className="break-word post-content text-sm"
                dangerouslySetInnerHTML={{ __html: tour && tour.description }}
              ></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-primary mt-3">
                Itinerary
              </h1>
              <Accordion type="multiple" className="w-full text-start">
                {itinerary.map((itinerary, index) => (
                  <AccordionItem value={`value ${index}`} key={index}>
                    <AccordionTrigger>{itinerary.day}</AccordionTrigger>
                    <AccordionContent>{itinerary.details}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <Tabs defaultValue="inclusive" className="w-full mt-5">
              <TabsList className="w-full">
                <TabsTrigger value="inclusive" className="w-full">
                  Inclusive
                </TabsTrigger>
                <TabsTrigger value="exclusive" className="w-full">
                  Exclusive
                </TabsTrigger>
              </TabsList>
              <TabsContent value="inclusive">
                {inclusive.map((item, index) => (
                  <span key={index} className="flex items-center gap-2">
                    <Check className="text-primary" size={17} />
                    <p className="text-sm">{item.item}</p>
                  </span>
                ))}
              </TabsContent>
              <TabsContent value="exclusive">
                {exclusive.map((item, index) => (
                  <span key={index} className="flex items-center gap-2">
                    <X className="text-destructive" />
                    <p className="text-sm">{item.item}</p>
                  </span>
                ))}{" "}
              </TabsContent>
            </Tabs>
          </ScrollArea>
          <Card className="p-5 flex h-fit flex-col">
            <div className="flex justify-between w-full gap-5">
              <div className="flex flex-col text-center bg-primary w-full h-fit px-3 rounded-lg py-[2px] text-white">
                <h1 className="text-xs font-semibold">Price</h1>
                <p className="font-semibold text-sm"> KES {tour.price}</p>
              </div>
              <div className="flex flex-col text-center bg-primary w-full h-fit px-3 rounded-lg py-[2px] text-white">
                <h1 className="text-xs font-semibold">Booking</h1>
                <p className="font-semibold text-sm"> KES {tour.booking}</p>
              </div>
            </div>

            <div className="space-y-3 p-3">
              <h2 className="text-lg font-semibold text-center">
                Payment Details
              </h2>
              <div className="relative w-[200px] mx-auto">
                <Image
                  src={safaricom}
                  alt="safaricom logo"
                  className="overflow-hidden rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Button className="bg-[#09C308] w-full">
                <a
                  className="flex w-full items-center justify-center gap-3"
                  href={`https://wa.me/+254703371240?text=Hello i would like to know more about the ${tour.tourName} hike`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-xl text-white" />
                  <p>Book via whatsApp</p>
                </a>
              </Button>

              <Dialog>
                <DialogTrigger className="flex w-full max-w-full items-center justify-center gap-2 rounded-lg border-[2px] py-1 text-center font-semibold transition-all duration-200 ease-in-out hover:bg-gray-200 md:w-[250px]">
                  <Mail />
                  Book via Form
                </DialogTrigger>
                <TourBooking tourName={tour.tourName} />
              </Dialog>
            </div>
          </Card>
        </div>
      </div>

      {/* <div className="space-y-1">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-greenPrimary">Share</h2>
          <p className="text-gray-600">
            Find out what people see and say about this event, and join the
            conversation.
          </p>
          <div className="mt-2 flex gap-3">
            <a
              href="https://web.facebook.com/groups/426842529472071"
              target="_blank"
              rel="noopener"
            >
              <FaFacebook className="text-2xl text-gray-500 duration-200 ease-out hover:text-greenPrimary" />
            </a>
            <a
              href="https://www.instagram.com/tumaini_fitness_centre/"
              target="_blank"
              rel="noopener"
            >
              <FaInstagram className="text-2xl text-gray-500 duration-200 ease-out hover:text-greenPrimary" />
            </a>
            <a
              href="https://x.com/Bonifac45261505"
              target="_blank"
              rel="noopener"
            >
              <FaXTwitter className="text-2xl text-gray-500 duration-200 ease-out hover:text-greenPrimary" />
            </a>
            <a
              href="https://chat.whatsapp.com/DGG9QDHw7au1KGOCu7pYDO"
              target="_blank"
              rel="noopener"
            >
              <FaWhatsapp className="text-2xl text-gray-500 duration-200 ease-out hover:text-greenPrimary" />
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TourDetailsCard;
