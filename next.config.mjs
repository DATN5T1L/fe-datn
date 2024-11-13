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
      // Auth API rewrites
      {
        source: '/api/login/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/auth/login/:path*',
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
        destination: 'https://be-datn-production-f680.up.railway.app/api/auth/register/:path*',
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
        destination: 'https://be-datn-production-f680.up.railway.app/api/client/doc-course/:path*',
      },
      {
        source: '/api/docCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/doc-course/:path*',
      },
      // Tạo trạng thái bài học cho người người theo từng bài truyền vào id_doc/course_id
      {
        source: '/api/getStatusDoc/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/statusDoc-by-document/:path*',
      },
      {
        source: '/api/createStatusDoc/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/create-statusDoc/:path*',
      },
      {
        source: '/api/upStatusDoc',
        destination: 'https://tto-production-db77.up.railway.app/api/client/update-statusDoc',
      },
      {
        source: '/api/allStatusDoc/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/all-statusDoc-by-course/:path*',
      },
      {
        source: '/api/checkAnswer/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/check-answer/:path*',
      },
      // lấy ra tât cả trạng thái bài học

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
      // checkmail
      {
        source: '/api/checkTokenNewUser/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/check-mail-register/:path*',
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
      // search
      {
        source: '/api/search/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/search/:path*',
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
