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
      {
        source: '/api/checkPhone/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/change-profile-update-phone/:path*',
      },
      {
        source: '/api/verifyPhone/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/check-phone/:path*',
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
      // Truyền vào 
      // 'status_doc', 'cache_time_video' 'document_id''course_id'
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
      // lấy ghi chú của học viên 
      {
        source: '/api/getNoteUser/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-note-by-user/:path*',
      },
      // lấy ra ghi chú của chương hiện tại
      {
        source: '/api/getNoteChapter/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-note-by-chapter/:path*',
      },
      // Lấy ra ghi chú của khóa học
      {
        source: '/api/getNoteCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-note-by-course/:path*',
      },
      // lấy ra ghi chú của bài học
      {
        source: '/api/getNoteDoc/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-note-by-doc/:path*',
      },
      // sửa ghi chú
      {
        source: '/api/updateNote/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/update-note/:path*',
      },
      // Xóa ghi chú
      {
        source: '/api/deleteNote/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/delete-note/:path*',
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
        source: '/api/getProgress/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/progress/:path*',
      },
      {
        source: '/api/getnoteByCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-note-by-course/:path*',
      },

      // lấy ra danh sách câu hỏi của bài học
      {
        source: '/api/getDocComent/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-total-comment-doc/:path*',
      },
      {
        source: '/api/getFaqDoc/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-comment-doc/:path*',
      },
      // Lấy ra từng title
      {
        source: '/api/getFaqTitle/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-title-comment-doc/:path*',
      },
      // lấy ra chi tiết comment
      {
        source: '/api/getDetailComent/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-detail-comment-doc/:path*',
      },
      // thêm commment truyền id đầu tiên là doc_id nếu có id thứ 2 comment_id thì sẽ là comment_To
      {
        source: '/api/addComentFaq/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/comment-doc/:path*',
      },
      // sửa comment bài học
      {
        source: '/api/editComment/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/comment-update/:path*',
      },

      // Xóa comment
      {
        source: '/api/deleteComment/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/comment-delete/:path*',
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
      // thanh toán VNPAY
      {
        source: '/api/paymentvnp/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/VNPay/:path*',
      },

      //post

      {
        source: '/api/clientCatePost/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-categories/:path*',
      },
      {
        source: '/api/postByCmt/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-posts-highest-comment/:path*',
      },
      {
        source: '/api/postByView/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/post-highest-view/:path*',
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
        source: '/api/hiddenPost/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/status-post/:path*',
      },
      // search
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
      {
        source: '/api/search/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/search/:path*',
      },
      // thêm phần để lại câu hỏi
      {
        source: '/api/addGoogleSheet/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/google-sheets/add/:path*',
      },

      // Khóa học yêu thích
      {
        source: '/api/favoriteCourses/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/favorite-courses/:path*',
      },
      // gợi ý khóa học kế tiếp
      {
        source: '/api/courseNext/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/course-next/:path*',
      },
      // Nhắc nhở học tập lấy ra các khóa học
      {
        source: '/api/reminder/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-reminders-course/:path*',
      },
      // Lấy ra chi tiết reminder của khóa học
      {
        source: '/api/reminders/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/get-reminders/:path*',
      },
      // thêm nhắc nhở
      {
        source: '/api/addReminder/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/post-reminders/:path*',
      },
      // sửa nhắc nhỏ
      {
        source: '/api/editReminder/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/update-reminders/:path*',
      },
      {
        source: '/api/deleteReminder/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/client/reminders/:path*',
      },


      //course
      {
        source: '/api/allCourseAdmin/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/courses/:path*',
      },
      {
        source: '/api/updateImgCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/update-images-course/:path*',
      },
      {
        source: '/api/docByCourseAdmin/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/doc-by-course-admin/:path*',
      },
      {
        source: '/api/countByCourseAdmin/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/getCountChapterAndDoc/:path*',
      },
      {
        source: '/api/censorCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/censor-course/:path*',
      },

      //chapter

      {
        source: '/api/allChapterAdmin/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/chapters-by-course/:path*',
      },
      {
        source: '/api/allChapterNotCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/chapters/:path*',
      },
      {
        source: '/api/hiddenChapter/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/status-chapter/:path*',
      },


      //document

      {
        source: '/api/allDocumentAdmin/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/documents-by-chapter/:path*',
      },
      {
        source: '/api/documentId/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/documents/:path*',
      },
      {
        source: '/api/documentHidden/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/status-document/:path*',
      },
      {
        source: '/api/addVideo/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/store-video-document/:path*',
      },
      {
        source: '/api/addCode/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/store-code-document/:path*',
      },
      {
        source: '/api/addQuiz/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/store-quiz-document/:path*',
      },
      {
        source: '/api/editVideo/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/update-video-document/:path*',
      },
      {
        source: '/api/editCode/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/update-code-document/:path*',
      },
      {
        source: '/api/editQuiz/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/update-quiz-document/:path*',
      },

      // cmt document

      {
        source: '/api/cmtByDocument/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/get-comment-doc/:path*',
      },
      {
        source: '/api/repCmt/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/comment-doc/:path*',
      },
      {
        source: '/api/deleteCmtDoc/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/comment-delete/:path*',
      },
      {
        source: '/api/hiddenCmtDoc/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/status-comment-doc/:path*',
      },

      //faq

      {
        source: '/api/faqCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/faq-by-course/:path*',
      },
      {
        source: '/api/statusFaqCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/status-faq_course/:path*',
      },
      {
        source: '/api/idFaqCourse/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/faq_courses/:path*',
      },


      //marketing

      {
        source: '/api/post_categories/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/post_categories/:path*',
      },
      {
        source: '/api/hiddenCategoriesPost/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/status-category-post/:path*',
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
        source: '/api/hiddenPost/:path*',
        destination: 'https://tto-production-db77.up.railway.app/api/admin/status-post/:path*',
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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com/',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
