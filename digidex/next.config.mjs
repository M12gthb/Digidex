/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "digi-api.com",
      },
    ],
  }
};

export default nextConfig;