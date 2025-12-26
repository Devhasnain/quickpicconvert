import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
      },
      {
        protocol: 'https',
        hostname: 'fiverr-res.cloudinary.com',
        pathname: "/**",
      },]
  }
};

export default nextConfig;
