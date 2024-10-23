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
      // Pokemon API rewrites
      {
        source: '/api/pokemon/:path*',
        destination: 'https://pokeapi.co/api/v2/pokemon-form/:path*',
      },
      {
        source: '/api/allPoke',
        destination: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=300',
      },
      // Auth API rewrites
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
        destination: 'https://be-datn-production-19f3.up.railway.app/api/auth/register/:path*',
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
      {
        source: '/api/getToken/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/send-reset-password-mail/:path*',
      },
      {
        source: '/api/verifyToken/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/verifyToken/:path*',
      },
      {
        source: '/api/resetPassword/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/reset-password/:path*',
      },

      /*Change info */

      {
        source: '/api/changeDiscription/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/change-profile-discription-user/:path*',
      },
      {
        source: '/api/changeFullName/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/change-profile-fullname-user/:path*',
      },
      {
        source: '/api/changePassword/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/change-profile-password-user/:path*',
      },
      {
        source: '/api/changePassword/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/change-profile-password-user/:path*',
      },

      // Client API rewrites
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
      // Image rewrites
      {
        source: '/hinhsanpham',
        destination: 'https://plus.unsplash.com/premium_photo-1714051661316-4432704b02f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
      },
      {
        source: '/hinhuser',
        destination: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VVNFUnxlbnwwfHwwfHx8MA%3D%3D',
      },

      // Additional API rewrites

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
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/feedback-limit/:path*',
      },
      {
        source: '/api/courseFor/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/progress/:path*',
      },

      // API Enrollment 

      {
        source: '/api/userRegisterCourse/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/user-register-course/:path*',
      },
      {
        source: '/api/checkEnrollment/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/check-enrollment/:path*',
      },
      {
        source: '/api/checkProgress/:path*',
        destination: 'https://be-datn-production-19f3.up.railway.app/api/client/learning-course/:path*',
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
      {
        protocol: 'https',
        hostname: 'be-datn-production-19f3.up.railway.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
