import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const HeroImage = () => {
  return (
    <div className="relative min-h-[40vh] w-full flex items-center overflow-hidden">
      {/* Split Layout Container */}
      <div className="w-full grid lg:grid-cols-2 gap-0 min-h-[80vh]">
        {/* Left Content Section */}
        <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 bg-background relative z-10">
          <div className="max-w-xl">
            {/* Small Label */}
            <div className="inline-block mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm font-medium text-deepBlue bg-deepBlue/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
                Kenya&apos;s Premier Adventure Company
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-[0.9]">
              Explore
              <span className=" text-greenPrimary">Beyond</span>
              <span className="block text-gray-600 font-light text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mt-1 sm:mt-2">
                your limits
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Join us on expertly guided hiking adventures across Kenya&apos;s
              most spectacular landscapes. From beginner trails to challenging
              peaks.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Button
                className="group bg-greenPrimary hover:bg-greenPrimary/90 text-white px-6 sm:px-8 py-3 sm:py-4 
                          rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link
                  href="/tours"
                  className="flex items-center justify-center gap-2"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="group text-gray-700 hover:text-greenPrimary px-6 sm:px-8 py-3 sm:py-4 rounded-xl 
                          font-semibold transition-all duration-300"
                asChild
              >
                <Link
                  href="/about"
                  className="flex items-center justify-center gap-2"
                >
                  <div
                    className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gray-100 group-hover:bg-greenPrimary/10 
                                flex items-center justify-center transition-colors"
                  >
                    <Play className="w-3 sm:w-4 h-3 sm:h-4 ml-0.5" />
                  </div>
                  Watch Story
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Image Grid Section */}
        <div className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-screen p-4 sm:p-6 lg:p-8">
          {/* Image Grid Container */}
          <div className="h-full grid grid-cols-1 sm:grid-cols-2 grid-rows-3 sm:grid-rows-2 gap-3 sm:gap-4">
            {/* Large Main Image */}
            <div className="relative sm:col-span-2 row-span-2 sm:row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl group">
              <Image
                src="https://res.cloudinary.com/dl0w5seja/image/upload/v1736663885/mount-kenya-7377780_1920_kgugrv.jpg"
                alt="Mountain hiking adventure with Tumaini Fitness"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Main Floating Card */}
              <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                        Next Adventure
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Mount Kenya Summit
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-bold text-greenPrimary">
                        KES 15,000
                      </div>
                      <div className="text-xs text-gray-500">3 days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Image 1 */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400"
                alt="Hiking group adventure"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Small Image 2 */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl group">
              <Image
                src="https://images.unsplash.com/photo-1464822759844-d150baec0494?w=400"
                alt="Mountain peak view"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 lg:hidden">
        <div className="w-5 sm:w-6 h-8 sm:h-10 border border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-gray-400 rounded-full mt-1.5 sm:mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
