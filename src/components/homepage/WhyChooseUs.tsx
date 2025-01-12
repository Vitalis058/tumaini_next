import { Calendar, Mountain, SquareLibrary } from "lucide-react";
import chooseUs from "./../../../public/image/tumainiFitnessChooseUs.jpg";
import Image from "next/image";
import { FaHiking } from "react-icons/fa";

function WhyChooseUs() {
  return (
    <div className="flex gap-10 flex-col md:flex-row bg-muted p-5 rounded-lg">
      <div className="flex-1 space-y-5">
        <h1 className={`md:text-3xl text-xl font-bold text-greenPrimary`}>
          Why Choose Us
        </h1>
        <p className="text-sm">
          Choose Tumaini Fitness for your next adventure, where we blend
          expertise and passion to offer unforgettable hiking experiences. Our
          commitment to safety, personal growth, and environmental stewardship
          ensures that every trek not only invigorates your body but also
          enriches your spirit.
        </p>

        <div className="space-y-3 md:text-base text-sm">
          <span className="flex items-center gap-3">
            <span className="rounded-full bg-primary p-2">
              <FaHiking className="text-muted" size={20} />
            </span>
            <span className="font-semibold">Trail blazing adventures</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="rounded-full bg-primary p-2">
              <Calendar className="text-muted" />
            </span>
            <span className="font-semibold">Year round adventures</span>
          </span>
          <span className="flex items-center gap-3">
            <span className="rounded-full bg-primary p-2">
              <Mountain className="text-muted" />
            </span>
            <span className="font-semibold">
              Explore breathtaking landscapes and hidden gems
            </span>
          </span>
          <span className="flex items-center gap-3">
            <span className="rounded-full bg-primary p-2">
              <SquareLibrary className="text-muted" />
            </span>
            <span className="font-semibold">
              Create lasting memories with every hike
            </span>
          </span>
        </div>
      </div>

      <div className=" flex-1 md:block relative min-h-40">
        <Image
          src={chooseUs}
          alt="why choose tumaini fitness image"
          className="h-[80%] rounded-lg object-cover"
          fill
        />
      </div>
    </div>
  );
}

export default WhyChooseUs;
