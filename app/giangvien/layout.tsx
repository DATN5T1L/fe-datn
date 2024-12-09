import React from "react";
import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";
import "./globals.css";

import styles from "./layout.module.css";
import Header from "./component/Header/header";
import Sidebar from "./component/Sidebar/sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import LayoutBody from "./component/globalControll/layoutBody";
import { SessionProvider } from "next-auth/react";
import ReduxRender from "@/redux/provider";

export const metadata: Metadata = {
  title: "Admin",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxRender>
      <SessionProvider>
        <html lang="vi">
          <body className={styles.container}>
            <LayoutBody>
              {children}
            </LayoutBody>
          </body>
        </html>
      </SessionProvider>
    </ReduxRender>
  );
}
