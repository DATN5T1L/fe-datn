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
    const isNoHeaderPage = /^\/(course|paymentCourse|Certificate)(\/.*)?$/.test(pathname);
    const isLearningCoursePage = /^\/learningCourse|test(\/.*)?$/.test(pathname);
    const isCertificatePage = pathname.startsWith('/Certificate');
    const ScrollToTopButton = dynamic(
        () => import("@app/(user-global)/component/globalControl/SrollTotop"),
        { ssr: false }
    );

    return (
        <div className={`${isNoHeaderPage ? 'body-black' : 'body-main'}`}>
            <ReduxRender>
                <SessionProvider>
                    {!isCertificatePage && !isLearningCoursePage && (isLearningCoursePage ? <HeaderCourseDetail /> : <Header />)}
                    <GlobalComponents />
                    <div className='main-global' style={isNoHeaderPage ? { minHeight: '100vh' } : {}}>
                        {children}
                        <ScrollToTopButton />
                    </div>
                    {!isCertificatePage && !isLearningCoursePage && (isLearningCoursePage ? <FooterBlack /> : <Footer />)}
                </SessionProvider>
            </ReduxRender>
        </div >
    );
};

export default Layout;
