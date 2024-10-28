import { Button } from "../ui/button";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import { cn } from "./../../lib/utils";
import logo from "./../../public/image/tumaini hikers bg-01.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className={cn("z-50 w-full bg-white sticky top-0")}>
      <div className="flex h-20 items-center justify-between gap-14">
        <Link href={"/"} className="text-3xl font-bold text-green-500">
          <Image
            src={logo}
            alt="tumaini fitness logo"
            className="w-[80px] md:w-[100px]"
          />
        </Link>

        <div className="hidden w-full items-center justify-between md:flex">
          <div className="">
            <MainNav />
          </div>

          <Button className="rounded-xl border-[1px] border-transparent bg-greenPrimary hover:border-[1px] hover:border-greenPrimary hover:bg-white hover:text-gray-500">
            <a
              href="https://gym.tumainifitness.co.ke"
              target="_blank"
              rel="noopener"
            >
              Checkout our Gym
            </a>
          </Button>
        </div>
        <div className="block md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
