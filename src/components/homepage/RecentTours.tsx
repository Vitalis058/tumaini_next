"use client";
import { Tour } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Key } from "react";
import { Button } from "../ui/button";
import HomePageSkeleton from "./HomePageSkeleton";
import TourCard from "./TourCard";

const RecentTours = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["recent-tours"],
    queryFn: async () => {
      const response = await axios.get("/api/tours/recentTours");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <HomePageSkeleton />
      </div>
    );
  }

  return (
    <section className="relative">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-deepBlue/10 text-deepBlue text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-deepBlue rounded-full mr-2"></span>
          Upcoming Adventures
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Ready for Your Next Hike?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          Discover our carefully curated hiking experiences designed to
          challenge, inspire, and connect you with Kenya&apos;s most
          breathtaking landscapes.
        </p>
      </div>

      {/* Tours Content */}
      <div className="space-y-8">
        {data?.length === 0 && !isLoading ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-3xl">🏔️</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No Tours Available
            </h3>
            <p className="text-gray-600 mb-8">
              We&apos;re currently planning exciting new adventures. Check back
              soon!
            </p>
            <Button
              className="bg-greenPrimary hover:bg-greenPrimary/90 text-white px-6 py-3 rounded-full"
              asChild
            >
              <Link href="/contact">Get Notified</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.map((tour: Tour, index: Key | null | undefined) => (
                <div key={index} className="group">
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center pt-8">
              <Button
                className="group bg-transparent border-2 border-greenPrimary text-greenPrimary 
                          hover:bg-greenPrimary hover:text-white px-8 py-4 rounded-full 
                          transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/tours" className="flex items-center gap-2">
                  <span>View All Adventures</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-greenPrimary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-deepBlue/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default RecentTours;
