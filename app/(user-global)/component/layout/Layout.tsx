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

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const isNoHeaderPage = /^\/(course|paymentCourse)(\/.*)?$/.test(pathname);

    return (
        <div className={`${isNoHeaderPage ? 'body-black' : 'body-main'}`}>
            <ReduxRender>
                <SessionProvider>
                    {isNoHeaderPage ? <HeaderCourseDetail /> : <Header />}
                    <GlobalComponents />
                    {children}
                    {isNoHeaderPage ? <FooterBlack /> : <Footer />}
                </SessionProvider>
            </ReduxRender>
        </div>
    );
};

export default Layout;
