/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/routes/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/route/:path*',
      },
      {
        source: '/api/coursetype/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/course-price/:path*',
      },
      {
        source: '/api/posthighest/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/post-highest-view/:path*',
      }

    ];
  },
};

export default nextConfig;
