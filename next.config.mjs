/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
        destination: 'https://tto-production-db77.up.railway.app/api/auth/login/:path*',
      },
      {
        source: '/api/login-google/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/auth/login-google/:path*',
      },
      {
        source: '/api/loginGg',
        destination: 'https://tto-production-db77.up.railway.app/api/auth/login-google',
      },
      {
        source: '/api/checktoken/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/check-token/:path*',
      },
      {
        source: '/api/profile/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/auth/profile/:path*',
      },
      {
        source: '/api/newUser/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/auth/register/:path*',
      },
      {
        source: '/api/checkTokenNewUser/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/check-mail-register/:path*',
      },
      {
        source: '/api/logout/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/auth/logout/:path*',
      },
      {
        source: '/api/routerAll/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/route/:path*',
      },
      {
        source: '/api/courses/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/detail-route/:path*',
      },
      {
        source: '/api/getToken/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/send-reset-password-mail/:path*',
      },
      {
        source: '/api/verifyToken/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/verifyToken/:path*',
      },
      {
        source: '/api/resetPassword/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/reset-password/:path*',
      },

      /*Change info */

      {
        source: '/api/changeDiscription/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/change-profile-discription-user/:path*',
      },
      {
        source: '/api/changeFullName/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/change-profile-fullname-user/:path*',
      },
      {
        source: '/api/changePassword/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/change-profile-password-user/:path*',
      },
      {
        source: '/api/changePassword/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/change-profile-password-user/:path*',
      },
      {
        source: '/api/changePhone/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/change-profile-phone-user/:path*',
      },
      {
        source: '/api/changeImg/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/update-avatar/:path*',
      },

      // Client API rewrites

      {
        source: '/api/routes/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/route/:path*',
      },
      {
        source: '/api/coursetype/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/course-price/:path*',
      },
      {
        source: '/api/posthighest/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/post-highest-view/:path*',
      },
      {
        source: '/api/courseDetail/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/course/:path*',
      },
      {
        source: '/api/user/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/user/:path*',
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
        destination: 'https://tto-production-db77.up.railway.app/api/client/name-chapter-by-course/:path*',
      },
      // api get document
      {
        source: '/api/getdocforyou/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/doc-by-course/:path*',
      },
      {
        source: '/api/docCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/doc-course/:path*',
      },
      // thêm ghi chú của học viên cho từng doc
      {
        source: '/api/addNote/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/post-note/:path*',
      },
      // lấy ghi chú của học viên cho cả khóa học
      {
        source: '/api/getNote/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-note-doc/:path*',
      },
      // Lấy ra số lượng phản hồi của người dùng cho từng tập tin
      {
        source: '/api/getFeedBackCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/feedback-course/:path*',
      },
      // Lấy ra số lượng phản hồi của người dùng cho từng khóa học
      {
        source: '/api/getFaqCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/faq-course/:path*',
      },
      // Lấy ra số lượng phản hồi tốt của người dùng cho tất cả khóa học
      {
        source: '/api/feedbackhome/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/feedback-limit/:path*',
      },
      //lấy ra tiến độ khóa học của người dùng
      {
        source: '/api/courseFor',
        destination: 'https://tto-production-db77.up.railway.app/api/client/progress',
      },
      {
        source: '/api/getnoteByCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-note-by-course/:path*',
      },

      // API Enrollment 

      {
        source: '/api/userRegisterCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/user-register-course/:path*',
      },
      {
        source: '/api/checkEnrollment/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/check-enrollment/:path*',
      },
      {
        source: '/api/checkProgress/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/learning-course/:path*',
      },
      // THANH TOÁN
      //Phương thức thanh toán momo
      {
        source: '/api/paymentmomo/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/MOMO/:path*',
      },
      // thanh toán bằng vn
      {
        source: '/api/paymentvn/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/VNPay/:path*',
      },
      // Admin 

      {
        source: '/api/allUser/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/users/:path*',
      },
      {
        source: '/api/allCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/courses/:path*',
      },
      {
        source: '/api/allPost/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/posts/:path*',
      },
      {
        source: '/api/allRole/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/users-role/:path*',
      },
      {
        source: '/api/courseEnrollments/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/enrollments/:path*',
      },
      {
        source: '/api/courseForUser/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/get-course-admin-by-user/:path*',
      },
      {
        source: '/api/courseChapters/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/chapters/:path*',
      },
      {
        source: '/api/courseDocumnets/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/doc-course/:path*',
      },
      {
        source: '/api/hiddenUser/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/status-user/:path*',
      },
      {
        source: '/api/getAllFpt/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/get-mail-fpt/:path*',
      },
      {
        source: '/api/updateRoleFpt/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/update-role-admin/:path*',
      },
      {
        source: '/api/getAllHistory/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/get-all-history/:path*',
      },

      // statistical

      {
        source: '/api/statistical_admin/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/statistical-admin/:path*',
      },
      {
        source: '/api/statistical_post/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/statistical-post-by-user/:path*',
      },
      {
        source: '/api/statistical_revenue_mouth/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/statistical-revenue-mouth/:path*',
      },
      {
        source: '/api/statistical_detail_user/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/get-statistical-detail-user-admin/:path*',
      },
      {
        source: '/api/statistical_complete/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/instructor/statistical-highest-rating-course/:path*',
      },

      //instructor

      {
        source: '/api/coures_rating/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/instructor/statistical-highest-rating-course/:path*',
      },

      //marketing

      {
        source: '/api/post_categories/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/post_categories/:path*',
      },
      {
        source: '/api/comment/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/get-comment-post/:path*',
      },
      {
        source: '/api/commentPost/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/comment-post/:path*',
      },
      {
        source: '/api/deleteCmtPost/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/delete-comment-post/:path*',
      },
      {
        source: '/api/hiddenCmtPost/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/status-comment-post/:path*',
      },
      {
        source: '/api/changeCmtPost/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/update-comment-post/:path*',
      },
      {
        source: '/api/uploadImgPost/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/upload/:path*',
      },
      {
        source: '/api/tokenImage/:path*',
        destination: 'https://123319.cke-cs.com/token/dev/35d1d27f0e9e385c53edf0d6b267c2f4b82c737a333c23aec4e4bebc4f8e?limit=10/:path*',
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
        hostname: 'tto-production-db77.up.railway.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
