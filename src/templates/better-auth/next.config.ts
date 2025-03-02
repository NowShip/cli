import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vztpjn0djt.ufs.sh",
        port: "",
        pathname: "/f/**",
      },
    ],
  },
};

export default withContentlayer(nextConfig);
