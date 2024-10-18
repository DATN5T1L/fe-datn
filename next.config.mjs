/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/pokemon/:path*',
        destination: 'https://pokeapi.co/api/v2/pokemon-form/:path*',
      },
      {
        source: '/api/allPoke',
        destination: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=300',
      },
      {
        source: '/api/login/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/auth/login/:path*',
      },
      {
        source: '/api/checktoken/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/check-token/:path*',
      },
      {
        source: '/api/profile/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/auth/profile/:path*',
      },
      {
        source: '/api/newUser/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/user/:path*',
      },
      {
        source: '/api/logout/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/auth/logout/:path*',
      },
      {
        source: '/api/routerAll/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/route/:path*',
      },
      {
        source: '/api/courses/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/detail-route/:path*',
      },
    ];
  },
};

export default nextConfig;
