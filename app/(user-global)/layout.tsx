'use client';
import { usePathname } from 'next/navigation';
import Layout from "@/app/(user-global)/component/layout/Layout";
import HeadMeta from "@/app/(user-global)/component/layout/HeadMeta";

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  const pathname = usePathname();
  const isNoHeaderPage = /^\/(course|paymentCourse)(\/.*)?$/.test(pathname);
  return (
    <html lang="en">
      <HeadMeta />
      <body className={`${isNoHeaderPage ? 'body-black' : 'body-main'}`} >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
