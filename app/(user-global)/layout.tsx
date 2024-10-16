'use client';
import { usePathname } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import '@app/(user-global)/global.css';
import Header from "./component/globalControl/header";
import HeaderCourseDetail from "./component/globalControl/headerCourseDetail";
import Footer from "./component/globalControl/footer";
import ScrollToTop from "./component/globalControl/scrollToTop";
import LeftSlider from "./component/globalControl/leftSlider";
import FooterBlack from "./component/globalControl/footerBlack";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const pathname = usePathname();
  const isNoHeaderPage = /^\/(course|paymentCourse)(\/.*)?$/.test(pathname);
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Khởi tạo AOS
  }, []);

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </Head>
      <body className={isNoHeaderPage ? "body-black" : "inter"}>
        {isNoHeaderPage ? <HeaderCourseDetail /> : <Header />}
        <ScrollToTop />
        <LeftSlider />
        {children}
        {isNoHeaderPage ? <FooterBlack /> : <Footer />}
      </body>
    </html>
  );
}
