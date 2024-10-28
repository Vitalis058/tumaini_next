import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Mail, Phone } from "lucide-react";
import safaricom from "./../../public/image/Professional Lipa Na Mpesa Banner Flyer (us L - Made with PosterMyWall (4).jpg";
import Image from "next/image";
import { TourType } from "@/types/types";

type Props = {
  tour: TourType;
};

const TourDetailsCard = ({ tour }: Props) => {
  return (
    <div className="mt-2 grid gap-8 md:grid-cols-[3fr_2fr]">
      <div className="w-full space-y-3">
        <AspectRatio
          ratio={16 / 7}
          className="relative rounded-md after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-lg after:bg-black after:opacity-[40%] after:content-['']"
        >
          <Image
            src={tour.imageUrl}
            alt=""
            className="h-full w-full overflow-hidden rounded-lg object-cover"
            fill
          />
          <h1 className="absolute left-[50%] top-[40%] z-[10] w-full -translate-x-[50%] transform px-3 text-center text-base font-semibold uppercase text-white md:text-3xl lg:text-4xl">
            {tour.name}
          </h1>
        </AspectRatio>
        <div className="flex flex-col gap-3">
          <div>
            <h2 className="md:text-lg text-base font-semibold text-gray-600">
              Summary
            </h2>
            <p className=" text-sm">{tour.summary}</p>
          </div>

          <div>
            <h2 className="md:text-lg text-sm font-semibold text-gray-600">
              Description
            </h2>
            <div
              className="break-word post-content text-sm"
              dangerouslySetInnerHTML={{ __html: tour && tour.description }}
            ></div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <Card className="space-y-3 p-3 md:text-base text-sm">
            <h1 className="md:text-base text-sm font-semibold text-greenPrimary">
              Date and Time
            </h1>
            <p>{new Date(tour.date).toDateString()}</p>
            <p>Africa({tour.country})</p>
          </Card>
        </div>

        <Separator />
        <div>
          <Card className="space-y-3 p-3 md:text-base text-sm capitalize">
            <h1 className="text-lg font-semibold text-greenPrimary">
              Location
            </h1>
            <p>{tour.name}</p>
            <p>{tour.location}</p>
            <p>{tour.country}</p>
          </Card>
        </div>

        <Separator />
        <div>
          <Card className="space-y-3 p-3">
            <h1 className="text-lg font-semibold text-greenPrimary">
              Organizers
            </h1>
            <h1 className="text-sm font-medium">Tumaini Fitness</h1>
            <p className="flex cursor-pointer items-center gap-2 transition-colors duration-200 ease-in-out hover:text-greenPrimary">
              <Phone />
              <a href="tel:+254703371240">Call Us</a>
            </p>
            <p className="flex cursor-pointer items-center gap-2 transition-colors duration-200 ease-in-out hover:text-greenPrimary">
              <Mail />
              <a href="mailto:info@tumainifitness.co.ke">Send Email</a>
            </p>
          </Card>
        </div>

        <div>
          <Card className="justify-between p-5 flex">
            <div className="flex gap-3 flex-col">
              <h1 className="text-base font-semibold text-greenPrimary">
                Booking
              </h1>
              <p className="font-semibold">KES {tour.booking}</p>
            </div>

            <div className="flex gap-3 flex-col">
              <h1 className="text-base font-semibold text-greenPrimary">
                Price
              </h1>
              <p className=" font-semibold">KES{tour.price}</p>
            </div>
          </Card>
        </div>

        <div>
          <Card>
            <div className="space-y-3 p-3">
              <h2 className="text-xl font-bold">Payment Details</h2>
              <div className="relative w-[200px]">
                <Image
                  src={safaricom}
                  alt="safaricom logo"
                  className="w-[200px]"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-2">
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
      </div>
    </div>
  );
};

export default TourDetailsCard;
