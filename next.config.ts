import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'quickpic-cms.huefinds.store',
        port: '',
        pathname: '/wp-content/uploads/**/**',
      },
    ],
  },
};

export default nextConfig;
