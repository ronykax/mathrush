import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Math Rush",
  description: "Race the clock and solve 20 math problems as fast as you can (new problems everyday)"
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout;