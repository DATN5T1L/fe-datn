import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import '@app/(user-global)/global.css';
import Header from "./component/globalControl/header";
import Footer from "./component/globalControl/footer";
import ScrollToTop from "./component/globalControl/scrollToTop";
import LeftSlider from "./component/globalControl/leftSlider";
import { SessionProvider } from "next-auth/react";
import ReduxRender from "@/redux/provider";
import ProfileDispatch from "./component/auth/user-component/profileDispatch";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <body className={inter.className}>
        <ReduxRender>
          <SessionProvider>
            <Header />
            <ScrollToTop />
            <LeftSlider />
            <ProfileDispatch></ProfileDispatch>
            {children}
            <Footer />
          </SessionProvider>
        </ReduxRender>
        </body>
      </html>
  );
}
