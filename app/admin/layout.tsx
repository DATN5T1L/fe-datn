import ReduxRender from "@/redux/provider"
import { SessionProvider } from "next-auth/react"
import ScrollToTop from "../(user-global)/component/globalControl/scrollToTop"
import ProfileDispatch from "../(user-global)/component/auth/user-component/profileDispatch"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="body">
        <ReduxRender>
          <SessionProvider>
            <ScrollToTop />
            {children}
            <ProfileDispatch />
          </SessionProvider>
        </ReduxRender>
      </body>
    </html>
  )
}
