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
      },

      {
        source: '/api/courseDetail/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/course/:path*',
      },

      {
        source: '/api/user/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/user/:path*',
      },
      {
        source: '/hinhsanpham',
        destination: 'https://plus.unsplash.com/premium_photo-1714051661316-4432704b02f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
      },
      {
        source: '/hinhuser',
        destination: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VVNFUnxlbnwwfHwwfHx8MA%3D%3D',
      },
      {
        source: '/api/getNameChapterCourse/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/name-chapter-by-course/:path*',
      },
      {
        source: '/api/getFeedBackCourse/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/feedback-course/:path*',
      },
      {
        source: '/api/getFaqCourse/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/faq-course/:path*',
      },
      {
        source: '/api/feedbackhome/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/feedback-limit//:path*',
      },


    ];

  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
