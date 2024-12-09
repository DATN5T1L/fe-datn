import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import styles from "./layout.module.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import ReduxRender from "@/redux/provider"
import { SessionProvider } from "next-auth/react"
import Body from "./component/globalControl/body";

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
            <Body>
              {children}
            </Body>
          </body>
        </html>
      </SessionProvider>
    </ReduxRender>
  );
}
