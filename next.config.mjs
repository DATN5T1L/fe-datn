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
          source: '/api/products/:path*',
          destination: 'https://your-backend-url.com/api/products/:path*',
        },
        {
          source: '/api/orders/:path*',
          destination: 'https://your-backend-url.com/api/orders/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;
  