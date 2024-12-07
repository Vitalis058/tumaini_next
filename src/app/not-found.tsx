import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-7xl font-bold text-secondary_orange">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Oops! Page not found.</h2>
        <p className="mt-2">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block rounded bg-primary px-6 py-3 text-sm font-medium transition hover:bg-primary focus:outline-none focus:ring-4"
          >
            Go Back Home
          </Link>
        </div>
        <div className="mt-8">
          <Image
            src="/404-illustration.svg"
            alt="Page not found illustration"
            className="w-full"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
