import Link from "next/link";

const MainNav = () => {
  return (
    <nav className="flex gap-2">
      <Link
        href={"/tours"}
        className="rounded-xl px-4 py-1 text-base font-medium text-gray-500 transition-all duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-600"
      >
        Tours
      </Link>

      <Link
        href={"/about"}
        className="rounded-xl px-4 py-1 text-base font-medium text-gray-500 transition-all duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-600"
      >
        About us{" "}
      </Link>
      <Link
        href={"/gallery"}
        className="rounded-xl px-4 py-1 text-base font-medium text-gray-500 transition-all duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-600"
      >
        Gallery
      </Link>
    </nav>
  );
};

export default MainNav;
