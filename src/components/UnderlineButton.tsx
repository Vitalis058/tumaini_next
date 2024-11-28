import Link from "next/link";

type Props = {
  children: React.ReactNode;
  to: string;
};

const UnderlineButton = ({ children, to }: Props) => {
  return (
    <Link
      href={to}
      className="relative text-sm font-semibold after:absolute after:bottom-[0.8px] after:left-0 after:h-[1.5px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-gray-800 after:transition-transform after:duration-300 after:ease-in-out after:content-[''] hover:origin-bottom-left after:hover:origin-bottom-left hover:after:scale-x-100"
    >
      {children}
    </Link>
  );
};

export default UnderlineButton;
