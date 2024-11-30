import Image from "next/image";
import mountain from "./../../../public/image/hero.jpg";
import { FlipWords } from "../ui/flip-words";

const HeroImage = () => {
  const words = [
    "Adventures",
    "Journeys",
    "Expeditions",
    "Odysseys",
    "Horizons",
  ];

  return (
    <div className="h-[80vh] w-full rounded-lg mt-3">
      <div
        className="relative h-full flex-1 
          before:content-[''] before:absolute before:top-0 before:left-0 
          before:w-full before:h-full before:bg-black 
          before:z-10 before:rounded-lg before:opacity-30"
      >
        <Image
          src={mountain}
          alt="Mountain view for Tumaini Fitness hiking adventures."
          fill
          className="rounded-lg object-cover"
          priority
        />
        <div
          className="absolute left-[50%] -translate-x-[50%] z-50 m-4 mx-auto flex h-full w-full 
          flex-col justify-center gap-4 text-center md:max-w-[60%]"
        >
          <h2 className="text-xl font-bold text-white md:text-4xl">
            Embark on unforgettable{" "}
            <FlipWords
              words={words}
              className="font-bold dark:text-primary text-primary"
            />{" "}
            with Tumaini Fitness.
          </h2>
          <p className="hidden text-white md:block">
            Discover the world’s wonders with personalized journeys. Let’s turn
            your travel dreams into reality!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
