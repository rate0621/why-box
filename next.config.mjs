/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
