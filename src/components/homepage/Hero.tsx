import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroImage = () => {
  return (
    <div className="h-[80vh] w-full rounded-lg mt-3">
      <div
        className="relative h-full flex-1 
          before:content-[''] before:absolute before:top-0 before:left-0 
          before:w-full before:h-full before:bg-black 
          before:z-10 before:rounded-lg before:opacity-0"
      >
        <Image
          src="https://res.cloudinary.com/dl0w5seja/image/upload/v1736663885/mount-kenya-7377780_1920_kgugrv.jpg"
          alt="Mountain view for Tumaini Fitness hiking adventures."
          fill
          className="rounded-lg object-cover"
          priority
        />
        <div
          className="absolute left-[50%] -translate-x-[50%] z-20 m-4 mx-auto flex h-full w-full 
          flex-col justify-center gap-4 text-center md:max-w-[60%] items-center px-3"
        >
          <h2 className="text-xl font-bold text-white md:text-4xl">
            Embark on unforgettable
            <span className="text-primary"> Adventures</span> with Tumaini
            Fitness.
          </h2>
          <p className="text-white md:block text-sm sm:text-base">
            Discover the world’s wonders with personalized journeys. Let’s turn
            your travel dreams into reality!
          </p>
          <Button className="sm:max-w-52 w-full rounded-lg" asChild>
            <Link href={"/tours"} className="">
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
