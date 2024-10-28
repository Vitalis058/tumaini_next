import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";

const MobileNav = () => {
  return (
    <Sheet aria-describedby="mobile nav">
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col gap-3 rounded-bl-xl rounded-br-xl"
        aria-describedby={"dialog-description"}
        side={"top"}
      >
        <SheetTitle className="text-base font-bold text-greenPrimary">
          Tumaini Fitness Centre
        </SheetTitle>
        <Separator />
        <div
          className="flex flex-col justify-between gap-5"
          id="dialog-description"
        >
          <div className="flex flex-col space-y-3">
            <SheetClose asChild>
              <Link
                href={"/tours"}
                className="font-semibold active:text-greenPrimary"
              >
                Tours
              </Link>
            </SheetClose>

            <Separator />
            <SheetClose asChild>
              <Link
                href={"/about"}
                className="font-semibold active:text-greenPrimary"
              >
                About us
              </Link>
            </SheetClose>

            <Separator />
            <SheetClose asChild>
              <Link
                href={"/gallery"}
                className="font-semibold active:text-greenPrimary"
              >
                Gallery
              </Link>
            </SheetClose>
          </div>

          <Button className="w-fit border-[2px] border-transparent bg-greenPrimary hover:border-[2px] hover:border-greenPrimary hover:bg-white hover:text-black">
            <a
              href="https://gym.tumainifitness.co.ke"
              target="_blank"
              rel="noopener"
              className="font-bold"
            >
              Checkout our Gym
            </a>{" "}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
