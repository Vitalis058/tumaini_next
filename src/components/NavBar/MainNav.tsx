import Link from "next/link";

const MainNav = () => {
  return (
    <nav className="flex gap-2">
      <Link
        href={"/tours"}
        className="rounded-xl px-4 py-1 text-sm font-semibold text-foreground transition-all duration-150 ease-in-out hover:bg-card"
      >
        Tours
      </Link>

      <Link
        href={"/about"}
        className="rounded-xl px-4 py-1 text-sm font-semibold text-foreground transition-all duration-150 ease-in-out hover:bg-card"
      >
        About us{" "}
      </Link>

      <Link
        href={"/contact"}
        className="rounded-xl px-4 py-1 text-sm font-semibold  transition-all duration-150 ease-in-out hover:bg-card"
      >
        Contact us{" "}
      </Link>
      <Link
        href={"/gallery"}
        className="rounded-xl px-4 py-1 text-sm font-semibold transition-all duration-150 ease-in-out  hover:bg-card"
      >
        Gallery
      </Link>
    </nav>
  );
};

export default MainNav;
