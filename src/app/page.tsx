import HeroImage from "@/components/homepage/Hero";
import HomePageSkeleton from "@/components/homepage/HomePageSkeleton";
import RecentTours from "@/components/homepage/RecentTours";
import Safety from "@/components/homepage/Safety";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { FaWhatsapp } from "react-icons/fa";

function page() {
  return (
    <div className="space-y-20">
      <HeroImage />
      <Suspense fallback={<HomePageSkeleton />}>
        <RecentTours />
      </Suspense>
      <WhyChooseUs />
      <Safety />

      <div className=" rounded-lg bg-greenPrimary p-3 text-white">
        <h1 className="text-center text-2xl font-bold">
          Explore with Tumaini Fitness Adventures
        </h1>
        <div className="mt-5 flex flex-col gap-4">
          <p className="text-center">
            Ready for breathtaking hikes? Join our community and connect with
            nature. Stay updated and plan your next adventure by joining our
            WhatsApp group!
          </p>
          <Button className="mx-auto flex max-w-full items-center gap-4 rounded-full border-[1px] border-transparent bg-white text-black transition-all duration-300 ease-in-out hover:border-white hover:bg-transparent hover:text-white md:max-w-[50%]">
            <a
              href="https://chat.whatsapp.com/DGG9QDHw7au1KGOCu7pYDO"
              target="_blank"
              rel="noopener"
            >
              Join Our Community
            </a>

            <FaWhatsapp className="text-2xl" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
