/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    // domains: ['localhost:5000'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        // hostname: '158.160.95.56',
        port: '5000',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
