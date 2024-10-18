'use client';
import { usePathname } from 'next/navigation';
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { SessionProvider } from "next-auth/react";
import ReduxRender from "@/redux/provider";
import ProfileDispatch from "./component/auth/user-component/profileDispatch";
import '@app/(user-global)/global.css';
import Header from "./component/globalControl/header";
import HeaderCourseDetail from "./component/globalControl/headerCourseDetail";
import Footer from "./component/globalControl/footer";
import FooterBlack from "./component/globalControl/footerBlack";
import ScrollToTop from "./component/globalControl/scrollToTop";
import LeftSlider from "./component/globalControl/leftSlider";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const pathname = usePathname();
  const isNoHeaderPage = /^\/(course|paymentCourse)(\/.*)?$/.test(pathname);

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      <body className={`${inter.className} ${isNoHeaderPage ? 'body-black' : ''}`}>
        <ReduxRender>
          <SessionProvider>
            {isNoHeaderPage ? <HeaderCourseDetail /> : <Header />}
            <ScrollToTop></ScrollToTop>
            <LeftSlider></LeftSlider>
            {children}
            {isNoHeaderPage ? <FooterBlack /> : <Footer />}
          </SessionProvider>
        </ReduxRender>
      </body>
    </html>
  );
}
