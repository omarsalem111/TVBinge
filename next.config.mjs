/** @type {import('next').NextConfig} */

const nextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [new URL("https://image.tmdb.org/**")],
  },
};

export default nextConfig;
