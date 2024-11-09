import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", // Leave blank to allow all ports
        pathname: "/**", // Allows all paths under this hostname
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "", // Leave blank to allow all ports
        pathname: "/**", // Allows all paths under this hostname
      },
    ],
  },
};

export default nextConfig;
