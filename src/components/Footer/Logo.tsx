import Image from "next/image";
import logo from "./../../public/image/tumaini hikers no bg black-01.png";

const Logo = () => {
  return (
    <div>
      <div className="flex flex-col gap-1 h-[200px] relative">
        <Image className="h-auto " src={logo} alt="tumaini fitness logo" fill />
      </div>
    </div>
  );
};

export default Logo;
