/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ['localhost:5000'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '158.160.95.56',
        port: '5000',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
