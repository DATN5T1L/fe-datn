// 'use client';
// import { usePathname } from 'next/navigation';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { SessionProvider } from "next-auth/react";
// import ReduxRender from "@/redux/provider";
// import Header from "../globalControl/header";
// import HeaderCourseDetail from "../globalControl/headerCourseDetail";
// import Footer from "../globalControl/footer";
// import FooterBlack from "../globalControl/footerBlack";
// import GlobalComponents from "../globalControl/GlobalComponents";
// import dynamic from 'next/dynamic';

// interface LayoutProps {
//     children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//     const pathname = usePathname();

//     const isCertificatePage = /^\/Certificate(\/.*)?$/.test(pathname);
//     const isLearningCoursePage = /^\/learningCourse(\/.*)?$/.test(pathname);
//     const isCoursePage = /^\/course(\/.*)?$/.test(pathname);
//     const isPaymentCoursePage = /^\/paymentCourse(\/.*)?$/.test(pathname);
//     const isHomePage = pathname === '/';

//     const shouldShowHeader = !isCertificatePage && !isLearningCoursePage && !isHomePage;
//     const shouldShowFooter = !isCertificatePage && !isLearningCoursePage && !isHomePage;

//     const ScrollToTopButton = dynamic(
//         () => import("@/app/(user-global)/component/globalControl/scrollToTop"),
//         { ssr: false }
//     );

//     return (
//         <div className={`${isCoursePage || isPaymentCoursePage ? 'body-black' : 'body-main'}`}>
//             <ReduxRender>
//                 <SessionProvider>
//                     {isHomePage ? <Header /> : (isCoursePage || isPaymentCoursePage ? <HeaderCourseDetail /> : <Header />)}
//                     <GlobalComponents />
//                     <div className='main-global' style={isCoursePage || isPaymentCoursePage ? { minHeight: '100vh' } : {}}>
//                         {children}
//                         <ScrollToTopButton />
//                     </div>
//                     {isCoursePage || isPaymentCoursePage ? <FooterBlack /> : <Footer />}
//                 </SessionProvider>
//             </ReduxRender>
//         </div>
//     );
// };

// export default Layout;


'use client';
import { usePathname } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "next-auth/react";
import ReduxRender from "@/redux/provider";
import Header from "../globalControl/header";
import HeaderCourseDetail from "../globalControl/headerCourseDetail";
import Footer from "../globalControl/footer";
import FooterBlack from "../globalControl/footerBlack";
import GlobalComponents from "../globalControl/GlobalComponents";
import dynamic from 'next/dynamic';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();

    // Kiểm tra các trang cụ thể
    const isCertificatePage = /^\/Certificate(\/.*)?$/.test(pathname);
    const isLearningCoursePage = /^\/learningCourse(\/.*)?$/.test(pathname);
    const isCoursePage = /^\/course(\/.*)?$/.test(pathname);
    const isPaymentCoursePage = /^\/paymentCourse(\/.*)?$/.test(pathname);
    const isHomePage = pathname === '/';

    // Quyết định hiển thị Header và Footer
    const shouldShowHeader = !isCertificatePage && !isLearningCoursePage && !isHomePage;
    const shouldShowFooter = !isCertificatePage && !isLearningCoursePage;

    // Chọn Header và Footer phù hợp
    const renderHeader = () => {
        if (isHomePage) return <Header />;
        if (isCoursePage || isPaymentCoursePage) return <HeaderCourseDetail />;
        return <Header />;
    };

    const renderFooter = () => {
        if (isCoursePage || isPaymentCoursePage) return <FooterBlack />;
        return <Footer />;
    };

    // Tải ScrollToTopButton động (chỉ client-side)
    const ScrollToTopButton = dynamic(
        () => import("@/app/(user-global)/component/globalControl/scrollToTop"),
        { ssr: false }
    );

    return (
        <div className={`${isCoursePage || isPaymentCoursePage ? 'body-black' : 'body-main'}`}>
            <ReduxRender>
                <SessionProvider>
                    {shouldShowHeader && renderHeader()}
                    <GlobalComponents />
                    <div className='main-global' style={isCoursePage || isPaymentCoursePage ? { minHeight: '100vh' } : {}}>
                        {children}
                        <ScrollToTopButton />
                    </div>
                    {shouldShowFooter && renderFooter()}
                </SessionProvider>
            </ReduxRender>
        </div>
    );
};

export default Layout;
