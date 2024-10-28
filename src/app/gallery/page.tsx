import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { ParallaxScrollSecond } from "@/components/ui/parallax-scroll-2";
import React from "react";

function page() {
  const images = [
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121730/image_9_luw3l9.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121730/image12_yvhhqt.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121730/image_11_bgmnuq.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121730/image18_xmwb7f.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121730/image_10_fd31dt.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121729/image19_b80oyp.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121729/image15_ue2jgy.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121728/image21_cc3zqg.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121728/image13_dj655i.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121729/image_14_hwdava.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121727/image16_zcep0t.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121727/image23_z4kik6.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121727/image20_smnsdq.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121726/image25_ilvdhy.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121726/tumaini_choose_us_wljnt0.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121726/image24_gd8hxd.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121726/image22_fvwdc0.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121723/image_3_jsh8ai.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121725/image_2_y2ttup.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121724/image_1_fty6uw.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121722/image_4_aqwwxc.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121724/tumainiFitnessChooseUs_hhhmvm.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121722/hero_xrswqk.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121722/image6_h9pyvn.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121722/image8_oern0h.jpg",
    "https://res.cloudinary.com/dl0w5seja/image/upload/v1730121722/image5_pk0z1x.jpg",
  ];
  return (
    <div>
      <h1 className="text-xl md:text-3xl text-greenPrimary text-center font-bold mb-5">
        Our Gallery
      </h1>
      <ParallaxScrollSecond className="hidden md:block" images={images} />
      <ParallaxScroll className="md:hidden" images={images} />
    </div>
  );
}

export default page;
