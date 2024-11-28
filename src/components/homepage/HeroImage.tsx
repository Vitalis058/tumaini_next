import { FlipWords } from "../ui/flip-words";
import { ImagesSlider } from "../ui/images-slider";

const HeroImage = () => {
  const photoUrl = [
    "/heroImages/tumainiFitnessChooseUs.webp",
    "/heroImages/image24.webp",
    "/heroImages/image23.webp",
    "/heroImages/image22.webp",
    "/heroImages/image21.webp",
    "/heroImages/image19.webp",
    "/heroImages/image18_xmwb7f.webp",
    "/heroImages/image19.webp",
  ];

  const words = ["Journeys", "Hikes", "Escapes", "Expeditions", "Adventures"];

  return (
    <div className="h-[80vh] w-full rounded-lg">
      <ImagesSlider
        images={photoUrl}
        autoplay
        overlay
        overlayClassName="opacity-[60%]"
        className="mt-8 flex rounded-lg"
      >
        <div className="z-50 m-4 mx-auto flex h-full w-full flex-col justify-center gap-4 text-center md:max-w-[60%]">
          <h2 className="text-2xl font-bold text-white md:text-4xl">
            Embark on unforgettable <br />{" "}
            {
              <FlipWords
                words={words}
                className="Capitalize font-black text-greenPrimary"
              />
            }{" "}
            <br />
            with Tumaini Fitness Adventures
          </h2>
          <p className="hidden text-white md:block">
            Discover the world’s wonders with personalized journeys that go
            beyond the ordinary. Your next unforgettable adventure begins here –
            let&apos; make your travel dreams come true!
          </p>
        </div>
      </ImagesSlider>
    </div>
  );
};

export default HeroImage;
