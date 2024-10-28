import Image from "next/image";
import mountain from "./../../public/image/hero.jpg";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

const HeroImage = () => {
  const words = [
    {
      text: "Unleash",
      className:
        "text-white text-base sm:text-xl  md:text-3xl dark:text-blue-500",
    },
    {
      text: "your",
      className:
        "text-white text-base sm:text-xl  md:text-3xl dark:text-blue-500",
    },
    {
      text: "spirit",
      className:
        "text-white text-base sm:text-xl  md:text-3xl dark:text-blue-500",
    },
    {
      text: "of",
      className:
        "text-white text-base sm:text-xl  md:text-3xl dark:text-blue-500",
    },
    {
      text: "Adventure.",
      className:
        "text-greenPrimary text-base sm:text-xl md:text-3xl dark:text-blue-500",
    },
  ];

  return (
    <div className="h-[80vh] w-full rounded-lg">
      <div className="relative h-full flex-1 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:z-10 before:rounded-lg before:opacity-30">
        <Image
          src={mountain}
          alt="tumaini fitness hiking image"
          fill
          className="rounded-lg object-cover"
        />
        <div className="w-full absolute flex flex-col items-center h-[40rem] z-20 top-[30%] left-[50%] transform -translate-x-[50%] text-white">
          <TypewriterEffectSmooth words={words} />
          <p className="text-center text-sm md:text-base max-w-full md:max-w-[50%] px-3">
            At Tumaini Fitness, we lead you on unforgettable hikes through
            stunning landscapes. Embrace adventure, discover your strength, and
            connect with nature
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
