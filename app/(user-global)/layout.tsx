
'use client';
import { usePathname } from 'next/navigation'; // Sử dụng usePathname thay cho useRouter
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import '@app/(user-global)/global.css';
import Header from "./component/globalControl/header";
import Footer from "./component/globalControl/footer";
import ScrollToTop from "./component/globalControl/scrollToTop";
import LeftSlider from "./component/globalControl/leftSlider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);

  const isNoHeaderPage = /^\/course(\/.*)?$/.test(pathname);
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
      <body className="inter.className"> {/* Bạn có thể sử dụng className ở đây */}
        {/* Chỉ render Header nếu không phải là trang couseDetaile */}
        {!isNoHeaderPage && <Header />}
        <ScrollToTop />
        <LeftSlider />
        {children}
        <Footer />
      </body>
    </html>
  );
}